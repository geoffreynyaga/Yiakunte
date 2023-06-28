#!/usr/bin/env python3
# -*- coding:utf-8 -*-
##################################################################################
# File: /Users/geoff/Documents/code/Yiakunte/NATIVE2/assets/images/audio_json.py#
# Project: yiakunte                                                            #
# Author: Geoffrey Nyaga  at geoffrey@swiftlab.tech                            #
# -----                                                                        #
# Last Modified: Tuesday June 27th 2023 9:46:11 pm                             #
# Modified By: Geoffrey Nyaga at geoffrey@swiftlab.tech                        #
# -----                                                                        #
# This file should not be copied and/or distributed without the express        #
# permission of Swift Lab Limited                                              #
#                                                                              #
# Copyright (c) 2023 Swift Lab Limited                                         #
# -----                                                                        #
# HISTORY:                                                                     #
##################################################################################
import json
import os


def create_file_json(file_path):
    file_name = os.path.splitext(file_path)[0]
    image_path = os.path.abspath(file_path)
    return {
        "english_name": os.path.basename(file_name),
        "yiakunte": "",
        "image": image_path,
        "audio": "",
    }


def create_folder_json(folder_path):
    folder_json = []
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            file_path = os.path.join(root, file)
            file_json = create_file_json(file_path)
            folder_json.append(file_json)
    return folder_json


def generate_json(root_dir):
    json_data = {}
    for root, dirs, files in os.walk(root_dir):
        for folder in dirs:
            folder_path = os.path.join(root, folder)
            folder_json = create_folder_json(folder_path)
            json_data[folder] = folder_json
    return json.dumps(json_data, indent=4)


def save_json_to_file(json_data, file_path):
    with open(file_path, "w") as file:
        file.write(json_data)


# Provide the root directory
root_directory = "/Users/geoff/Documents/code/Yiakunte/NATIVE2/assets/images"

# Generate the JSON data
json_data = generate_json(root_directory)

# Define the output file path
output_file = "/Users/geoff/Documents/code/Yiakunte/NATIVE2/assets/images/output.json"

# Save the JSON data to a file
save_json_to_file(json_data, output_file)

print(f"JSON data saved to {output_file}")
