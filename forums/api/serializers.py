#!/usr/bin/env python3
# -*- coding:utf-8 -*-
##################################################################################
# File: /home/geoff/Yiakunte/forums/api/serializers.py                           #
# Project: /home/geoff/Yiakunte                                                  #
# Created Date: Thursday, June 30th 2022, 12:26:24 am                            #
# Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )                     #
# -----                                                                          #
# Last Modified: Thursday June 30th 2022 12:26:24 am                             #
# Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )               #
# -----                                                                          #
# This file should not be copied and/or distributed without the express          #
# permission of Swift Lab Limited.                                               #
# -----                                                                          #
# Copyright (c) 2022 Swift Lab Limited.                                          #
##################################################################################


from forums.models import Forum, ForumMessage
from rest_framework import serializers
from django.contrib.humanize.templatetags.humanize import (
    naturaltime,
)


class ForumSerializer(serializers.ModelSerializer):
    created_by = serializers.SerializerMethodField()
    created_by_profile_picture_thumbnail = serializers.SerializerMethodField()

    is_admin = serializers.SerializerMethodField()
    date_modified = serializers.SerializerMethodField()
    num_of_messages = serializers.SerializerMethodField()

    def get_created_by_profile_picture_thumbnail(self, obj):
        try:
            print(obj.created_by.userprofile.profile_pic, "waddup")
            if obj.created_by.userprofile.profile_pic:
                return self.context["request"].build_absolute_uri(
                    obj.created_by.userprofile.profile_pic.url
                )
            else:
                return None
        except:
            return None

    def get_created_by(self, obj):
        if obj.created_by.first_name and obj.created_by.last_name:
            return obj.created_by.first_name + " " + obj.created_by.last_name
        elif obj.created_by.first_name:
            return obj.created_by.first_name
        elif obj.created_by.last_name:
            return obj.created_by.last_name
        else:
            return str(obj.created_by.phone_number)

    def get_is_admin(self, obj):
        return obj.created_by.is_admin

    def get_date_modified(self, obj):
        return naturaltime(obj.date_modified)

    def get_num_of_messages(self, obj):
        message_count = ForumMessage.objects.filter(forum=obj).count()
        if obj.num_of_messages != message_count:
            obj.num_of_messages = message_count
            obj.save()
        return message_count

    class Meta:
        model = Forum
        fields = (
            "id",
            "name",
            "created_by",
            "created_by_profile_picture_thumbnail",
            "is_admin",
            "details",
            "num_of_messages",
            "date_created",
            "date_modified",
        )


class ForumMessageSerializer(serializers.ModelSerializer):
    created_by = serializers.SerializerMethodField()
    created_by_profile_picture_thumbnail = serializers.SerializerMethodField()

    is_admin = serializers.SerializerMethodField()
    date_created = serializers.SerializerMethodField()

    def get_created_by(self, obj):
        if obj.created_by.first_name and obj.created_by.last_name:
            return obj.created_by.first_name + " " + obj.created_by.last_name
        elif obj.created_by.first_name:
            return obj.created_by.first_name
        elif obj.created_by.last_name:
            return obj.created_by.last_name
        else:
            return str(obj.created_by.phone_number)

    def get_created_by_profile_picture_thumbnail(self, obj):
        try:
            print(obj.created_by.userprofile.profile_pic, "waddup")
            if obj.created_by.userprofile.profile_pic:
                return self.context["request"].build_absolute_uri(
                    obj.created_by.userprofile.profile_pic_thumbnail.url
                )
            else:
                return None
        except:
            return None

    def get_is_admin(self, obj):
        return obj.created_by.is_admin

    def get_date_created(self, obj):
        return naturaltime(obj.date_created)

    class Meta:
        model = ForumMessage
        fields = (
            "id",
            "created_by",
            "created_by_profile_picture_thumbnail",
            "forum",
            "message",
            "image",
            "video",
            "flagged_inappropriate",
            "is_closed",
            "date_created",
            "date_modified",
            "is_admin",
        )
