#!/usr/bin/env python3
# -*- coding:utf-8 -*-
##################################################################################
# File: /home/geoff/Yiakunte/accounts/sms/send_sms.py                            #
# Project: /home/geoff/Yiakunte                                                  #
# Created Date: Tuesday, July 12th 2022, 12:21:20 pm                             #
# Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )                     #
# -----                                                                          #
# Last Modified: Tuesday July 12th 2022 12:21:20 pm                              #
# Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )               #
# -----                                                                          #
# This file should not be copied and/or distributed without the express          #
# permission of Swift Lab Limited.                                               #
# -----                                                                          #
# Copyright (c) 2022 Swift Lab Limited.                                          #
##################################################################################

# works with both python 2 and 3
from __future__ import print_function


import os
from decouple import config

import africastalking


class SMS:
    def __init__(self):
        # Set your app credentials
        self.username = config("AFRICASTALKING_USERNAME")
        self.api_key = config("AFRICASTALKING_API_KEY")

        # Initialize the SDK
        africastalking.initialize(self.username, self.api_key)
        # Get the SMS service
        self.sms = africastalking.SMS

    def send_sms_sync(self, phone_number, message):
        # Set the numbers you want to send to in international format
        recipients = [phone_number]
        # Set your message
        # message = "I'm a lumberjack and it's ok, I sleep all night and I work all day"
        # And send the SMS
        try:
            response = self.sms.send(message, recipients)
            print(response)
            # That’s it, hit send and we’ll take care of the rest
        except Exception as e:
            print("Encountered an error while sending: %s" % str(e))

    def send_bulk_sms_sync(self, phone_numbers, message):
        # Set the numbers you want to send to in international format
        recipients = phone_numbers
        # Set your message
        # message = "I'm a lumberjack and it's ok, I sleep all night and I work all day"
        # And send the SMS
        try:
            response = self.sms.send(message, recipients)
            print(response)
            # That’s it, hit send and we’ll take care of the rest
        except Exception as e:
            print("Encountered an error while sending: %s" % str(e))


# if __name__ == "__main__":
#     SMS().send_sms_sync("+254718821114", "Hello")


"""
{'SMSMessageData':
    {'Message': 'Sent to 1/1 Total Cost: KES 0.8000',
    'Recipients': [
        {'statusCode': 101,
         'number': '+254718821114',
         'cost': 'KES 0.8000',
         'status': 'Success',
         'messageId': 'ATXid_b06ccd41209ddbed9608a7c6d9aaf344'
        }]
    }
}
"""
