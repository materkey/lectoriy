from django.db import models

from core.models import AuthoredMixin, DatedMixin, PublicationMixin
from events.models import EventableMixin
from lectoriy import settings


class Chat(DatedMixin):
    user1 = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='user1', on_delete=models.CASCADE, verbose_name='Пользователь 1')
    user2 = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='user2', on_delete=models.CASCADE, verbose_name='Пользователь 2')
    is_archived = models.BooleanField(default=False, verbose_name='Архивировано')

    def __str__(self):
        return u'Чат: %s и %s' % (self.user1.username, self.user2.username)

    class Meta:
        verbose_name = u'Чат'
        verbose_name_plural = u'Чаты'


class Message(AuthoredMixin, DatedMixin, PublicationMixin, EventableMixin):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, verbose_name='Чат')

    def __str__(self):
        return u'Сообщение: от %s' % (self.author.username)

    def get_title(self):
        return u'Пользователь %s прислал сообщение' % (self.author.username)

    class Meta:
        verbose_name = u'Сообщение'
        verbose_name_plural = u'Сообщения'



