from django.contrib import admin

from videos.models import Category
from comments.admin import CommentInline
from videos.models import Course
from videos.models import Lecturer
from likes.admin import LikeInline
from videos.models import UserSubscription, LecturerSubscription, CourseSubscription
from videos.models import Collection
from videos.models import Video


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    inlines = [
        CommentInline,
        LikeInline,
    ]


class CollectionVideoInline(admin.TabularInline):
    model = Video


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    inlines = [
        CollectionVideoInline,
        CommentInline,
        LikeInline,
    ]


@admin.register(UserSubscription)
class UserSubscriptionAdmin(admin.ModelAdmin):
    pass


@admin.register(LecturerSubscription)
class LecturerSubscriptionAdmin(admin.ModelAdmin):
    pass


@admin.register(CourseSubscription)
class CourseSubscriptionAdmin(admin.ModelAdmin):
    pass


class CourseInline(admin.TabularInline):
    model = Course


@admin.register(Lecturer)
class LecturerAdmin(admin.ModelAdmin):
    inlines = [
        CourseInline,
        CommentInline,
        LikeInline,
    ]


class CourseVideoInline(admin.TabularInline):
    model = Video
    fk_name = 'video_course'


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    inlines = [
        CourseVideoInline,
        CommentInline,
        LikeInline,
    ]


# class CategoryInline(admin.TabularInline):
#     model = Category

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass
    # inlines = [
    #     CategoryInline,
    # ]
