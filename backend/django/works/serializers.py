from rest_framework import serializers
from .models import UserWorks, UserComments


class WorksSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserWorks
        fields = '__all__'


class WorksShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserWorks
        fields = ('user_first_name',
                  'user_last_name',
                  'user_image_url',
                  'user_id',
                  'main_skills',
                  'likes_count',
                  'image_url',
                  'start_text',
                  'name',
                  'id',
                  )


class WorksLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserWorks
        fields = ('likes_count', 'id')


class UserCommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserComments
        fields = '__all__'

