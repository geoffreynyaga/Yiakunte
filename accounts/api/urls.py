#!/usr/bin/env python3
# -*- coding:utf-8 -*-
##################################################################################
# File: /home/geoff/Yiakunte/accounts/api/urls.py                                #
# Project: /home/geoff/Yiakunte                                                  #
# Created Date: Saturday, June 25th 2022, 9:48:36 pm                             #
# Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )                     #
# -----                                                                          #
# Last Modified: Saturday June 25th 2022 9:48:36 pm                              #
# Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )               #
# -----                                                                          #
# This file should not be copied and/or distributed without the express          #
# permission of Swift Lab Limited.                                               #
# -----                                                                          #
# Copyright (c) 2022 Swift Lab Limited.                                          #
##################################################################################


# from django.conf.urls import url
from django.urls import path, re_path

from accounts.api.views import (
    LoginAPIView,
    SignUpAPIView,
    SignUpConfirmationAPIView,
    UserProfileDetailAPIView,
)

urlpatterns = [
    re_path(r"^login/$", LoginAPIView.as_view(), name="login_api"),
    re_path(r"^signup/$", SignUpAPIView.as_view(), name="signup_api"),
    re_path(
        r"^signup/validate/$",
        SignUpConfirmationAPIView.as_view(),
        name="signup_confirmation_api",
    ),
    path(
        "user-profile/",
        UserProfileDetailAPIView.as_view(),
        name="user-profile-detail",
    ),
]
