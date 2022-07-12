#!/usr/bin/env python3
# -*- coding:utf-8 -*-
##################################################################################
# File: /home/geoff/Yiakunte/forums/api/urls.py                                  #
# Project: /home/geoff/Yiakunte                                                  #
# Created Date: Thursday, June 30th 2022, 12:26:06 am                            #
# Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )                     #
# -----                                                                          #
# Last Modified: Thursday June 30th 2022 12:26:06 am                             #
# Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )               #
# -----                                                                          #
# This file should not be copied and/or distributed without the express          #
# permission of Swift Lab Limited.                                               #
# -----                                                                          #
# Copyright (c) 2022 Swift Lab Limited.                                          #
##################################################################################

from django.urls import re_path, path

from forums.api.views import (
    ForumListAPIView,
    ForumMessageListAPIView,
    ForumCreateAPIView,
    ForumMessageCreateAPIView,
)

urlpatterns = [
    path("", ForumListAPIView.as_view(), name="forum-list"),
    path("<int:pk>/", ForumMessageListAPIView.as_view(), name="forum-detail"),
    path(
        "<int:pk>/create-reply/",
        ForumMessageCreateAPIView.as_view(),
        name="create-reply",
    ),
    path("create/", ForumCreateAPIView.as_view(), name="forum-create"),
]
