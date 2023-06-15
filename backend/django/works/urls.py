from django.urls import path
from . import views

urlpatterns = [
    path("works", views.WorksViewSet.as_view({"get": "get_works"}), name="works"),
    path("works/<int:id>/<int:userId>/like", views.WorksViewSet.as_view({"post": "like_work"}), name="works"),
    path("works/<int:id>/<int:userId>/unlike", views.WorksViewSet.as_view({"post": "unlike_work"}), name="works"),
    path("works/<int:id>", views.WorksViewSet.as_view({"get": "works_id"}), name='works'),
    path("works/<int:id>/comment", views.WorksViewSet.as_view({"post": "comment_work"}), name='works'),
    path("works/<int:id>/comment/<int:com_id>/edit", views.WorksViewSet.as_view({"post": "edit_comment_work"}), name='works'),
    path("works/<int:id>/comment/<int:com_id>/delete", views.WorksViewSet.as_view({"delete": "delete_comment_work"}), name='works'),
    path("works/<int:id>/edit", views.WorksViewSet.as_view({"put": "edit_work_post", "get": "edit_work_get"}), name='works'),
    path("works/<int:id>/fileedit", views.WorksViewSet.as_view({"post": "work_fileedit"}), name='works'),
    path("works/create", views.WorksViewSet.as_view({"get": "work_create_get", "post": "work_create_post"}), name="works"),
    path("files/work/upload", views.WorksViewSet.as_view({"post": "upload_files"})),
    path("works/createblock", views.WorksViewSet.as_view({"get": "workblock_create_get", "post": "workblock_create_post"}), name="works"),
]
