from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.db import models

from core.models import PublicationMixin, AuthoredMixin


class Event(AuthoredMixin):

    object_id = models.PositiveIntegerField(verbose_name='Идентификатор объекта')
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, verbose_name='Тип объекта')
    object = GenericForeignKey()
    title = models.CharField(max_length=255, verbose_name='Название события')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Событие'
        verbose_name_plural = 'События'

class EventableMixin(models.Model):

    event = GenericRelation(Event, verbose_name='Событие')

    class Meta:
        abstract = True

    def get_title(self):
        raise NotImplementedError

    def get_author(self):
        raise NotImplementedError

