from django.contrib import admin
from django.contrib.contenttypes.admin import GenericTabularInline

from comments.models import Comment
from likes.admin import LikeInline


class CommentInline(GenericTabularInline):
    model = Comment

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    inlines = [
        LikeInline,
    ]