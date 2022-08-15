#!/usr/bin/env python3
# -*- coding:utf-8 -*-
##################################################################################
# File: /home/geoff/KTDA/accounts/urls.py                                        #
# Project: /home/geoff/KTDA/accounts                                             #
# Created Date: Tuesday, May 24th 2022, 9:10:34 pm                               #
# Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )                     #
# -----                                                                          #
# Last Modified: Saturday June 25th 2022 9:46:10 pm                              #
# Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )               #
# -----                                                                          #
# This file should not be copied and/or distributed without the express          #
# permission of Swift Lab Limited.                                               #
# -----                                                                          #
# Copyright (c) 2022 Swift Lab Limited.                                          #
##################################################################################


from django.urls import path, re_path

from .views import HomeView

urlpatterns = [
    path("", HomeView.as_view(), name="home"),
]
