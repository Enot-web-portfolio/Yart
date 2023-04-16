import json

from django.core.paginator import Paginator
from rest_framework import viewsets
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from accounts.models import UserSubscribtions
from .models import UserWorks, UserComments
from .serializers import WorksShortSerializer, WorksSerializer, WorksLikeSerializer, UserCommentsSerializer


class WorksViewSet(viewsets.ViewSet):
    permission_classes = (AllowAny,)

    @action(permission_classes=(AllowAny,), detail=True)
    def get_works(self, request, *args, **kwargs):
        Works = UserWorks

        if request.GET.get("onlySubscriptions", None) is not None:
            List = UserSubscribtions
            query_subs = List.objects.get(pk=int(request.GET.get("onlySubscriptions", 1)))
            query = []
            for i in query_subs.subs_list:
                try:
                    query.append(WorksShortSerializer(Works.objects.get(user_id=int(i))).data)
                except:
                    pass

            paginator = Paginator(query, int(request.GET.get("count", 10)))
            if int(request.GET.get("page", 1)) not in paginator.page_range:
                paginator = []
                return Response(paginator)
        elif request.GET.get("userOuterId", None) is not None:
            List = UserSubscribtions
            query = List.objects.filter(user_id=int(request.GET.get("userOuterId", 1)))
            paginator = Paginator(query, int(request.GET.get("count", 10)))
            if int(request.GET.get("page", 1)) not in paginator.page_range:
                paginator = []
                return Response(paginator)
        else:
            query = Works.objects.all()
            serializer = WorksShortSerializer(query, many=True)
            paginator = Paginator(serializer.data, int(request.GET.get("count", 10)))
            if int(request.GET.get("page", 1)) not in paginator.page_range:
                paginator = []
                return Response(paginator)
        return Response(paginator.page(int(request.GET.get("page", 1))).object_list)

    @action(permission_classes=(IsAuthenticated,), detail=True)
    def like_work(self, request, *args, **kwargs):
        Works = UserWorks
        work = Works.objects.get(pk=kwargs['id'])
        if kwargs['userId'] not in work.likes_list:
            work.likes_list.append(kwargs['userId'])
            work.likes_count += 1
            work.save()
        return Response(WorksLikeSerializer(work).data)

    @action(permission_classes=(IsAuthenticated,), detail=True)
    def unlike_work(self, request, *args, **kwargs):
        Works = UserWorks
        work = Works.objects.get(pk=kwargs['id'])
        if kwargs['userId'] in work.likes_list:
            work.likes_list.remove(kwargs['userId'])
            work.likes_count -= 1
            work.save()
        return Response(WorksLikeSerializer(work).data)

    @action(permission_classes=(AllowAny,), detail=True)
    def works_id(self, request, *args, **kwargs):
        Works = UserWorks
        work = Works.objects.get(pk=kwargs["id"])
        return Response(WorksSerializer(work).data)

    @action(permission_classes=(IsAuthenticated,), detail=True)
    def comment_work(self, request, *args, **kwargs):
        Works = UserWorks
        work = Works.objects.get(pk=kwargs['id'])
        Comments = UserComments
        new_id = Comments.objects.latest('id').id + 1
        Comments.objects.create(id=new_id, user_id=kwargs['id'], text=json.loads(request.body)['text'])
        work.comments.append(Comments.objects.get(id=new_id).id)
        work.save()
        return Response(UserCommentsSerializer(Comments.objects.get(id=new_id)).data)

    @action(permission_classes=(IsAuthenticated,), detail=True)
    def edit_comment_work(self, request, *args, **kwargs):
        Comments = UserComments
        comment = Comments.objects.get(id=kwargs['com_id'])
        comment.text = json.loads(request.body)['text']
        comment.save()
        return Response(UserCommentsSerializer(Comments.objects.get(id=kwargs['com_id'])).data)

    @action(permission_classes=(IsAuthenticated,), detail=True)
    def delete_comment_work(self, request, *args, **kwargs):
        Works = UserWorks
        work = Works.objects.get(pk=kwargs['id'])
        work.comments.remove(kwargs['com_id'])
        Comments = UserComments
        id = Comments.objects.get(id=kwargs['com_id']).id
        Comments.objects.get(id=kwargs['com_id']).delete()
        work.save()
        return Response(id)
