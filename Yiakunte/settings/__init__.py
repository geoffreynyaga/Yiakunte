#!/usr/bin/env python3
# -*- coding:utf-8 -*-
##################################################################################
# File: /home/geoff/Yiakunte/Yiakunte/settings/__init__.py                       #
# Project: /home/geoff/Yiakunte                                                  #
# Created Date: Saturday, June 25th 2022, 9:52:17 pm                             #
# Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )                     #
# -----                                                                          #
# Last Modified: Saturday June 25th 2022 9:52:17 pm                              #
# Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )               #
# -----                                                                          #
# This file should not be copied and/or distributed without the express          #
# permission of Swift Lab Limited.                                               #
# -----                                                                          #
# Copyright (c) 2022 Swift Lab Limited.                                          #
##################################################################################

# from .local import *

# try:
#     from .production import *
# except ImportError:
#     pass


try:
    from .heroku_production import *
except ImportError:
    pass
