from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from comments.models import Comment


class CommentSerializer(ModelSerializer):

    author = serializers.ReadOnlyField

    class Meta:
        model = Comment
        fields = 'text',

    # def create(self, validated_data):
        # object = super(CommentSerializer, self).create(validated_data)
        # object.author = validated_data['']
        # object.author = self.request.user