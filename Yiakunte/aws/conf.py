#!/usr/bin/env python3
# -*- coding:utf-8 -*-
##################################################################################
# File: /home/geoff/Yiakunte/Yiakunte/aws/conf.py                                #
# Project: /home/geoff/Yiakunte                                                  #
# Created Date: Saturday, June 25th 2022, 9:51:11 pm                             #
# Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )                     #
# -----                                                                          #
# Last Modified: Saturday June 25th 2022 9:51:11 pm                              #
# Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )               #
# -----                                                                          #
# This file should not be copied and/or distributed without the express          #
# permission of Swift Lab Limited.                                               #
# -----                                                                          #
# Copyright (c) 2022 Swift Lab Limited.                                          #
##################################################################################

import datetime
import os

from decouple import config

AWS_ACCESS_KEY_ID = config("S3_ACCESS_KEY")
AWS_SECRET_ACCESS_KEY = config("S3_SECRET_KEY")

AWS_FILE_EXPIRE = 200
AWS_PRELOAD_METADATA = True
AWS_QUERYSTRING_AUTH = True

DEFAULT_FILE_STORAGE = "KTDA.aws.utils.MediaRootS3BotoStorage"
STATICFILES_STORAGE = "KTDA.aws.utils.StaticRootS3BotoStorage"

S3DIRECT_REGION = config("S3_REGION")
# AWS_S3_SIGNATURE_VERSION = "s3v4"
AWS_S3_HOST = "eu-west-1"  # change to your region
AWS_S3_REGION_NAME = config("S3_REGION")
# S3_USE_SIGV4 = True
# os.environ['S3_USE_SIGV4'] = 'True'
os.environ.setdefault("S3_USE_SIGV4", "False")
# S3_USE_SIGV4 = True

AWS_STORAGE_BUCKET_NAME = config("S3_BUCKET")
S3_URL = "//%s.s3.amazonaws.com/" % AWS_STORAGE_BUCKET_NAME
MEDIA_URL = "//%s.s3.amazonaws.com/media/" % AWS_STORAGE_BUCKET_NAME

MEDIA_ROOT = MEDIA_URL
STATIC_URL = S3_URL + "static/"

ADMIN_MEDIA_PREFIX = STATIC_URL + "admin/"

two_months = datetime.timedelta(days=61)
date_two_months_later = datetime.date.today() + two_months
expires = date_two_months_later.strftime("%A, %d %B %Y 20:00:00 GMT")

AWS_HEADERS = {
    "Expires": expires,
    "Cache-Control": "max-age=%d" % (int(two_months.total_seconds()),),
}


# LARGE FILE UPLOAD SETTINGS
AWS_UPLOAD_BUCKET = config("S3_BUCKET")
AWS_UPLOAD_USERNAME = config("AWS_UPLOAD_USERNAME")
AWS_UPLOAD_GROUP = config("AWS_UPLOAD_GROUP")
AWS_UPLOAD_REGION = config("S3_REGION")
AWS_UPLOAD_ACCESS_KEY_ID = config("S3_ACCESS_KEY")
AWS_UPLOAD_SECRET_KEY = config("S3_SECRET_KEY")
