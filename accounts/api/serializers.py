#!/usr/bin/env python3
# -*- coding:utf-8 -*-
##################################################################################
# File: /home/geoff/Yiakunte/accounts/api/serializers.py                         #
# Project: /home/geoff/Yiakunte                                                  #
# Created Date: Saturday, June 25th 2022, 9:48:27 pm                             #
# Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )                     #
# -----                                                                          #
# Last Modified: Saturday June 25th 2022 9:48:27 pm                              #
# Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )               #
# -----                                                                          #
# This file should not be copied and/or distributed without the express          #
# permission of Swift Lab Limited.                                               #
# -----                                                                          #
# Copyright (c) 2022 Swift Lab Limited.                                          #
##################################################################################

from rest_framework import serializers, exceptions
from django.contrib.auth import get_user_model, authenticate

from accounts.models import UserProfile

User = get_user_model()

from phonenumber_field.serializerfields import PhoneNumberField

from django.core.exceptions import ValidationError


class LoginSerializer(serializers.Serializer):

    phone_number = PhoneNumberField()
    password = serializers.CharField()

    def validate(self, data):

        # print(data, "this is data")

        """
        # print(data, "this is data")
        OrderedDict(
            [
                ('phone_number', PhoneNumber(country_code=254,
                                national_number=718821114,
                                 extension=None,
                                  italian_leading_zero=None,
                                   number_of_leading_zeros=None,
                                   country_code_source=1,
                                   preferred_domestic_carrier_code=None
                            )
                ),
                ('password', 'mypassword'
                )
            ]
            ) this is data
        """
        phone_number = data.get("phone_number", "")
        password = data.get("password", "")

        if phone_number and password:
            user = authenticate(phone_number=phone_number, password=password)

            if user:
                if user.is_active:
                    data["user"] = user

                else:
                    msg = "user is deactivated"
                    raise exceptions.ValidationError(msg)

            else:
                msg = "Unable to login with the given phone and password"
                data["err1"] = msg
                raise exceptions.ValidationError(msg)

        else:
            msg = "You must provide both Phone and Password"
            data["err1"] = msg
            raise exceptions.ValidationError(msg)

        return data


class UserDetailSerializer(serializers.ModelSerializer):

    full_name = serializers.ReadOnlyField(source="get_full_name")

    class Meta:
        model = User
        fields = ("id", "phone_number", "full_name", "first_name", "last_name")


class UserProfileSerializer(serializers.ModelSerializer):
    profile_pic_thumbnail = serializers.SerializerMethodField()
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()

    def get_profile_pic_thumbnail(self, obj):
        if obj.profile_pic:
            # return path plus domain name
            return self.context["request"].build_absolute_uri(
                obj.profile_pic_thumbnail.url
            )
        else:
            return None

    def get_first_name(self, obj):
        if obj.user.first_name:
            return obj.user.first_name
        else:
            return None

    def get_last_name(self, obj):
        if obj.user.last_name:
            return obj.user.last_name
        else:
            return None

    class Meta:
        model = UserProfile
        fields = (
            "id",
            "profile_pic",
            "profile_pic_thumbnail",
            "first_name",
            "last_name",
        )


class SignupSerializer(serializers.ModelSerializer):
    phone_number = PhoneNumberField()

    class Meta:
        model = User
        fields = ["phone_number", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate_phone_number(self, value):

        phone_number = str(value)
        # str because it comes in a a PhoneNumberField class

        # URGENT : add phone number verification as well(safaricom)
        # No need to check e164 standard, serializer field already does that
        # FIXED:
        # from mpesa.phone import phone_number_conversions

        # try:
        #     x = phone_number_conversions.check_phone_number_carrier_name(phone_number)
        #     print(x, "should be saf")
        #     print(type(x), "should be saf")
        #     print(x == "Safaricom", "should be false")
        #     print(x != "Safaricom", "should be true")

        #     if x != "Safaricom":
        #         print(f"number is not safaricom but {x}")
        #         raise ValidationError(f"We do not accept {x} numbers, only Safaricom")
        #     else:
        #         print(f"number is  safaricom <> {x}")
        #         pass

        # except:
        #     raise ValidationError(f"We do not accept {x} numbers, only Safaricom")

        user_qs = User.objects.filter(phone_number=phone_number)  # why not get?
        # user_obj = User.objects.get(phone_number=phone_number)  # why not get?

        # if user_qs.exists():
        #     # check if active. If Active return the error below else proceed to return phone_number

        #     raise ValidationError("This phone number has already been registered.")
        # else:
        #     return phone_number

        if user_qs.exists():
            # check if active. If Active return the error below else proceed to return phone_number
            if user_qs.count() > 1:
                raise ValidationError(
                    "Internal Error, kindly contact us to resolve this"
                )
            elif user_qs.count() == 1:
                print("sweet spot")
                user = user_qs[0]
                print(user, "should be the single user")
                if user.is_active == False:
                    print("user is registered but not confirmed")
                    return phone_number
                else:
                    raise ValidationError(
                        "This phone number has already been registered."
                    )
            else:
                print("user count is zero")
                return phone_number
        else:
            return
