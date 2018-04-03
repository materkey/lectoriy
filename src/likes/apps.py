from django.apps import AppConfig


class LikesConfig(AppConfig):
    name = 'likes'
    verbose_name = 'Лайки'

    def ready(self):
        import likes.signals
