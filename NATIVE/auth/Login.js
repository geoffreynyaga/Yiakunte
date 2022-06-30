/*
 * File: c:\Users\geoff\Desktop\Yiakunte\src\NATIVE\auth\Login.js
 * Project: c:\Users\geoff\Desktop\Yiakunte\src\NATIVE
 * Created Date: Saturday, June 25th 2022, 10:59:04 pm
 * Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * Last Modified: Saturday June 25th 2022 10:59:04 pm
 * Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * This file should not be copied and/or distributed without the express
 * permission of Swift Lab Limited.
 * -----
 * Copyright (c) 2022 Swift Lab Limited.
 */

import * as React from "react";
import * as SecureStore from "expo-secure-store";

import { Button, Dimensions, StyleSheet, TextInput, View } from "react-native";

import { AuthContext } from "./AuthContext";
import { loginAPI } from "../api";

export default function LoginScreen({ navigation }) {
  // console.log(navigation, "navigation");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { setToken } = React.useContext(AuthContext);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const SCREEN_HEIGHT = Dimensions.get("window").height;

  const login = async () => {
    await fetch(loginAPI, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_number: username,
        password: password,
      }),
    })
      .then((resp) => resp.json())
      .then(async (data) => {
        console.log(data, "this is data");
        let x = {
          phone_number: ["This field is required."],
        };
        let y = {
          non_field_errors: [
            "Unable to login with the given phone and password",
          ],
        };

        if (data.token) {
          console.log(data.token, "this is data.token");
          await SecureStore.setItemAsync("userToken", data.token);
          setToken(data.token);
        } else if (data.non_field_errors) {
          console.log(data.non_field_errors, "this is data.non_field_errors");
          alert(data.non_field_errors);
        } else if (data.phone_number) {
          console.log(data.phone_number, "this is data.phone_number");
          alert(`Phone Number: ${data.phone_number}`);
        } else {
          console.log(data, "this is data");
          alert("Something went wrong");
        }
      });
  };

  return (
    <View
      style={{
        // flex: 1,
        flexDirection: "column",
        // paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        // width: "100%",
        margin: 30,
        // marginRight: 30,
        paddingHorizontal: 10,
        shadowRadius: 10,
        backgroundColor: "#fff",
        height: 0.4 * SCREEN_HEIGHT,
        borderRadius: 10,
      }}
    >
      <TextInput
        placeholder="+254 XXX XXX"
        value={username}
        onChangeText={setUsername}
        style={{
          height: 50,
          // borderWidth: StyleSheet.hairlineWidth,
          borderColor: "#000",
          marginVertical: 20,
          width: "100%",
          backgroundColor: username ? "#f5eded" : "#f5f5f5",
          paddingLeft: 10,
        }}
        autoFocus
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          height: 50,
          // borderWidth: StyleSheet.hairlineWidth,
          borderColor: "#000",
          marginBottom: 30,
          width: "100%",
          borderRadius: 5,
          backgroundColor: username ? "#f5eded" : "#f5f5f5",
          paddingLeft: 10,
        }}
      />

      <Button
        title="Sign in"
        onPress={() => login()}
        disabled={username && password ? false : true}
      />
    </View>
  );
}
