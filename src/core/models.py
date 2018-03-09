from __future__ import unicode_literals

from django.contrib.auth.models import AbstractUser

from lectoriy import settings


class User(AbstractUser):

    pass

# class DatedMixin(models.Model):
#
#     created_at = models.Date
#
#
#
# class AuthoredMixin(models.Model):
#
#     author = models.ForeignKey(settings.AUTH_USER_MODEL)
#
#     class Meta:
#         abstract = True