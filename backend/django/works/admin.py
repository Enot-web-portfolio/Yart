from django.contrib import admin
from .models import *


class UserWorksAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'user_id', 'likes_count', 'date')
    list_display_links = ('id', 'name')
    search_fields = ('id', 'user_id', 'name', 'date')
    list_filter = ('user_id', 'date')
    readonly_fields = ('id', 'user_id', 'likes_count', 'date', 'user_first_name', 'user_last_name', 'user_image_url', 'likes_list')


class UserCommentsAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_id', 'text')
    list_display_links = ('id',)
    search_fields = ('id', 'user_id', 'text')
    list_filter = ('user_id',)
    readonly_fields = ('id', 'user_id')


class WorkBlockTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'type', 'text')
    list_display_links = ('id',)
    search_fields = ('id', 'type', 'text')
    list_filter = ('type',)
    readonly_fields = ('id', 'type')


class WorkFilesAdmin(admin.ModelAdmin):
    list_display = ('id', 'uploaded_at', 'file')
    list_display_links = ('id',)
    search_fields = ('id', 'uploaded_at', 'file')
    list_filter = ('uploaded_at',)
    readonly_fields = ('id', 'uploaded_at')


admin.site.register(UserComments, UserCommentsAdmin)
admin.site.register(UserWorks, UserWorksAdmin)
admin.site.register(WorkBlockType, WorkBlockTypeAdmin)
admin.site.register(WorksFiles, WorkFilesAdmin)
