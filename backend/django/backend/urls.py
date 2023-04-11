from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from djoser.views import UserViewSet
from rest_framework import permissions
from django.urls import path, include, re_path
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

schema_view = get_schema_view(
   openapi.Info(
      title="Digital Portfolio API",
      default_version='v1',
      description="Our best description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="noreply@enotwebstudio.ru"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)


urlpatterns = [
    path('auth/signup', UserViewSet.as_view({'post': 'create'}), name="register"),
    path("auth/signin", TokenObtainPairView.as_view(), name="create-token"),
    path("auth/refresh", TokenRefreshView.as_view(), name="refresh-token"),
    path("auth/verify", TokenVerifyView.as_view(), name="verify-token"),
    path("activation/resend-activation/", UserViewSet.as_view({"post": "resend_activation"}), name="resend_activation"),
    path("activation/<str:uid>/<str:token>/", UserViewSet.as_view({"post": "activation"}), name="activate"),
    path("reset/reset-password/", UserViewSet.as_view({"post": "reset_password"}), name="reset_password"),
    path("reset/reset-password-confirm/<str:uid>/<str:token>/", UserViewSet.as_view({"post": "reset_password_confirm"}),
         name="reset_password_confirm"),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

# urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]