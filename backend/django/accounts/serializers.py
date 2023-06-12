from djoser.serializers import UserCreateSerializer, UserSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import MainSkillsType, SecondarySkillsType

User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id',
                  'email',
                  'first_name',
                  'last_name',
                  'password',
                  'image_url',
                  'selected_main_skills',
                  'city',
                  'company',
                  'subscribers_count',
                  'works_count',
                  'phone',
                  'additional_links',
                  'description',
                  )


class UserDetailSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = User
        fields = ('first_name',
                  'last_name',
                  'city',
                  'company',
                  'subscribers_count',
                  'selected_main_skills',
                  'id',
                  'image_url',
                  'description',
                  'selected_secondary_skills',
                  'is_active',
                  'additional_links',
                  )


class UserShortSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = User
        fields = ('first_name',
                  'last_name',
                  'image_url',
                  'works_count',
                  'id',
                  )


class UserEditSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = User
        fields = ('first_name',
                  'last_name',
                  'email',
                  'phone',
                  'additional_links',
                  'city',
                  'company',
                  'image_url',
                  'id',
                  'selected_main_skills',
                  'selected_secondary_skills',
                  )


class SkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MainSkillsType
        fields = '__all__'
        
        
class SecondarySkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SecondarySkillsType
        fields = ('id', 'name')
