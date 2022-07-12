from django.contrib import admin

from dictionary.models import Category, CategoryItem

# Register your models here.


class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)


admin.site.register(Category, CategoryAdmin)


class CategoryItemAdmin(admin.ModelAdmin):
    def get_category(self, obj):
        return obj.category.name

    list_display = ("get_category", "yiakunte_name", "english_name")


admin.site.register(CategoryItem, CategoryItemAdmin)
