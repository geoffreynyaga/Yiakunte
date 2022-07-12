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

import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { AuthContext } from "./AuthContext";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { loginAPI } from "../api";

export default function LoginScreen({ navigation }) {
  // console.log(navigation, "navigation");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { setToken } = React.useContext(AuthContext);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const SCREEN_HEIGHT = Dimensions.get("window").height;

  React.useEffect(() => {
    return () => {
      setUsername("");
      setPassword("");
    };
  }, []);

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
      style={{ flex: 1, flexDirection: "column", backgroundColor: "#252A37" }}
    >
      <View
        style={{
          flex: 2,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          // width: "100%",
          marginTop: 10,
        }}
      >
        <Image
          source={require("../assets/images/logo512.png")}
          style={{
            width: SCREEN_WIDTH * 0.5,
            height: "100%",
            resizeMode: "contain",
            borderRadius: 40,
          }}
        />
      </View>

      <View
        style={{
          flex: 6,
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
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 10,
            marginTop: 10,
            color: "#303a52",
          }}
        >
          Login
        </Text>

        {/* //label */}
        <Text
          style={{
            fontSize: 12,
            marginBottom: 5,
            marginTop: 10,
            alignSelf: "flex-start",
            marginLeft: 5,
            color: "#575151",
            fontFamily: "Roboto",
          }}
        >
          Phone Number
        </Text>
        <TextInput
          placeholder="+254 XXX XXX"
          value={username}
          onChangeText={setUsername}
          style={{
            height: 50,
            // borderWidth: StyleSheet.hairlineWidth,
            borderColor: "#000",
            marginTop: 5,
            marginBottom: 20,
            width: "100%",
            backgroundColor: username ? "#dee1ec" : "#f5eded",
            paddingLeft: 10,
          }}
          autoFocus
        />

        <Text
          style={{
            fontSize: 12,
            marginBottom: 5,
            // marginTop: 10,
            alignSelf: "flex-start",
            marginLeft: 5,
            color: "#575151",
            fontFamily: "Roboto",
          }}
        >
          Password
        </Text>
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
            backgroundColor: password ? "#dee1ec" : "#f5eded",
            paddingLeft: 10,
          }}
        />

        <TouchableOpacity
          onPress={() => login()}
          style={{
            margin: 30,
            marginBottom: 0,
            marginTop: 15,
            backgroundColor: username && password ? "#fef45e" : "#f5eded",
            borderRadius: 5,

            padding: 10,
            width: "50%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>Login </Text>
        </TouchableOpacity>
      </View>

      {username && password ? null : (
        <View
          style={{
            flex: 2,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
            }}
          >
            Don't have an account ?
          </Text>
          <TouchableOpacity
            // title="Sign up"
            onPress={() => navigation.navigate("SignUp")}
            style={{
              margin: 30,
              marginBottom: 0,
              marginTop: 15,
              backgroundColor: "#fef45e",
              borderRadius: 5,
              // borderWidth: StyleSheet.hairlineWidth,
              // borderColor: "#000",
              padding: 10,
              width: "50%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
