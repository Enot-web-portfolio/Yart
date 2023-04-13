import simplejson
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404, _get_queryset
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import UserDetailSerializer, UserShortSerializer, SkillsSerializer
from .models import UserSubscribtions, MainSkillsType


class UserViewSet(viewsets.ModelViewSet):

    User = get_user_model()
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer

    @action(permission_classes=[IsAuthenticated], detail=True)
    def user_detail(self, request, *args, **kwargs):
        User = get_user_model()
        self.object = get_object_or_404(User, pk=kwargs["id"])
        serializer = UserDetailSerializer(self.object)
        return Response(serializer.data)

    @action(permission_classes=[IsAuthenticated], detail=True)
    def user_subs(self, request, *args, **kwargs):
        List = UserSubscribtions
        self.object = get_object_or_404(List, pk=kwargs["id"])
        r_list = []
        for i in self.object.subs_list:
            r_list.append(UserShortSerializer(get_object_or_404(get_user_model(), pk=i)).data)
        return Response(r_list, content_type="application/json")


class SkillsViewSet(viewsets.ViewSet):
    @action(permission_classes=[IsAuthenticated], detail=True)
    def skills_list(self, request, *args, **kwargs):
        List = MainSkillsType
        skills_list = []
        for i in range(1, 10):  # В зависимости от того, сколько вы добавите типов в БД
            try:
                skill = SkillsSerializer(List.objects.get(pk=i))
            except MainSkillsType.DoesNotExist:
                continue
            skills_list.append(skill.data)
        return Response(skills_list, content_type="application/json")
