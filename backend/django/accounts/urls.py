from django.urls import path
from . import views

urlpatterns = [
    path("<int:id>/", views.UserViewSet.as_view({"get": "me"}), name="user_detail")]

