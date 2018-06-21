from django.shortcuts import render

# Create your views here.
from rest_framework.viewsets import ModelViewSet

from events.models import Event
from events.serializers import EventSerializer


class EventViewSet(ModelViewSet):
    def get_queryset(self):
        qs = super().get_queryset()
        if not self.request.user.is_authenticated:
            return []
        return qs

    queryset = Event.objects.all()
    serializer_class = EventSerializer