from django.contrib import admin
from .models import *


class UserAccountAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'first_name', 'last_name', 'is_staff', 'city', 'works_count', 'subscribers_count')
    list_display_links = ('id', 'email')
    search_fields = ('id', 'email', 'first_name', 'last_name', 'city')
    list_filter = ('city', 'first_name', 'last_name', 'is_staff')
    readonly_fields = ('id', 'email', 'works_count', 'subscribers_count', 'password', 'last_login')
    save_on_top = True


admin.site.register(UserAccount, UserAccountAdmin)
admin.site.register(UserSubscribtions)
admin.site.register(MainSkillsType)

admin.site.site_title = 'Управление Yart'
admin.site.site_header = 'Управление Yart'