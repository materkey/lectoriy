from django.db.models import F
from django.db.models.signals import post_save, post_init
from django.dispatch import receiver

from likes.models import Like


@receiver(post_init, sender=Like)
def watch_is_active(instance, **kwargs):

    instance.is_active_was = instance.is_active

@receiver(post_save, sender=Like)
def check_is_active(instance, created=False, **kwargs):
    if hasattr(instance.object.__class__, 'objects'):
        if created:
            instance.object.__class__.objects.filter(pk=instance.object_id).update(likes_count=F('likes_count') + 1)
            return

        if instance.is_active_was != instance.is_active:
            if instance.is_active:
                instance.object.__class__.objects.filter(pk=instance.object_id).update(likes_count=F('likes_count') - 1)
            else:
                instance.object.__class__.objects.filter(pk=instance.object_id).update(likes_count=F('likes_count') + 1)
