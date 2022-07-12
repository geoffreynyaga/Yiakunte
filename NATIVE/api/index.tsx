/*
 * File: c:\Users\geoff\Desktop\Yiakunte\src\NATIVE\api\index.tsx
 * Project: c:\Users\geoff\Desktop\Yiakunte\src\NATIVE
 * Created Date: Thursday, June 30th 2022, 12:02:42 am
 * Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * Last Modified: Thursday June 30th 2022 12:02:42 am
 * Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * This file should not be copied and/or distributed without the express
 * permission of Swift Lab Limited.
 * -----
 * Copyright (c) 2022 Swift Lab Limited.
 */

const emulator = "http://10.0.2.2:8000";
const production = "https://";
const development = "http://127.0.0.1:8000";

const active_server = emulator;

export const loginAPI = active_server + "/api/accounts/login/";
export const signUpAPI = active_server + "/api/accounts/signup/";
export const signUpValidateAPI =
  active_server + "/api/accounts/signup/validate/";

export const userProfileDetailAPI =
  active_server + "/api/accounts/user-profile/";

// export const userProfileDetailAPI = (userPk: string) =>
//   `${active_server}/api/accounts/user-profile/${userPk}/`;

export const forumMessagesAPI = (forumID: string) =>
  `${active_server}/api/forums/${forumID}/`;

export const forumsListAPI = active_server + "/api/forums/";
export const forumCreateAPI = active_server + "/api/forums/create/";
export const forumMessagesCreateAPI = (forumID: string) =>
  `${active_server}/api/forums/${forumID}/create-reply/`;
