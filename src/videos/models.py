from django.db import models

from comments.models import CommentableMixin
from core.models import AuthoredMixin, PublicationMixin, DatedMixin
from events.models import EventableMixin
from lectoriy import settings
from likes.models import LikeableMixin


class Category(models.Model):
    title = models.CharField(max_length=255, verbose_name='Название категории')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = u'Категория'
        verbose_name_plural = u'Категории'

class Lecturer(LikeableMixin, CommentableMixin):
    name = models.CharField(max_length=255, verbose_name='Имя')
    bio = models.TextField(verbose_name='О лекторе')

    def __str__(self):
        return u'%s' % (self.name)

    class Meta:
        verbose_name = u'Лектор'
        verbose_name_plural = u'Лекторы'


class Course(LikeableMixin, DatedMixin, CommentableMixin):
    title = models.CharField(max_length=255, verbose_name='Название курса')
    lecturers = models.ManyToManyField(Lecturer, related_name='courses', verbose_name='Лектор')
    categories = models.ManyToManyField(Category, related_name='courses', verbose_name="Категории")

    def __str__(self):
        return u'Курс: %s' % (self.title)

    class Meta:
        verbose_name = 'Курс'
        verbose_name_plural = 'Курсы'


class Video(AuthoredMixin, EventableMixin, PublicationMixin, DatedMixin, LikeableMixin, CommentableMixin):
    lecturer = models.ManyToManyField(Lecturer, related_name='lections', verbose_name='Лектор')
    link = models.CharField(max_length=255, verbose_name='Ссылка на видео')
    title = models.CharField(max_length=255, verbose_name='Заголовок')
    video_course = models.ForeignKey(Course, on_delete=models.CASCADE, verbose_name='Курс')
    categories = models.ManyToManyField(Category, related_name='videos', verbose_name="Категории")

    # course = models.ForeignKey(Course, on_delete=models.CASCADE) # videos.Video.course: (models.E006) The field 'course' clashes with the field 'course' from model 'likes.likeablemixin'.

    def get_title(self):
        return u'Новая лекция %s' % (self.title)

    def __str__(self):
        return u'Видео: %s' % (self.title)

    class Meta:
        verbose_name = 'Видео'
        verbose_name_plural = 'Видео'


class Collection(LikeableMixin, DatedMixin, CommentableMixin):
    title = models.CharField(max_length=255, verbose_name='Название коллекции')
    lecturers = models.ManyToManyField(Lecturer, related_name='collections', verbose_name='Лекторы')
    categories = models.ManyToManyField(Category, related_name='collections', verbose_name="Категории")

    def __str__(self):
        return u'Курс: %s' % (self.title)

    class Meta:
        verbose_name = 'Коллекция'
        verbose_name_plural = 'Коллекции'


class UserSubscription(EventableMixin, DatedMixin):
    user1 = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='user_subscriptions', on_delete=models.CASCADE,
                              verbose_name='Пользователь 1')
    user2 = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='subscribers', on_delete=models.CASCADE,
                              verbose_name='Пользователь 2')
    is_active = models.BooleanField(default=True, verbose_name='Активна')

    def get_title(self):
        return u'Пользователь %s подписался на пользовате %s' % (self.user1, self.user2)

    def __str__(self):
        return u'Подписка: на пользователя %s' % (self.user2.name)

    class Meta:
        verbose_name = 'Подписка на пользователя'
        verbose_name_plural = 'Подписки на пользователей'


class LecturerSubscription(EventableMixin, DatedMixin):
    subscriber = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='lecturer_subscriptions',
                                   on_delete=models.CASCADE, verbose_name='Подписчик')
    lecturer = models.ForeignKey(Lecturer, related_name='subscribers', on_delete=models.CASCADE, verbose_name='Лектор')
    is_active = models.BooleanField(default=True, verbose_name='Активна')

    def get_title(self):
        return u'Пользователь %s подписался на лектора %s' % (self.subscriber, self.lecturer)

    def __str__(self):
        return u'Подписка: на лектора %s' % (self.lecturer.name)

    class Meta:
        verbose_name = 'Подписка на лектора'
        verbose_name_plural = 'Подписки на лекторов'


class CourseSubscription(EventableMixin, DatedMixin):
    subscriber = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='course_subscriptions',
                                   on_delete=models.CASCADE, verbose_name='Подписчик')
    course = models.ForeignKey(Course, related_name='subscribers', on_delete=models.CASCADE, verbose_name='Курс')
    is_active = models.BooleanField(default=True, verbose_name='Активна')

    def get_title(self):
        return u'Пользователь %s подписался на курс %s' % (self.subscriber, self.course)

    def __str__(self):
        return u'Подписка: на курс %s' % (self.course.title)

    class Meta:
        verbose_name = 'Подписка на курс'
        verbose_name_plural = 'Подписки на курсы'


