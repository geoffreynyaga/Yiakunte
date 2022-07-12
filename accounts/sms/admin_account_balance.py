#!/usr/bin/env python3
# -*- coding:utf-8 -*-
##################################################################################
# File: /home/geoff/Yiakunte/accounts/sms/admin_account_balance.py               #
# Project: /home/geoff/Yiakunte                                                  #
# Created Date: Tuesday, July 12th 2022, 12:23:06 pm                             #
# Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )                     #
# -----                                                                          #
# Last Modified: Tuesday July 12th 2022 12:23:06 pm                              #
# Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )               #
# -----                                                                          #
# This file should not be copied and/or distributed without the express          #
# permission of Swift Lab Limited.                                               #
# -----                                                                          #
# Copyright (c) 2022 Swift Lab Limited.                                          #
##################################################################################

# works with both python 2 and 3
# from __future__ import print_function


import africastalking
from decouple import config


class APPLICATION_DATA:
    def __init__(self):
        # Set your app credentials
        #
        self.username = config("AFRICASTALKING_USERNAME")
        self.api_key = config("AFRICASTALKING_API_KEY")
        # Initialize the SDK
        africastalking.initialize(self.username, self.api_key)
        # Get the application service
        self.application = africastalking.Application

    def userdata(self):
        try:
            # Fetch the application data
            res = self.application.fetch_application_data()
            print(res)
        except Exception as e:
            print("Received error response:%s" % str(e))


# if __name__ == '__main__':
#     APPLICATION_DATA().userdata()


"""
{'UserData':
            {'balance': 'KES 21.2000'}
}

"""
