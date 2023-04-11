from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.contrib.postgres.fields import ArrayField


class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Required.')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save()

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    image_url = models.CharField(default=None, max_length=255)
    available_main_skills = ArrayField(models.CharField(max_length=255), default=None)
    selected_main_skills = ArrayField(models.CharField(max_length=255), default=None)
    available_secondary_skills = ArrayField(models.CharField(max_length=255), default=None)
    selected_secondary_skills = ArrayField(models.CharField(max_length=255), default=None)
    city = models.CharField(default=None, max_length=255)
    company = models.CharField(default=None, max_length=255)
    subscribers_count = models.IntegerField(default=0)
    works_count = models.IntegerField(default=0)
    phone = models.IntegerField(default=None)
    additional_links = ArrayField(models.CharField(max_length=255), default=None)
    description = models.CharField(max_length=255, default=None)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_full_name(self):
        return self.first_name

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.email
