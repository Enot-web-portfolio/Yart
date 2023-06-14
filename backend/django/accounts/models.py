import django
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager, UserManager
from django.contrib.postgres.fields import ArrayField


class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Required.')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save()

        UserSubscribtions.objects.create(id=user.id, subs_list=list())

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Required.')

        extra_fields['is_staff'] = True
        extra_fields['is_superuser'] = True

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save()

        UserSubscribtions.objects.create(id=user.id, subs_list=list())

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    image_url = models.CharField(default='', max_length=255, blank=True)
    selected_main_skills = ArrayField(models.IntegerField(), default=list, blank=True)
    selected_secondary_skills = ArrayField(models.IntegerField(), default=list, blank=True)
    city = models.CharField(default='', max_length=255, blank=True)
    company = models.CharField(default='', max_length=255, blank=True)
    subscribers_count = models.IntegerField(default=0, blank=True)
    works_count = models.IntegerField(default=0, blank=True)
    phone = models.CharField(default='', max_length=255, blank=True)
    additional_links = ArrayField(models.CharField(max_length=255, default=''), default=list, blank=True)
    description = models.CharField(max_length=255, default='', blank=True)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_full_name(self):
        return self.first_name

    def get_short_name(self):
        return self.first_name

    def has_perm(*args, **kwargs):
        return True

    def has_module_perms(*args, **kwargs):
        return True

    def __str__(self):
        return self.email


class UserSubscribtions(models.Model):
    id = models.IntegerField(primary_key=True)
    subs_list = ArrayField(models.IntegerField(), default=list)

    objects = models.Manager()

    def __str__(self):
        return str(self.id)


class MainSkillsType(models.Model):
    name = models.CharField(max_length=256)
    background_color = models.CharField(max_length=255)
    font_color = models.CharField(max_length=255)
    checked = models.BooleanField(default=False)

    objects = models.Manager()

    def __str__(self):
        return self.name


class SecondarySkillsType(models.Model):
    name = models.CharField(max_length=255)
    background_color = models.CharField(max_length=255)
    font_color = models.CharField(max_length=255)
    checked = models.BooleanField(default=False)

    objects = models.Manager()

    def __str__(self):
        return self.name


class UserFiles(models.Model):
    uploaded_at = models.DateTimeField(default=django.utils.timezone.now)
    file = models.CharField(max_length=255)

    objects = models.Manager()

    def __str__(self):
        return self.file