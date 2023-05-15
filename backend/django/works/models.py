import datetime
from django.contrib.postgres.fields import ArrayField
from django.db import models


class WorkBlockType(models.Model):
    id = models.IntegerField(primary_key=True)
    type = models.IntegerField()
    image_urls = ArrayField(models.CharField(max_length=255), default=list())
    text = models.TextField(blank=True)
    order = models.IntegerField()

    objects = models.Manager()

    def __str__(self):
        return str(self.id)


class UserComments(models.Model):
    id = models.IntegerField(primary_key=True)
    user_id = models.IntegerField()
    text = models.TextField()

    objects = models.Manager()

    def __str__(self):
        return str(self.id)


class UserWorks(models.Model):
    id = models.IntegerField(primary_key=True)
    user_first_name = models.CharField(max_length=255)
    user_last_name = models.CharField(max_length=255)
    user_id = models.IntegerField()
    user_main_skills = ArrayField(models.IntegerField(), default=list())
    user_image_url = models.CharField(max_length=255, default='')
    main_skills = ArrayField(models.IntegerField(), default=list())
    likes_count = models.IntegerField(default=0)
    likes_list = ArrayField(models.IntegerField(), default=list())
    image_url = models.CharField(max_length=255, default='')
    start_text = models.CharField(max_length=255, default='')
    name = models.CharField(max_length=255, default=f'New work {id} from {user_first_name}')
    comments = ArrayField(models.IntegerField(), default=list())
    open_comments = models.BooleanField(default=False)
    blocks = ArrayField(models.IntegerField(), default=list())
    date = models.DateField(default=datetime.datetime.now())
    tags = ArrayField(models.CharField(max_length=255), default=list())
    file_urls = ArrayField(models.CharField(max_length=255), default=list())

    objects = models.Manager()

    def __str__(self):
        return str(self.id)


class WorksFiles(models.Model):
    uploaded_at = models.DateField(default=datetime.datetime.now())
    file = models.CharField(max_length=255)

    objects = models.Manager()

    def __str__(self):
        return self.file