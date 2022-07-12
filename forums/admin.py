from django.contrib import admin

from forums.models import Forum, ForumMessage

# Register your models here.


class ForumAdmin(admin.ModelAdmin):
    list_display = ("name", "created_by")


admin.site.register(Forum, ForumAdmin)


class ForumMessageAdmin(admin.ModelAdmin):
    list_display = (
        "created_by",
        "forum",
        "message",
        "image",
        "video",
        "flagged_inappropriate",
        "is_closed",
        "date_created",
        "date_modified",
    )


admin.site.register(ForumMessage, ForumMessageAdmin)
