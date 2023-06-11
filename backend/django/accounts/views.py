import uuid
import boto3
from django.contrib.auth import get_user_model
from django.core.paginator import Paginator
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action, permission_classes, api_view
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

import accounts.models
from backend import settings
from .serializers import UserDetailSerializer, UserShortSerializer, SkillsSerializer, UserEditSerializer
from .models import UserSubscribtions, MainSkillsType, SecondarySkillsType


class UserViewSet(viewsets.ModelViewSet):
    User = get_user_model()
    queryset = User.objects.all()
    serializer_class = UserEditSerializer

    def get_permissions(self):
        if self.action == 'edit_get' or self.action == 'edit_post':
            self.permission_classes = (IsAuthenticated,)
        else:
            self.permission_classes = (AllowAny,)
        return tuple(permission() for permission in self.permission_classes)

    @action(permission_classes=(AllowAny,), detail=True)
    def user_detail(self, request, *args, **kwargs):
        User = get_user_model()
        self.object = get_object_or_404(User, pk=kwargs["id"])
        serializer = UserDetailSerializer(self.object).data
        skills = []
        for i in serializer["selected_main_skills"]:
            skills.append(SkillsSerializer(MainSkillsType.objects.get(id=i)).data["name"])
        serializer["selected_main_skills"] = skills
        skills = []
        for i in serializer["selected_secondary_skills"]:
            skills.append(SkillsSerializer(SecondarySkillsType.objects.get(id=i)).data["name"])
        serializer["selected_secondary_skills"] = skills
        if request.user.id:
            try:
                slist = UserSubscribtions.objects.get(id=int(request.user.id))
                if int(serializer["id"]) in slist.subs_list:
                    serializer["isSubscribe"] = True
                else:
                    serializer["isSubscribe"] = False
            except:
                serializer["isSubscribe"] = False
        if not request.user.id:
            serializer["isSubscribe"] = False
        return Response(serializer)

    @action(permission_classes=(AllowAny,), detail=True)
    def user_me(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            serializer = UserDetailSerializer(request.user)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    @action(permission_classes=(AllowAny,), detail=True, url_name='user_search')
    def user_search(self, request, *args, **kwargs):
        User = get_user_model()
        potential_query = []
        queue = []
        query = []
        search = str(request.GET.get("search", '')).strip()
        if request.GET.get("onlySubscriptions", 'false') == 'true' and request.user.id:
            List = UserSubscribtions
            potential_query = List.objects.get(id=request.user.id)
            for i in potential_query.subs_list:
                try:
                    queue.append(UserShortSerializer(User.objects.get(id=int(i))).data)
                except:
                    pass
            paginator = Paginator(queue, int(request.GET.get("count", 10)))
        if request.GET.get("mainSkills", "") != "":
            if queue:
                obj = []
                for i in queue:
                    try:
                        for item in list(map(int, request.GET.get("mainSkills", "").split(","))):
                            user = User.objects.get(
                                    pk=int(i["id"]), selected_main_skills__contains=[item], first_name__icontains=search)
                            if type(user) is accounts.models.UserAccount:
                                if user.id not in obj:
                                    query.append(UserShortSerializer(user).data)
                                    obj.append(user.id)
                            else:
                                for j in user:
                                    if j.id not in obj:
                                        query.append(UserShortSerializer(user).data)
                                        obj.append(j.id)
                        queue = []
                    except:
                        pass
                paginator = Paginator(query, int(request.GET.get("count", 10)))
            else:
                obj = []
                for item in list(map(int, request.GET.get("mainSkills", "").split(","))):
                    user = User.objects.filter(
                            selected_main_skills__contains=[item],
                            first_name__icontains=search)
                    for j in user:
                        if j.id not in obj:
                            query.append(UserShortSerializer(j).data)
                            obj.append(j.id)
                paginator = Paginator(query, int(request.GET.get("count", 10)))
        elif request.GET.get("onlySubscriptions", 'false') == 'false':
            potential_query = User.objects.filter(first_name__icontains=search)
            for i in potential_query:
                query.append(UserShortSerializer(i).data)
            paginator = Paginator(query, int(request.GET.get("count", 10)))
        if request.user.id:
            try:
                slist = UserSubscribtions.objects.get(id=int(request.user.id))
                for user in query:
                    if int(user["id"]) in slist.subs_list:
                        user["isSubscribe"] = True
                    else:
                        user["isSubscribe"] = False
            except:
                for user in query:
                    user["isSubscribe"] = False
        if not request.user.id:
            for user in query:
                user["isSubscribe"] = False

        if int(request.GET.get("page", 1)) not in paginator.page_range:
            paginator = []
            return Response(paginator)
        return Response(paginator.page(int(request.GET.get("page", 1))).object_list)

    @action(permission_classes=(IsAuthenticated,), detail=True)
    def edit_get(self, request, *args, **kwargs):
        User = get_user_model()
        self.object = get_object_or_404(User, pk=kwargs["id"])
        serializer = UserEditSerializer(self.object)
        return Response(serializer.data)

    @action(permission_classes=(IsAuthenticated,), detail=True)
    def edit_post(self, request, *args, **kwargs):
        data = request.data
        image_file = data['image_url']
        session = boto3.session.Session()
        s3 = session.client(
            service_name='s3',
            endpoint_url='https://hb.bizmrg.com',
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        )
        id = uuid.uuid4()
        key = f'useravatar_{kwargs["id"]}_{id}.' + image_file.rsplit('.', 1)[1].lower()
        s3.upload_file(image_file, settings.AWS_STORAGE_BUCKET_NAME, f'media/users/{kwargs["id"]}/{key}')
        data['image_url'] = f'https://cloud.enotwebstudio.ru/media/users/{kwargs["id"]}/{key}'
        serializer = self.serializer_class(data=data, partial=True)
        if serializer.is_valid():
            serializer.update(instance=request.user, validated_data=data)
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)


class SubscribtionViewSet(viewsets.ViewSet):
    def get_permissions(self):
        if self.action == "user_subs" or self.action == 'subscribe' or self.action == 'unsubscribe':
            self.permission_classes = (IsAuthenticated,)
        else:
            self.permission_classes = (AllowAny,)
        return tuple(permission() for permission in self.permission_classes)

    @action(permission_classes=(IsAuthenticated,), detail=True)
    def user_subs(self, request, *args, **kwargs):
        List = UserSubscribtions
        self.object = get_object_or_404(List, pk=kwargs["id"])
        r_list = []
        for i in self.object.subs_list:
            r_list.append(UserShortSerializer(get_object_or_404(get_user_model(), pk=i)).data)
        return Response(r_list, content_type="application/json")

    @action(permission_classes=(IsAuthenticated,), detail=True)
    def subscribe(self, request, *args, **kwargs):
        self.object, is_created = UserSubscribtions.objects.get_or_create(pk=request.user.id)
        if kwargs["id"] != request.user.id:
            self.object.subs_list.append(kwargs["id"])
            self.object.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_409_CONFLICT)

    @action(permission_classes=(IsAuthenticated,), detail=True)
    def unsubscribe(self, request, *args, **kwargs):
        self.object = get_object_or_404(UserSubscribtions, pk=request.user.id)
        if kwargs["id"] != request.user.id:
            try:
                self.object.subs_list.remove(kwargs["id"])
            except ValueError:
                return Response(status=status.HTTP_403_FORBIDDEN)
            self.object.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_409_CONFLICT)


class SkillsViewSet(viewsets.ViewSet):
    def get_permissions(self):
        if self.action == "user_subs" or self.action == 'subscribe' or self.action == 'unsubscribe':
            self.permission_classes = (IsAuthenticated,)
        else:
            self.permission_classes = (AllowAny,)
        return tuple(permission() for permission in self.permission_classes)

    @action(permission_classes=(AllowAny,), detail=True)
    def skills_list(self, request, *args, **kwargs):
        List = MainSkillsType
        skills_list = []
        for i in range(MainSkillsType.objects.all().count()):
            try:
                skill = SkillsSerializer(List.objects.get(pk=i))
            except MainSkillsType.DoesNotExist:
                continue
            skills_list.append(skill.data)
        return Response(skills_list, content_type="application/json")

    @action(permission_classes=(AllowAny,), detail=True)
    def secondary_skills_list(self, request, *args, **kwargs):
        List = SecondarySkillsType
        skills_list = []
        for i in range(SecondarySkillsType.objects.all().count()):
            try:
                skill = SkillsSerializer(List.objects.get(pk=i))
            except SecondarySkillsType.DoesNotExist:
                continue
            skills_list.append(skill.data)
        return Response(skills_list, content_type="application/json")

