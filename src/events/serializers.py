from rest_framework.serializers import ModelSerializer

from events.models import Event


class EventSerializer(ModelSerializer):
    # def __init__(self, user):
        # if user.id ==

    class Meta:
        model = Event
        fields = ('id', 'title', )