from django.shortcuts import render
from rest_framework.viewsets import ReadOnlyModelViewSet

from comments.models import Comment
from .serializers import CommentSerializer

class CommentViewSet(ReadOnlyModelViewSet):

    serializer_class = CommentSerializer
    queryset = Comment.objects.all()