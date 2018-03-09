from django.db import models

from lectoriy import settings


class Chat(models.Model):
    user1 = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='Пользователь1', on_delete=models.DO_NOTHING)
    user2 = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='Пользователь2', on_delete=models.DO_NOTHING)


