from rest_framework.viewsets import ModelViewSet

# Create your views here.
from videos.models import Course, Video
from videos.serializers import CourseSerializer, VideoEditSerializer, VideoReadSerializer


class CourseViewSet(ModelViewSet):
    def get_queryset(self):
        qs = super().get_queryset()
        if not self.request.user.is_authenticated:
            return []
        return qs

    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class VideoViewSet(ModelViewSet):
    def get_queryset(self):
        qs = super().get_queryset()
        if not self.request.user.is_authenticated:
            return []
        return qs

    queryset = Video.objects.all()
    serializer_class = VideoReadSerializer

    def get_serializer_class(self):
        # print(self.get_object())
        serializer_class = self.serializer_class
        if self.request.method == 'POST':
            serializer_class = VideoEditSerializer
        return serializer_class
