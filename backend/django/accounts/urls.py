from django.urls import path
from . import views

urlpatterns = [
    path("users/<int:id>/", views.UserViewSet.as_view({"get": "user_detail"}), name="user_detail"),
    path("subscriptions/<int:id>/", views.UserViewSet.as_view({"get": "user_subs"}), name="user_subs"),
    path("skills/", views.SkillsViewSet.as_view({"get": "skills_list"}), name="skills_list"),
]

