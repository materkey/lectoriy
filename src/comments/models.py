from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.db import models

from core.models import AuthoredMixin, DatedMixin, PublicationMixin
from events.models import EventableMixin
from likes.models import LikeableMixin


class Comment(AuthoredMixin, DatedMixin, PublicationMixin, LikeableMixin, EventableMixin):
    object_id = models.PositiveIntegerField(verbose_name='Идентификатор объекта')
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, verbose_name='Тип объекта')
    object = GenericForeignKey()

    def get_title(self):
        return u'Пользователь %s оставил комментарий' % (self.author)

    def __str__(self):
        return u'Комментарий: от %s' % (self.author.username)

    class Meta:
        verbose_name = u'Комментарий'
        verbose_name_plural = u'Комментарии'

class CommentableMixin(models.Model):
    comments = GenericRelation(Comment,  verbose_name='Комментарии')
    comments_count = models.IntegerField(default=0, verbose_name='Число комментариев')

    class Meta:
        abstract = True
