from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response


DEFAULT_PAGE = 1
DEFAULT_PAGE_SIZE = 10


class Pagination(LimitOffsetPagination):
    default_limit = 1000
    max_limit = 1000000
    min_limit = 1
    min_offset = 0
    max_offset = 1000000

    def paginate_queryset(self, queryset, request, view=None):

        limit = request.query_params.get('count')
        offset = request.query_params.get('page')

        return super(self.__class__, self).paginate_queryset(queryset, request, view)