from django.urls import path
from . import views

urlpatterns = [
    path("<int:id>/", views.UserViewSet.as_view({"get": "user_detail"}), name="user_detail")]

