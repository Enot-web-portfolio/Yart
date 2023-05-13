from django.contrib.auth import get_user_model
from django.core.paginator import Paginator
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .serializers import UserDetailSerializer, UserShortSerializer, SkillsSerializer, UserEditSerializer
from .models import UserSubscribtions, MainSkillsType


class UserViewSet(viewsets.ModelViewSet):
    User = get_user_model()
    queryset = User.objects.all()
    serializer_class = UserEditSerializer
    permission_classes = (AllowAny,)

    @action(permission_classes=[IsAuthenticated], detail=True)
    def user_detail(self, request, *args, **kwargs):
        User = get_user_model()
        self.object = get_object_or_404(User, pk=kwargs["id"])
        serializer = UserDetailSerializer(self.object)
        return Response(serializer.data)

    @action(permission_classes=(AllowAny,), detail=True)
    def user_search(self, request, *args, **kwargs):
        User = get_user_model()
        potential_query = []
        query = []
        search = str(request.GET.get("search", '')).strip()
        if request.GET.get("onlySubscriptions", 'false') == 'true' and request.user.id:
            List = UserSubscribtions
            potential_query = List.objects.get(pk=request.user.id, first_name__contains=search)
        if request.GET.get("mainSkills", None) is not None:
            if potential_query:
                for i in potential_query.subs_list:
                    try:
                        query.append(UserShortSerializer(User.objects.get(
                            pk=int(i), selected_main_skills=request.GET.get("mainSkills", []))).data)
                    except:
                        pass
            else:
                potential_query = User.objects.filter(
                    selected_main_skills__contains=request.GET.get("mainSkills", [])[1:-1].split(', '),
                    first_name__contains=search)
                for i in potential_query:
                    query.append(UserShortSerializer(i).data)
        elif request.GET.get("onlySubscriptions", 'false') == 'false':
            potential_query = User.objects.filter(first_name__contains=search)
            for i in potential_query:
                query.append(UserShortSerializer(i).data)
        paginator = Paginator(query, int(request.GET.get("count", 10)))
        if int(request.GET.get("page", 1)) not in paginator.page_range:
            paginator = []
            return Response(paginator)
        return Response(paginator.page(int(request.GET.get("page", 1))).object_list)

    @action(permission_classes=[IsAuthenticated], detail=True)
    def edit_get(self, request, *args, **kwargs):
        User = get_user_model()
        self.object = get_object_or_404(User, pk=kwargs["id"])
        serializer = UserEditSerializer(self.object)
        return Response(serializer.data)

    @action(permission_classes=[IsAuthenticated], detail=True)
    def edit_post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.update(instance=request.user, validated_data=request.data)
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)


class SubscribtionViewSet(viewsets.ViewSet):

    @action(permission_classes=[IsAuthenticated], detail=True)
    def user_subs(self, request, *args, **kwargs):
        List = UserSubscribtions
        self.object = get_object_or_404(List, pk=kwargs["id"])
        r_list = []
        for i in self.object.subs_list:
            r_list.append(UserShortSerializer(get_object_or_404(get_user_model(), pk=i)).data)
        return Response(r_list, content_type="application/json")

    @action(permission_classes=[IsAuthenticated], detail=True)
    def subscribe(self, request, *args, **kwargs):
        self.object, is_created = UserSubscribtions.objects.get_or_create(pk=request.user.id)
        if kwargs["id"] != request.user.id:
            self.object.subs_list.append(kwargs["id"])
            self.object.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_409_CONFLICT)

    @action(permission_classes=[IsAuthenticated], detail=True)
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
    permission_classes = (AllowAny,)

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
