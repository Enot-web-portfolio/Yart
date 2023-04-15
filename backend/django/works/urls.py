from django.urls import path
from . import views

urlpatterns = [
    path("works", views.WorksViewSet.as_view({"get": "get_works"}), name="works"),
    path("works/<int:id>/<int:userId>/like", views.WorksViewSet.as_view({"post": "like_work"}), name="works"),
    path("works/<int:id>/<int:userId>/unlike", views.WorksViewSet.as_view({"post": "unlike_work"}), name="works"),
    path("works/<int:id>", views.WorksViewSet.as_view({"get": "works_id"}), name='works')
]