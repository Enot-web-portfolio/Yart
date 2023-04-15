from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from . import views
from .views import UserViewSet

urlpatterns = [
    path("users/<int:id>/", views.UserViewSet.as_view({"get": "user_detail"}), name="user_detail"),
    path("subscriptions/<int:id>/", views.UserViewSet.as_view({"get": "user_subs"}), name="user_subs"),
    path("skills/", views.SkillsViewSet.as_view({"get": "skills_list"}), name="skills_list"),
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

