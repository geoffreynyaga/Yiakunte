from django.contrib import admin

# Register your models here.

#!/usr/bin/env python3
# -*- coding:utf-8 -*-
##################################################################################
# File: /home/geoff/KTDA/accounts/admin.py                                       #
# Project: /home/geoff/KTDA/accounts                                             #
# Created Date: Saturday, May 7th 2022, 2:12:13 pm                               #
# Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )                     #
# -----                                                                          #
# Last Modified: Saturday June 25th 2022 7:53:51 pm                              #
# Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )               #
# -----                                                                          #
# This file should not be copied and/or distributed without the express          #
# permission of Swift Lab Limited.                                               #
# -----                                                                          #
# Copyright (c) 2022 Swift Lab Limited.                                          #
##################################################################################

from django.contrib import admin

from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.admin import UserAdmin


from .forms import MyAdminPasswordChangeForm, UserAdminCreationForm, UserAdminChangeForm

from .models import SMSToUser, SignUpPassword, User, UserProfile

from django.contrib.auth.models import Group


class UserAdmin1(BaseUserAdmin):
    # The forms to add and change user instances

    form = UserAdminChangeForm
    add_form = UserAdminCreationForm
    change_password_form = MyAdminPasswordChangeForm
    change_user_password_template: str = "admin/auth/user/change_password.html"

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ("phone_number", "first_name", "last_name", "admin")
    list_filter = ("admin",)
    fieldsets = (
        (None, {"fields": ("phone_number", "password")}),
        ("Personal info", {"fields": ("first_name", "last_name")}),
        (
            "Permissions",
            {
                "fields": (
                    "staff",
                    "active",
                )
            },
        ),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("phone_number", "password1", "password2"),
            },
        ),
    )
    search_fields = ("phone_number",)
    ordering = ("phone_number",)
    filter_horizontal = ()


admin.site.register(User, UserAdmin1)


class UserProfileAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "profile_pic",
        "profile_pic_thumbnail",
        # A thumbnail of the profile picture.
        "profile_pic_thumbnails",
    )


admin.site.register(UserProfile, UserProfileAdmin)


class SignUpPasswordAdmin(admin.ModelAdmin):
    list_display = (
        "unregistered_user",
        "password",
        "is_used",
        "date_created",
        "date_modified",
    )
    search_fields = ("unregistered_user",)


admin.site.register(SignUpPassword, SignUpPasswordAdmin)


class SMSToUserAdmin(admin.ModelAdmin):
    list_display = (
        "receiver",
        "is_registration",
        "message",
        "date_created",
        "date_modified",
    )
    search_fields = ("receiver",)


admin.site.register(SMSToUser, SMSToUserAdmin)
