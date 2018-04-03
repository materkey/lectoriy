from django.db.models.signals import post_save

from events.models import EventableMixin, Event


def saving_eventable_model(instance, created=False, **kwargs):

    if created:
        e = Event()
        e.title = instance.get_title()
        e.author = instance.get_author()
        e.object = instance
        e.save()

for model in EventableMixin.__subclasses__():
    post_save.connect(saving_eventable_model, sender=model)
