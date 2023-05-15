from django.urls import path
from django.views.decorators.http import require_http_methods
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from . import views
from djoser.views import UserViewSet

urlpatterns = [
    path("users", views.UserViewSet.as_view({"get": "user_search"}), name="search"),
    path("users/<int:id>/subscribe", views.SubscribtionViewSet.as_view({"post": "subscribe"}), name="subscribe"),
    path("users/<int:id>/unsubscribe", views.SubscribtionViewSet.as_view({"post": "unsubscribe"}), name="unsubscribe"),
    path("users/<int:id>/edit", views.UserViewSet.as_view({"get": "edit_get", "post": "edit_post"}), name="edit"),
    path("users/<int:id>/", views.UserViewSet.as_view({"get": "user_detail"}), name="user_detail"),
    path("subscriptions/<int:id>/", views.SubscribtionViewSet.as_view({"get": "user_subs"}), name="user_subs"),
    path("skills/", views.SkillsViewSet.as_view({"get": "skills_list"}), name="skills_list"),
    path("secondSkills/", views.SkillsViewSet.as_view({"get": "secondary_skills_list"}), name="secondary_skills_list"),
    path('auth/signup', UserViewSet.as_view({'post': 'create'}), name="register"),
    path("auth/signin", TokenObtainPairView.as_view(), name="create-token"),
    path("auth/refresh", TokenRefreshView.as_view(), name="refresh-token"),
    path("auth/verify", TokenVerifyView.as_view(), name="verify-token"),
    path("activation/resend-activation/", UserViewSet.as_view({"post": "resend_activation"}), name="resend_activation"),
    path("activation/<str:uid>/<str:token>/", UserViewSet.as_view({"post": "activation"}), name="activate"),
    path("reset/reset-password/", UserViewSet.as_view({"post": "reset_password"}), name="reset_password"),
    path("reset/reset-password-confirm/<str:uid>/<str:token>/", UserViewSet.as_view({"post": "reset_password_confirm"}),
         name="reset_password_confirm"),
]

