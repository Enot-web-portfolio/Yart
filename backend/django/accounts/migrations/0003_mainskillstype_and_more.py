# Generated by Django 4.2 on 2023-05-16 10:57

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_mainskillstype'),
    ]

    operations = [
        migrations.CreateModel(
            name='MainSkillsType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('background_color', models.CharField(max_length=255)),
                ('font_color', models.CharField(max_length=255)),
                ('checked', models.BooleanField(default=False)),
            ],
        ),
        migrations.RemoveField(
            model_name='useraccount',
            name='available_main_skills',
        ),
        migrations.RemoveField(
            model_name='useraccount',
            name='available_secondary_skills',
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='additional_links',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(default='', max_length=255), blank=True, default=list, size=None),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='selected_main_skills',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), blank=True, default=list, size=None),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='selected_secondary_skills',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), blank=True, default=list, size=None),
        ),
        migrations.AlterField(
            model_name='usersubscribtions',
            name='subs_list',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), default=list, size=None),
        ),
    ]