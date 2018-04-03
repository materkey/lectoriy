from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.db import models

from core.models import AuthoredMixin
from events.models import EventableMixin


class Like(AuthoredMixin, EventableMixin):
    object_id = models.PositiveIntegerField(verbose_name='Идентификатор объекта')
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, verbose_name='Тип объекта')
    object = GenericForeignKey()
    is_active = models.BooleanField(default=True, verbose_name='Активный')

    def get_title(self):
        return u'Лайк от %s' % (self.author.username)

    def __str__(self):
        return u'Лайк'

    class Meta:
        verbose_name = 'Лайк'
        verbose_name_plural = 'Лайки'

class LikeableMixin(models.Model):
    likes = GenericRelation(Like, verbose_name='Лайки')
    likes_count = models.IntegerField(default=0, verbose_name='Число лайков')
