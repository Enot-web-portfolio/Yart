from rest_framework import serializers
from .models import UserWorks

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

    def update(self, instance, validated_data):
        instance.likes_count = validated_data.get("likes_count", instance.likes_count)
        instance.save()
        return instance
