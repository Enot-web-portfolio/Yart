from django.urls import path
from django.views.decorators.http import require_http_methods
from . import views

urlpatterns = [
    path("users/<int:id>/subscribe", views.SubscribtionViewSet.as_view({"post": "subscribe"}), name="subscribe"),
    path("users/<int:id>/unsubscribe", views.SubscribtionViewSet.as_view({"post": "unsubscribe"}), name="unsubscribe"),
    path("users/<int:id>/edit", views.UserViewSet.as_view({"get": "edit_get", "post": "edit_post"}), name="edit"),
    path("users/<int:id>/", views.UserViewSet.as_view({"get": "user_detail"}), name="user_detail"),
    path("subscriptions/<int:id>/", views.SubscribtionViewSet.as_view({"get": "user_subs"}), name="user_subs"),
    path("skills/", views.SkillsViewSet.as_view({"get": "skills_list"}), name="skills_list"),
]

