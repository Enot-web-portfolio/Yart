from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from rest_framework import filters
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import UserCreateSerializer


class UserViewSet(viewsets.ModelViewSet):

    serializer_class = UserCreateSerializer
    User = get_user_model()
    queryset = User.objects.all()
    # filter_backends = (filters.BaseFilterBackend, filters.SearchFilter)
    # filter_fields = ('username', 'email', 'usertype')
    # search_fields = ('username', 'email', 'usertype')

    @action(permission_classes=[IsAuthenticated], detail=True)
    def user_detail(self, request, *args, **kwargs):
        User = get_user_model()
        self.object = User.objects.get(pk=kwargs["id"])
        serializer = self.get_serializer(self.object)
        return Response(serializer.data)