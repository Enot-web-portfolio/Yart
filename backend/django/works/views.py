import json
import uuid
import boto3
from django.core.paginator import Paginator
from rest_framework import viewsets
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from accounts.models import UserSubscribtions
from backend import settings
from .models import UserWorks, UserComments, WorksFiles
from .serializers import WorksShortSerializer, WorksSerializer, WorksLikeSerializer, UserCommentsSerializer, EditingWorkSerializer, WorkFilesSerializer
from accounts.models import UserAccount

class WorksViewSet(viewsets.ViewSet):
    permission_classes = (AllowAny,)

    @action(permission_classes=(AllowAny,), detail=True)
    def get_works(self, request, *args, **kwargs):
        Works = UserWorks

        if request.GET.get("onlySubscriptions", 'false') != 'false':
            List = UserSubscribtions
            query_subs = List.objects.get(pk=request.user.id)
            query = []
            for i in query_subs.subs_list:
                try:
                    serializer = WorksShortSerializer(Works.objects.get(user_id=int(i))).data
                    query.append(serializer)
                    if request.user.id is not None and request.user.id in serializer['likes_list']:
                        serializer['isLike'] = True
                    elif request.user.id is not None and request.user.id not in serializer['likes_list']:
                        serializer['isLike'] = False
                    elif request.user.id is None:
                        serializer['isLike'] = False
                    del serializer['likes_list']
                except:
                    pass

            paginator = Paginator(query, int(request.GET.get("count", 10)))
            if int(request.GET.get("page", 1)) not in paginator.page_range:
                paginator = []
                return Response(paginator)
        elif request.GET.get("userOuterId", None) is not None:
            List = Works
            query = List.objects.filter(user_id=int(request.GET.get("userOuterId", 1)))
            serializer = WorksShortSerializer(query, many=True).data
            print(serializer)
            for i in range(len(serializer)):
                print(serializer[i])
                if request.user.id is not None and request.user.id in serializer[i]['likes_list']:
                    serializer[i]['isLike'] = True
                elif request.user.id is not None and request.user.id not in serializer[i]['likes_list']:
                    serializer[i]['isLike'] = False
                elif request.user.id is None:
                    serializer[i]['isLike'] = False
                del serializer[i]['likes_list']
            paginator = Paginator(serializer, int(request.GET.get("count", 10)))
            if int(request.GET.get("page", 1)) not in paginator.page_range:
                paginator = []
                return Response(paginator)
        elif request.GET.getlist("skillIds", None) is not None:
            List = Works
            query = List.objects.all()
            serializer = WorksShortSerializer(query, many=True).data
            response_list = []
            s_ids = request.GET.getlist("skillIds")
            for i in serializer:
                for j in s_ids:
                    if int(j) in i['main_skills'] and i not in response_list:
                        response_list.append(i)
            for i in range(len(response_list)):
                if request.user.id is not None and request.user.id in serializer[i]['likes_list']:
                    response_list[i]['isLike'] = True
                elif request.user.id is not None and request.user.id not in serializer[i]['likes_list']:
                    response_list[i]['isLike'] = False
                elif request.user.id is None:
                    response_list[i]['isLike'] = False
                del response_list[i]['likes_list']
            paginator = Paginator(response_list, int(request.GET.get("count", 10)))
            if int(request.GET.get("page", 1)) not in paginator.page_range:
                paginator = []
                return Response(paginator)
        else:
            query = Works.objects.all()
            serializer = WorksShortSerializer(query, many=True).data
            for i in range(len(serializer)):
                print(serializer[i])
                if request.user.id is not None and request.user.id in serializer[i]['likes_list']:
                    serializer[i]['isLike'] = True
                elif request.user.id is not None and request.user.id not in serializer[i]['likes_list']:
                    serializer[i]['isLike'] = False
                elif request.user.id is None:
                    serializer[i]['isLike'] = False
                del serializer[i]['likes_list']
            paginator = Paginator(serializer, int(request.GET.get("count", 10)))
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
        serializer = WorksSerializer(work).data
        if request.user.id is not None and request.user.id in serializer['likes_list']:
            serializer['isLike'] = True
        elif request.user.id is not None and request.user.id not in serializer['likes_list']:
            serializer['isLike'] = False
        elif request.user.id is None:
            serializer['isLike'] = False
        del serializer['likes_list']
        return Response(serializer)

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

    @action(permission_classes=(IsAuthenticated,), detail=True)
    def edit_work(self, request, *args, **kwargs):
        Works = UserWorks
        work = Works.objects.get_or_create(pk=kwargs['id'])
        User = UserAccount
        user = User.objects.get(pk=request.user.id)
        user.works_count += 1
        serializer = EditingWorkSerializer()
        EditingWorkSerializer.update(self=serializer, instance=work, validated_data=request.data)
        return Response(EditingWorkSerializer(work).data)

    @action(permission_classes=(IsAuthenticated,), detail=True)
    def work_fileedit(self, request, *args, **kwargs):
        response_list = []
        for i in range(len(json.loads(request.body))):
            image_file = json.loads(request.body)[i]['file']
            session = boto3.session.Session()
            s3 = session.client(
                service_name='s3',
                endpoint_url='https://hb.bizmrg.com',
                aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            )
            id = uuid.uuid4()
            key = f'worksfile_{kwargs["id"]}_{id}.'+image_file.rsplit('.', 1)[1].lower()
            s3.upload_file(image_file, settings.AWS_STORAGE_BUCKET_NAME, f'media/works/{kwargs["id"]}/{key}')
            workfile = WorksFiles
            workfile.objects.create(file=f'https://cloud.enotwebstudio.ru/media/works/{kwargs["id"]}/{key}')
            response_list.append(
                {
                    'blockOrder': json.loads(request.body)[i]['blockOrder'],
                    'fileUrl': f'https://cloud.enotwebstudio.ru/media/works/{kwargs["id"]}/{key}',
                }
            )
        return Response(response_list)

