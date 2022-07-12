#!/usr/bin/env python3
# -*- coding:utf-8 -*-
##################################################################################
# File: /home/geoff/Yiakunte/forums/api/views.py                                 #
# Project: /home/geoff/Yiakunte                                                  #
# Created Date: Thursday, June 30th 2022, 12:26:00 am                            #
# Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )                     #
# -----                                                                          #
# Last Modified: Thursday June 30th 2022 12:26:00 am                             #
# Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )               #
# -----                                                                          #
# This file should not be copied and/or distributed without the express          #
# permission of Swift Lab Limited.                                               #
# -----                                                                          #
# Copyright (c) 2022 Swift Lab Limited.                                          #
##################################################################################

from rest_framework import generics
from forums.api.serializers import ForumMessageSerializer, ForumSerializer

from forums.models import Forum, ForumMessage
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication


class ForumListAPIView(generics.ListAPIView):
    queryset = Forum.objects.all()
    serializer_class = ForumSerializer


class ForumMessageListAPIView(generics.ListAPIView):
    queryset = ForumMessage.objects.all()
    serializer_class = ForumMessageSerializer

    def get_queryset(self):
        print(self.kwargs.get("pk"), "pk")
        return super().get_queryset().filter(forum__pk=self.kwargs.get("pk"))


class ForumCreateAPIView(APIView):
    queryset = Forum.objects.all()
    # serializer_class = ForumSerializer
    authentication_classes = [
        TokenAuthentication,
    ]

    def post(self, *args, **kwargs):
        data = self.request.data
        print(data, "data")
        user = self.request.user
        print(user, "user")

        forum_name = data.get("name")
        forum_description = data.get("description")

        if forum_name:
            forum = Forum.objects.create(
                name=forum_name, details=forum_description, created_by=user
            )
            return Response({"message": "forum created successfully"})
        else:
            return Response({"message": "forum name is required"})


class ForumMessageCreateAPIView(APIView):
    queryset = ForumMessage.objects.all()
    # serializer_class = ForumSerializer
    authentication_classes = [
        TokenAuthentication,
    ]

    def post(self, *args, **kwargs):
        data = self.request.data
        print(data, "data in message")
        user = self.request.user
        print(user, "user")

        message = data.get("message")
        forum_id = int(data.get("forum_id"))

        try:
            forum = Forum.objects.get(pk=forum_id)
            if message:
                forum_message = ForumMessage.objects.create(
                message=message, forum=forum, created_by=user
                )
                return Response({"message": "Reply Sent "})
            else:
                return Response({"message": "forum name is required"})

        except Forum.DoesNotExist:
            return Response({"message": "forum does not exist"})
