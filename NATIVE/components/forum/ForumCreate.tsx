/*
 * File: c:\Users\geoff\Desktop\Yiakunte\src\NATIVE\components\forum\ForumCreate.tsx
 * Project: c:\Users\geoff\Desktop\Yiakunte\src\NATIVE
 * Created Date: Thursday, June 30th 2022, 2:43:28 pm
 * Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * Last Modified: Thursday June 30th 2022 2:43:28 pm
 * Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * This file should not be copied and/or distributed without the express
 * permission of Swift Lab Limited.
 * -----
 * Copyright (c) 2022 Swift Lab Limited.
 */

import * as SecureStore from "expo-secure-store";

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { forumCreateAPI } from "../../api";
import { useMutation } from "react-query";

function ForumCreate({ navigation }) {
  const [forumName, setForumName] = useState<null | string>(null);
  const [forumDescription, setForumDescription] = useState<null | string>(null);
  const [token, setToken] = useState<null | string>(null);

  useEffect(() => {
    async function getToken() {
      const token = await SecureStore.getItemAsync("userToken");
      setToken(token);
    }
    getToken();
  }, [token]);

  const mutation = useMutation(
    async (newForum) => {
      try {
        const res = await fetch(forumCreateAPI, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            name: forumName,
            description: forumDescription,
          }),
        });
        const data = await res.json();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
    {
      onSuccess: () => {
        alert("Forum created");
        setForumName(null);
        setForumDescription(null);
        navigation.navigate("ForumMain");
      },
    }
  );

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        paddingHorizontal: 20,
        width: "100%",
      }}
    >
      <Text>Create a Forum</Text>

      {/* Create Forum 'Form' */}
      <TextInput
        placeholder="Title"
        style={{
          height: 50,
          backgroundColor: "#f5f5f5",
          paddingLeft: 4,
          borderColor: "black",
          marginVertical: 30,
          width: "100%",
        }}
        autoFocus
        underlineColorAndroid="transparent"
        onChangeText={(text) => setForumName(text)}
        returnKeyType="next"
      />
      <TextInput
        placeholder="Description"
        style={{
          //   height: 30,
          //   borderWidth: StyleSheet.hairlineWidth,
          paddingLeft: 4,
          borderColor: "black",
          marginVertical: 10,
          width: "100%",
          backgroundColor: "#f5f5f5",
        }}
        multiline={true}
        numberOfLines={7}
        maxLength={240}
        underlineColorAndroid="transparent"
        onChangeText={(text) => setForumDescription(text)}
        keyboardAppearance="dark"
        keyboardType="default"
        returnKeyType="send"
      />

      <TouchableOpacity
        style={{
          backgroundColor: "black",
          padding: 10,
          marginVertical: 10,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: "black",
        }}
        onPress={() => {
          mutation.mutate();
        }}
      >
        <Text style={{ color: "white" }}>Create</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ForumCreate;
