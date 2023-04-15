from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import UserDetailSerializer, UserShortSerializer, SkillsSerializer, UserEditSerializer
from .models import UserSubscribtions, MainSkillsType


class UserViewSet(viewsets.ModelViewSet):

    User = get_user_model()
    queryset = User.objects.all()
    serializer_class = UserEditSerializer

    @action(permission_classes=[IsAuthenticated], detail=True)
    def user_detail(self, request, *args, **kwargs):
        User = get_user_model()
        self.object = get_object_or_404(User, pk=kwargs["id"])
        serializer = UserDetailSerializer(self.object)
        return Response(serializer.data)

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
        self.object, is_created = UserSubscribtions.objects.get_or_create(pk=kwargs["id"])
        if kwargs["id"] != request.user.id:
            self.object.subs_list.append(request.user.id)
            self.object.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_409_CONFLICT)

    @action(permission_classes=[IsAuthenticated], detail=True)
    def unsubscribe(self, request, *args, **kwargs):
        self.object = get_object_or_404(UserSubscribtions, pk=kwargs["id"])
        if kwargs["id"] != request.user.id:
            try:
                self.object.subs_list.remove(request.user.id)
            except ValueError:
                return Response(status=status.HTTP_403_FORBIDDEN)
            self.object.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_409_CONFLICT)


class SkillsViewSet(viewsets.ViewSet):
    @action(permission_classes=[IsAuthenticated], detail=True)
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
