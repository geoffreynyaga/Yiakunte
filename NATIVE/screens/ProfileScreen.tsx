/*
 * File: c:\Users\geoff\Desktop\Yiakunte\src\NATIVE\screens\ProfileScreen.tsx
 * Project: c:\Users\geoff\Desktop\Yiakunte\src\NATIVE
 * Created Date: Wednesday, June 29th 2022, 10:59:22 pm
 * Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * Last Modified: Wednesday June 29th 2022 10:59:22 pm
 * Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * This file should not be copied and/or distributed without the express
 * permission of Swift Lab Limited.
 * -----
 * Copyright (c) 2022 Swift Lab Limited.
 */

import * as React from "react";
import * as SecureStore from "expo-secure-store";

import { Dimensions, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";

import { AuthContext } from "../auth/AuthContext";
import { RootStackScreenProps } from "../types";
import { userProfileDetailAPI } from "../api";

export default function ProfileScreen({
  navigation,
}: RootStackScreenProps<"NotFound">) {
  const { setToken } = React.useContext(AuthContext);

  const [profilePic, setProfilePic] = React.useState(null);
  // profile_pic_thumbnail
  const [profile_pic_thumbnail, setProfile_pic_thumbnail] =
    React.useState(null);

  // first Name
  const [first_name, setFirstName] = React.useState(null);
  // last Name
  const [last_name, setLastName] = React.useState(null);

  async function signOut() {
    await SecureStore.deleteItemAsync("userToken");
    setToken(null);
  }

  React.useEffect(() => {
    const getUserProfile = async () => {
      await fetch(userProfileDetailAPI, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then(async (data) => {
          console.log(data, "this is data");
          let c = {
            first_name: "Geoff",
            id: 2,
            last_name: null,
            profile_pic: null,
            profile_pic_thumbnail: null,
          };

          if (data.first_name) {
            setFirstName(data.first_name);
          }
          if (data.last_name) {
            setLastName(data.last_name);
          }
          if (data.profile_pic) {
            setProfilePic(data.profile_pic);
          }
          if (data.profile_pic_thumbnail) {
            setProfile_pic_thumbnail(data.profile_pic_thumbnail);
          }
        });
    };

    getUserProfile();

    return () => {
      console.log("ProfileScreen unmounted");
    };
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 2,
          flexDirection: "row",
          // borderWidth: 1,
          // borderColor: "black",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>Welcome to your profile</Text>
      </View>

      <View
        style={{
          flex: 4,
          flexDirection: "row",
          // borderWidth: 1,
          // borderColor: "black",
        }}
      >
        <Image
          source={{ uri: profilePic }}
          style={{
            width: "100%",
            // height: "100%",
            // borderRadius: 50,
          }}
          resizeMode="cover"
        />
      </View>

      <View
        style={{
          flex: 3,
          flexDirection: "row",
          // borderWidth: 1,
          // borderColor: "black",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <View
          style={{
            flex: 3,
            flexDirection: "column",
            // borderColor: "black",
            // borderWidth: 1,
          }}
        >
          <Image
            source={{ uri: profilePic }}
            style={{
              width: 70,
              height: 70,
              borderRadius: 50,
            }}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            flex: 7,
            paddingTop: 10,
          }}
        >
          <Text>
            {first_name} {last_name}
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          // borderWidth: 1,
          // borderColor: "black",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            paddingHorizontal: 30,
            paddingVertical: 4,
            height: 40,
          }}
          onPress={() => signOut()}
        >
          <Text style={{ color: "#fefe" }}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "white",
  },
});
