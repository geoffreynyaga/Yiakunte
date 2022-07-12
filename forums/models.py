from django.conf import settings
from django.db import models

# Create your models here.


class Forum(models.Model):
    name = models.CharField(max_length=60)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    details = models.TextField(blank=True, null=True)

    num_of_messages = models.PositiveIntegerField(default=0)

    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.name


def upload_category_image(instance, filename):
    category_name = instance.forum.name if instance.forum.name else None
    return f"images/{category_name}/{filename}"


def upload_category_audio(instance, filename):
    category_name = instance.forum.name if instance.forum.name else None

    return f"audio/{category_name}/{filename}"


class ForumMessage(models.Model):
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    forum = models.ForeignKey(Forum, on_delete=models.CASCADE)

    message = models.TextField(blank=True, null=True)

    image = models.ImageField(upload_to=upload_category_image, blank=True, null=True)
    video = models.FileField(upload_to=upload_category_audio, blank=True, null=True)

    flagged_inappropriate = models.BooleanField(default=False)
    is_closed = models.BooleanField(default=False)

    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.forum}: {self.message[:15]}"
