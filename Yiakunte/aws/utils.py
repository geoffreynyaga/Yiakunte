#!/usr/bin/env python3
# -*- coding:utf-8 -*-
##################################################################################
# File: /home/geoff/Yiakunte/Yiakunte/aws/utils.py                               #
# Project: /home/geoff/Yiakunte                                                  #
# Created Date: Saturday, June 25th 2022, 9:51:23 pm                             #
# Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )                     #
# -----                                                                          #
# Last Modified: Saturday June 25th 2022 9:51:23 pm                              #
# Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )               #
# -----                                                                          #
# This file should not be copied and/or distributed without the express          #
# permission of Swift Lab Limited.                                               #
# -----                                                                          #
# Copyright (c) 2022 Swift Lab Limited.                                          #
##################################################################################

from storages.backends.s3boto3 import S3Boto3Storage

StaticRootS3BotoStorage = lambda: S3Boto3Storage(location="static")
MediaRootS3BotoStorage = lambda: S3Boto3Storage(location="media")
