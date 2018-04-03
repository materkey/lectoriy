from django.db.models import F
from django.db.models.signals import post_save, post_init
from django.dispatch import receiver

from comments.models import Comment


@receiver(post_init, sender=Comment)
def watch_is_deleted(instance, **kwargs):

    instance.is_deleted_was = instance.is_deleted

@receiver(post_save, sender=Comment)
def check_is_deleted(instance, created=False, **kwargs):

    if hasattr(instance.object.__class__, 'objects'):
        if created:
            instance.author.comments_count = comments_count + 1
            instance.object.__class__.objects.filter(pk=instance.object_id).update(comments_count=F('comments_count') + 1)
            return

        if instance.is_deleted_was != instance.is_deleted:
            if instance.is_deleted:
                instance.author.comments_count = comments_count - 1
                instance.object.__class__.objects.filter(pk=instance.object_id).update(comments_count=F('comments_count') - 1)
            else:
                instance.author.comments_count = comments_count + 1
                instance.object.__class__.objects.filter(pk=instance.object_id).update(comments_count=F('comments_count') + 1)
