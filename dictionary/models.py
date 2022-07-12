from django.db import models

# Create your models here.


class Category(models.Model):
    class Meta:
        verbose_name_plural = "Categories"

    name = models.CharField(
        max_length=30,
    )


def upload_category_image(instance, filename):
    category_name = instance.category.name if instance.category.name else None
    return f"images/{category_name}/{filename}"


def upload_category_audio(instance, filename):
    category_name = instance.category.name if instance.category.name else None

    return f"audio/{category_name}/{filename}"


class CategoryItem(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    yiakunte_name = models.CharField(max_length=60)
    english_name = models.CharField(max_length=60)
    image = models.ImageField(upload_to=upload_category_image, blank=True, null=True)
    voice = models.FileField(upload_to=upload_category_audio, blank=True, null=True)

    verified = models.BooleanField(default=False)
    verify_count = models.IntegerField(default=0)

    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    # def save(self, args, **kwargs):
    #     if self.verify_count >= 5:
    #         self.verified = True
    #     super(CategoryItem, self).save(*args, **kwargs)
