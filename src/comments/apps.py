from django.apps import AppConfig


class CommentsConfig(AppConfig):
    name = 'comments'
    verbose_name = 'Комментарии'

    def ready(self):
        import comments.signals
