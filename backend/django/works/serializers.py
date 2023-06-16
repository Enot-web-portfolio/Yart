from rest_framework import serializers
from .models import *


class WorksSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserWorks
        fields = '__all__'


class WorksShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserWorks
        fields = (
            'user_first_name',
            'user_last_name',
            'user_image_url',
            'user_id',
            'main_skills',
            'likes_count',
            'image_url',
            'start_text',
            'name',
            'id',
            'likes_list'
        )


class WorksLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserWorks
        fields = ('likes_count', 'id')


class EditingWorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserWorks
        fields = (
            'id',
            'name',
            'image_url',
            'name',
            'main_skills',
            'tags',
            'open_comments',
            'blocks',
            'file_urls',
        )

    def update(self, instance, validated_data):
        instance.image_url = validated_data.get("image_url", instance.image_url)
        instance.main_skills = validated_data.get("main_skills", instance.main_skills)
        instance.tags = validated_data.get("tags", instance.tags)
        instance.open_comments = validated_data.get("open_comments", instance.open_comments)
        instance.blocks = validated_data.get("blocks", instance.blocks)
        instance.file_urls = validated_data.get("file_urls", instance.file_urls)
        instance.name = validated_data.get("name", instance.name)
        instance.save()
        return instance


class CreateWorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserWorks
        fields = '__all__'


class UserCommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserComments
        fields = '__all__'


class WorkFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorksFiles
        fields = '__all__'


class WorkBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkBlockType
        fields = '__all__'

