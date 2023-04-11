from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model

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
                  'available_main_skills',
                  'selected_main_skills',
                  'available_secondary_skills',
                  'city',
                  'company',
                  'subscribers_count',
                  'works_count',
                  'phone',
                  'additional_links',)
