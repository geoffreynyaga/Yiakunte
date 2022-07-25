#!/usr/bin/env python3
# -*- coding:utf-8 -*-
##################################################################################
# File: /home/geoff/Yiakunte/accounts/api/views.py                               #
# Project: /home/geoff/Yiakunte                                                  #
# Created Date: Saturday, June 25th 2022, 9:48:43 pm                             #
# Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )                     #
# -----                                                                          #
# Last Modified: Saturday June 25th 2022 9:48:43 pm                              #
# Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )               #
# -----                                                                          #
# This file should not be copied and/or distributed without the express          #
# permission of Swift Lab Limited.                                               #
# -----                                                                          #
# Copyright (c) 2022 Swift Lab Limited.                                          #
##################################################################################


from django.conf import settings
from django.contrib.auth import authenticate as django_authenticate
from django.contrib.auth import get_user_model
from django.contrib.auth import login as django_login
from django.contrib.auth import logout as django_logout

from rest_framework import permissions, status
from rest_framework.authtoken.models import Token
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import SignUpPassword, UserProfile

from .serializers import LoginSerializer, SignupSerializer, UserProfileSerializer

User = get_user_model()

import logging

from django.core.exceptions import ValidationError

from rest_framework.authentication import SessionAuthentication, TokenAuthentication

# Get an instance of a logger
logger = logging.getLogger(__name__)


class LoginAPIView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (TokenAuthentication,)

    def post(self, request):

        serializer = LoginSerializer(data=request.data)
        # print(serializer, "serializer")
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        # print(user, "user")
        django_login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        # return token.key

        return Response({"token": token.key}, status=200)


class SignUpAPIView(CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = []
    serializer_class = SignupSerializer

    def post(self, request):
        # print(request.data,"this is signup request.data")
        serializer = SignupSerializer(data=request.data)

        # print(serializer,"serializer")

        if serializer.is_valid():
            try:
                phone_number = request.data["phone_number"]

                if "+254" in phone_number:
                    import random

                    from accounts.models import SignUpPassword

                    rand_password = random.randint(1000, 9999)
                    print("this is the random password")

                    SignUpPassword.objects.create(
                        unregistered_user=phone_number, password=rand_password
                    )

                    from accounts.sms import send_sms

                    message = f"{rand_password} use this code to confirm your Yiakunte Registration"
                    print(message, "should be message ")

                    if not settings.IS_TESTING:
                        print("pytest is not running")

                        try:
                            x = send_sms.SMS().send_sms_sync(phone_number, message)

                            print(x, "should be sent sms ")
                        except Exception as e:
                            print(e, "error in sending confirmation message")
                    else:
                        print("pytest running, hence we are not running sms client")

            except:
                print("cannot create confirmation password")
                return Response(
                    {
                        "Response_Code": 1,
                        "ResultDesc": "Cannot create confirmation password",
                    },
                    status=200,
                )

            phone_number = request.data["phone_number"]
            print(phone_number, "this should be the create phone_number")

            password = request.data["password"]
            print(password, "this should be the create password")

            first_name = request.data["first_name"]
            print(first_name, "this should be the create first_name")
            last_name = request.data["last_name"]
            print(last_name, "this should be the create last_name")

            try:
                user_obj = User(
                    phone_number=phone_number,
                    first_name=first_name if first_name else None,
                    last_name=last_name if last_name else None,
                )
                user_obj.set_password(password)

                print(user_obj, "this should be the create user_obj")
                user_obj.save()

                if not "+254" in phone_number:
                    try:

                        user_obj.active = True
                        user_obj.save()
                        django_login(
                            request,
                            user_obj,
                            backend="django.contrib.auth.backends.RemoteUserBackend",
                        )
                        token, created = Token.objects.get_or_create(user=user_obj)
                        print(token, "this should be the create token")

                        return Response(
                            {
                                "token": token.key,
                                "Response_Code": 0,
                                "ResultDesc": "Initial registration successful",
                                "is_kenyan": True if "+254" in phone_number else False,
                            },
                            status=200,
                        )
                    except Exception as e:
                        print(e, "error in creating user")
                        return Response(
                            {
                                "Response_Code": 1,
                                "ResultDesc": "Cannot create user",
                            },
                            status=200,
                        )

                return Response(
                    {
                        "Response_Code": 0,
                        "ResultDesc": "Initial registration successful",
                        "initial_otp": rand_password,
                        "is_kenyan": True if "+254" in phone_number else False,
                    },
                    status=200,
                )

            except:
                print("cannot create user")
                return Response(
                    {"Response_Code": 2, "ResultDesc": "Cannot create user"}, status=200
                )

        else:
            print("error in signup")
            return Response(data=serializer.errors, status=200)


class SignUpConfirmationAPIView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = []

    def post(self, request):
        print(request.data, "this should be request.data")

        phone_number = request.data["phone_number"]
        pin = int(request.data["pin"])

        try:
            x = SignUpPassword.objects.filter(unregistered_user=phone_number).last()
            print(x, "should be a SignUpPassword instance")

            print(phone_number, "should be a SignUpPassword instance")
            print(x.password, "db pin")
            print(pin, "frontend pin")

            if x.password != pin:
                print("Passwords do not match")
                return Response(
                    {"Response_Code": 2, "ResultDesc": "PasswordMissmatch"}, status=200
                )

            else:
                print("Passwords match")
                x.is_used = True
                x.save()

        except:
            print("SignUpPassword Not Found")
            return Response(
                {"Response_Code": 99, "ResultDesc": "SignUpPassword Not Found"},
                status=200,
            )

        try:
            user = User.objects.get(phone_number=phone_number)
            print(user, "should be user")

            if user:
                print("user exists, logging in")
                user.active = True
                user.save()

                try:
                    django_login(
                        request,
                        user,
                        backend="django.contrib.auth.backends.RemoteUserBackend",
                    )
                    token, created = Token.objects.get_or_create(user=user)

                    return Response({"token": token.key}, status=200)
                except Exception as e:
                    print(e, "error getting token")

        except Exception as e:
            print(e, "user not found")
            return Response(
                {"Response_Code": 1, "ResultDesc": "User Not Found"}, status=200
            )


class UserProfileDetailAPIView(RetrieveAPIView):

    queryset = UserProfile.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (TokenAuthentication, SessionAuthentication)
    serializer_class = UserProfileSerializer

    lookup_field = "pk"

    def get_object(self):
        return self.request.user.userprofile


class UserProfileUpdateAPIView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = [
        TokenAuthentication,
    ]

    def post(self, request):
        print(request.data, "this should be request.data")
        """
        <QueryDict: {'first_name': ['Geoffrey'], 'last_name': ['Nyaga'], 'image': [<InMemoryUploadedFile: image (image/jpg)>]}>
        """
        # extract data from querydict
        first_name = request.data["first_name"]
        last_name = request.data["last_name"]

        # try:
        #     image = request.data["image"]
        #     print(image, "this should be image")
        #     print(type(image), "this should be type image")
        #     print(image.content_type, "this should be image content_type")
        #     print(image.size, "this should be image size")
        #     print(image.name, "this should be image name")

        #     # save image to userprofile
        #     userprofile = request.user.userprofile
        #     print(userprofile, "this should be userprofile")
        #     userprofile.profile_pic = image
        #     userprofile.save()
        # except:
        #     pass

        try:
            profile_picture = request.data["image"]
        except Exception as e:
            print(e, "error getting image")
            profile_picture = None

        print(profile_picture, "this should be profile_picture")

        try:
            user = request.user
            print(user, "this should be user")
            if first_name != None and len(first_name) > 0:
                user.first_name = first_name
            if last_name != None and len(last_name) > 0:
                user.last_name = last_name
            if profile_picture:
                print("profile picture is not none")

                try:
                    user.userprofile.profile_pic = profile_picture
                    user.userprofile.save()
                except Exception as e:
                    print(e, "error in profile_picture")

            user.save()

            return Response(
                {"Response_Code": 0, "ResultDesc": "Profile Updated"}, status=200
            )

        except Exception as e:
            print(e, "Error updating profile")
            return Response(
                {"Response_Code": 1, "ResultDesc": "Error updating profile"},
                status=200,
            )
