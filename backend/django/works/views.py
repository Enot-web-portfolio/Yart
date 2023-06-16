import datetime
import json
import uuid
import boto3
import django
from django.core.paginator import Paginator
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from accounts.models import UserSubscribtions
from backend import settings
from .models import *
from .serializers import *
from accounts.models import UserAccount


class WorksViewSet(viewsets.ViewSet):
    def get_permissions(self):
        if self.action == "like_work" or self.action == 'unlike_work' or self.action == 'comment_work' \
                or self.action == 'edit_comment_work' or self.action == 'delete_comment_work' \
                or self.action == 'edit_work':
            self.permission_classes = (IsAuthenticated,)
        else:
            self.permission_classes = (AllowAny,)
        return tuple(permission() for permission in self.permission_classes)

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
                    if request.user.id is not None:
                        serializer['user_main_skills'] = request.user.selected_main_skills
                        subs = UserSubscribtions.objects.get(id=request.user.id)
                        if serializer['user_id'] in subs.subs_list:
                            serializer['is_subscribe'] = True
                        else:
                            serializer['is_subscribe'] = False
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
            for i in range(len(serializer)):
                if request.user.id is not None:
                    serializer[i]['user_main_skills'] = request.user.selected_main_skills
                    subs = UserSubscribtions.objects.get(id=request.user.id)
                    if serializer[i]['user_id'] in subs.subs_list:
                        serializer[i]['is_subscribe'] = True
                    else:
                        serializer[i]['is_subscribe'] = False
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
        elif request.GET.getlist("skillIds", None):
            List = Works
            query = List.objects.all()
            serializer = WorksShortSerializer(query, many=True).data
            response_list = []
            s_ids = list(map(int, request.GET.get("skillIds", "").split(",")))
            for i in serializer:
                for j in s_ids:
                    if int(j) in i['main_skills'] and i not in response_list:
                        response_list.append(i)
            for i in range(len(response_list)):
                if request.user.id is not None:
                    serializer[i]['user_main_skills'] = request.user.selected_main_skills
                    subs = UserSubscribtions.objects.get(id=request.user.id)
                    if serializer[i]['user_id'] in subs.subs_list:
                        serializer[i]['is_subscribe'] = True
                    else:
                        serializer[i]['is_subscribe'] = False
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
                if request.user.id is not None:
                    serializer[i]['user_main_skills'] = request.user.selected_main_skills
                    subs = UserSubscribtions.objects.get(id=request.user.id)
                    if serializer[i]['user_id'] in subs.subs_list:
                        serializer[i]['is_subscribe'] = True
                    else:
                        serializer[i]['is_subscribe'] = False
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
        blocks = []
        for i in work.blocks:
            blocks.append(WorkBlockSerializer(WorkBlockType.objects.get(id=i)).data)
        serializer = WorksSerializer(work).data
        serializer['blocks'] = blocks
        if request.user.id is not None:
            serializer['user_main_skills'] = request.user.selected_main_skills
            subs = UserSubscribtions.objects.get(id=request.user.id)
            if serializer['user_id'] in subs.subs_list:
                serializer['is_subscribe'] = True
            else:
                serializer['is_subscribe'] = False
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
    def edit_work_get(self, request, *args, **kwargs):
        Works = UserWorks
        work = get_object_or_404(Works, pk=kwargs['id'])
        serializer = EditingWorkSerializer(work).data
        blocks = []
        for i in serializer['blocks']:
            block = WorkBlockType.objects.get(id=i)
            blocks.append(WorkBlockSerializer(block).data)
        serializer['blocks'] = blocks
        return Response(serializer)

    @action(permission_classes=(IsAuthenticated,), detail=True)
    def edit_work_post(self, request, *args, **kwargs):
        Works = UserWorks
        work = get_object_or_404(Works, pk=kwargs['id'])
        serializer = EditingWorkSerializer()
        data = request.data
        for i in data['blocks']:
            if i['type'] == 0:
                work.start_text = i['text'][:255]
                break
        blocks = []
        for i in data['blocks']:
            try:
                block = WorkBlockSerializer(WorkBlockType.objects.get(
                    type=i['type'],
                    image_urls=i['image_urls'],
                    text=i['text'],
                    order=i['order'],
                )).data
                blocks.append(block['id'])
            except:
                block = WorkBlockType.objects.create(
                    type=i['type'],
                    image_urls=i['image_urls'],
                    text=i['text'],
                    order=i['order'],
                )
                blocks.append(block.id)
        data['blocks'] = blocks
        EditingWorkSerializer.update(self=serializer, instance=work, validated_data=data)
        return Response(EditingWorkSerializer(work).data)

    @action(permission_classes=(IsAuthenticated,), detail=True)
    def upload_files(self, request, *args, **kwargs):
        data = request.data
        img = data['file']
        session = boto3.session.Session()
        s3 = session.client(
            service_name='s3',
            endpoint_url='https://hb.bizmrg.com',
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        )
        id = uuid.uuid4()
        key = f'worksfile_{id}.png'
        s3.put_object(Body=img, Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=f'media/user/{request.user.id}/works/{key}')
        image_url = f'https://cloud.enotwebstudio.ru/media/user/{request.user.id}/works/{key}'
        userFile = WorksFiles
        userFile.objects.create(file=image_url)
        return Response(image_url)

    @action(permission_classes=(IsAuthenticated,), detail=True)
    def work_create_get(self, request, *args, **kwargs):
        resp = {
            "name": '',
            "image_url": '',
            "main_skills": [],
            "tags": [],
            "open_comments": False,
            "blocks": [],
            "file_urls": [],
        }
        return Response(resp)

    @action(permission_classes=(IsAuthenticated,), detail=True)
    def work_create_post(self, request, *args, **kwargs):
        data = request.data
        data["user_first_name"] = request.user.first_name
        data["user_last_name"] = request.user.last_name
        data["user_id"] = request.user.id
        data["user_main_skills"] = request.user.selected_main_skills
        data["user_image_url"] = request.user.image_url
        data["likes_count"] = 0
        data["likes_list"] = []
        data["start_text"] = ""
        data["comments"] = []
        data["date"] = datetime.date.today()
        blocks = []
        for i in data['blocks']:
            block = WorkBlockType.objects.create(
                type=i['type'],
                image_urls=i['image_urls'],
                text=i['text'],
                order=i['order'],
            )
            blocks.append(block.id)
        work = UserWorks.objects.create(
            user_first_name=data["user_first_name"],
            user_last_name=data["user_last_name"],
            user_id=data["user_id"],
            user_main_skills=data["user_main_skills"],
            user_image_url=data["user_image_url"],
            likes_count=data["likes_count"],
            likes_list=data["likes_list"],
            start_text=data["start_text"],
            comments=data["comments"],
            date=data["date"],
            name=data["name"],
            image_url=data["image_url"],
            main_skills=data["main_skills"],
            tags=data["tags"],
            open_comments=data["open_comments"],
            blocks=blocks,
            file_urls=data["file_urls"],
        )
        serializer = CreateWorkSerializer(work).data
        serializer['start_text'] = None
        for i in data['blocks']:
            if i['type'] == 0:
                serializer['start_text'] = i['text']
                break
        return Response(serializer)

    @action(permission_classes=(IsAuthenticated,), detail=True)
    def workblock_create_get(self, request, *args, **kwargs):
        resp = {
            "type": 0,
            "image_urls": [],
            "text": "",
            "order": 0,
        }
        return Response(resp)

    @action(permission_classes=(IsAuthenticated,), detail=True)
    def workblock_create_post(self, request, *args, **kwargs):
        data = request.data
        block = WorkBlockType.objects.create(
            type=data['type'],
            image_urls=data['image_urls'],
            text=data['text'],
            order=data['order'],
        )
        return Response(WorkBlockSerializer(block).data)
