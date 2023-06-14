from rest_framework import serializers
from .models import UserWorks, UserComments, WorksFiles


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
        instance.image_url = validated_data.get("imageUrl", instance.image_url)
        instance.main_skills = validated_data.get("mainSkills", instance.main_skills)
        instance.tags = validated_data.get("tags", instance.tags)
        instance.open_comments = validated_data.get("openComments", instance.open_comments)
        instance.blocks = validated_data.get("blocks", instance.blocks)
        instance.file_urls = validated_data.get("fileUrls", instance.file_urls)
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

