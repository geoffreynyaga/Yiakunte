#!/usr/bin/env python3
# -*- coding:utf-8 -*-
##################################################################################
# File: /Users/geoff/Downloads/yakuu dict/rename.py                            #
# Project: yakuu dict                                                          #
# Author: Geoffrey Nyaga  at geoffrey@swiftlab.tech                            #
# -----                                                                        #
# Last Modified: Thursday June 1st 2023 11:19:44 am                            #
# Modified By: Geoffrey Nyaga at geoffrey@swiftlab.tech                        #
# -----                                                                        #
# This file should not be copied and/or distributed without the express        #
# permission of Swift Lab Limited                                              #
#                                                                              #
# Copyright (c) 2023 Swift Lab Limited                                         #
# -----                                                                        #
# HISTORY:                                                                     #
##################################################################################

import os


def rename_files(root_dir):
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            # Get the full path of the file
            file_path = os.path.join(root, file)

            # Rename the file to lowercase
            new_file_name = file.lower()

            # Replace whitespaces with underscores
            new_file_name = new_file_name.replace(" ", "_")

            # Get the new full path of the file
            new_file_path = os.path.join(root, new_file_name)

            # Rename the file
            os.rename(file_path, new_file_path)

            print(f"Renamed: {file_path} -> {new_file_path}")


# Provide the root directory
root_directory = "/Users/geoff/Documents/code/Yiakunte/NATIVE2/assets/images"

# Call the function to rename the files
rename_files(root_directory)
