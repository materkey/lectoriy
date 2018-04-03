from django.contrib import admin
from django.contrib.contenttypes.admin import GenericTabularInline

from likes.models import Like

class LikeInline(GenericTabularInline):
    model = Like

@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    pass