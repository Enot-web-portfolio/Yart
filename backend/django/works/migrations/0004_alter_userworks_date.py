# Generated by Django 4.2 on 2023-04-16 06:49

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('works', '0003_usercomments_alter_userworks_comments_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userworks',
            name='date',
            field=models.DateField(default=datetime.datetime(2023, 4, 16, 11, 49, 49, 265222)),
        ),
    ]
