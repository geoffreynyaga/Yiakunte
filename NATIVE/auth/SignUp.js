/*
 * File: c:\Users\geoff\Desktop\Yiakunte\src\NATIVE\auth\Login.js
 * Project: c:\Users\geoff\Desktop\Yiakunte\src\NATIVE
 * Created Date: Saturday, June 25th 2022, 10:59:04 pm
 * Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * Last Modified: Monday July 11th 2022 5:19:40 pm
 * Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * This file should not be copied and/or distributed without the express
 * permission of Swift Lab Limited.
 * -----
 * Copyright (c) 2022 Swift Lab Limited.
 */

import * as Constants from "expo-constants";
import * as React from "react";
import * as SecureStore from "expo-secure-store";

import {
  Button,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { loginAPI, signUpAPI, signUpValidateAPI } from "../api";

import { AuthContext } from "./AuthContext";
import OTPInputView from "@twotalltotems/react-native-otp-input";

export default function SignUpScreen({ navigation }) {
  // console.log(navigation, "navigation");
  const [username, setUsername] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const [password, setPassword] = React.useState("");
  const [otp, setOTP] = React.useState(null);
  const [otpFinal, setOTPFinal] = React.useState(null);

  const [verifying, setVerifying] = React.useState(false);

  const { setToken } = React.useContext(AuthContext);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const SCREEN_HEIGHT = Dimensions.get("window").height;

  React.useEffect(() => {
    return () => {};
  }, []);

  const signUp = async () => {
    await fetch(signUpAPI, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_number: username,
        password: password,
        first_name: firstName,
        last_name: lastName,
      }),
    })
      .then((resp) => resp.json())
      .then(async (data) => {
        // console.log(data, "this is data");
        let x = {
          phone_number: ["This field is required."],
        };
        let y = {
          non_field_errors: [
            "Unable to login with the given phone and password",
          ],
        };

        let z = {
          Response_Code: 0,
          ResultDesc: "Initial registration successful",
        };

        if (data.ResultDesc === "Initial registration successful") {
          // set otp go to validation
          setOTP(data.initial_otp);
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

  const signUpValidate = async (code) => {
    await fetch(signUpValidateAPI, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_number: username,
        pin: code,
      }),
    })
      .then((resp) => resp.json())
      .then(async (data) => {
        console.log(data, "this is data");
        let x = { Response_Code: 2, ResultDesc: "PasswordMissmatch" },
          status = 200;

        let y = { Response_Code: 99, ResultDesc: "SignUpPassword Not Found" };

        let z = { token: "token.key" };

        if (data.token) {
          // set otp go to validation
          setOTPFinal(data.initial_otp);
          await SecureStore.setItemAsync("userToken", data.token);
          setToken(data.token);
        } else if (data.ResultDesc == "PasswordMissmatch") {
          console.log(data.ResultDesc, "this is data.non_field_errors");
          alert(data.ResultDesc);
        } else if (data.ResultDesc == "SignUpPassword Not Found") {
          console.log(data.ResultDesc, "this is error");
          alert(data.ResultDesc);
        } else {
          console.log(data, "this is data");
          alert("Something went wrong");
        }
      });
  };

  return otp !== null ? (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#252A37",
        // borderWidth: 1,
        // borderColor: "#feee",
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          // borderWidth: 1,
          // borderColor: "#feee",
          marginTop: 50,
        }}
      >
        <Text
          style={{
            color: "#fefefe",
            marginBottom: 20,
          }}
        >
          Enter code received from SMS{" "}
        </Text>
      </View>
      <View
        style={{
          flex: 2,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // width: "100%",
          marginHorizontal: 30,
          // borderWidth: 1,
          // borderColor: "#feee",
        }}
      >
        <OTPInputView
          pinCount={4}
          autoFocusOnLoad
          onCodeFilled={(code) => {
            // setOTP(code);
            // alert(code);
            setVerifying(true);

            signUpValidate(code);
          }}
          keyboardAppearance="dark"
        />

        {verifying ? (
          <Text
            style={{
              color: "#fefefe",
              fontSize: 28,
              marginTop: 20,
              textAlign: "center",
            }}
          >
            Verifying your account ...
          </Text>
        ) : null}
      </View>
      <View
        style={{
          flex: 2,
          flexDirection: "column",
          justifyContent: "center",
          // borderWidth: 1,
          // borderColor: "#feee",
          marginTop: 50,
        }}
      >
        <Text
          style={{
            color: "#fefefe",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Didn't Receive Code?
        </Text>

        <TouchableOpacity
          // title="Sign up"
          onPress={() => navigation.navigate("SignIn")}
          style={{
            margin: 30,
            marginBottom: 5,
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
          <Text
            style={{
              color: "#252A37",
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Resend Code
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 5,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          // width: "100%",
          margin: 30,
          borderWidth: 1,
          borderColor: "#feee",
        }}
      ></View>
    </View>
  ) : (
    <View
      // behavior="height"
      style={{ flex: 1, flexDirection: "column", backgroundColor: "#252A37" }}
    >
      <View
        style={{
          flex: 1,
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
            // width: SCREEN_WIDTH * 0.5,
            height: "100%",
            resizeMode: "contain",
            borderRadius: 40,
          }}
        />
      </View>

      <View
        style={{
          flex: 8,
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
          Sign Up
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
          // autoFocus
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
          First Name
        </Text>
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
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
          Last Name
        </Text>
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
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
          // title="Sign up"

          onPress={() => signUp()}
          style={{
            margin: 30,
            marginBottom: 5,
            marginTop: 15,
            backgroundColor: username && password ? "#fef45e" : "#f5eded",
            borderRadius: 5,

            padding: 10,
            width: "50%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#252A37",
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Sign Me Up!
          </Text>
        </TouchableOpacity>
      </View>

      {username && password ? null : (
        <View
          style={{
            flex: 1,
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
            Already have an account ?
          </Text>
          <TouchableOpacity
            // title="Sign up"
            onPress={() => navigation.navigate("SignIn")}
            style={{
              margin: 30,
              marginBottom: 5,
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
            <Text>Login Here</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
