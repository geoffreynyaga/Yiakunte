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

import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";

import { AuthContext } from "../auth/AuthContext";
import { RootStackScreenProps } from "../types";

export default function ProfileScreen({
  navigation,
}: RootStackScreenProps<"NotFound">) {
  const { setToken } = React.useContext(AuthContext);

  async function signOut() {
    await SecureStore.deleteItemAsync("userToken");
    setToken(null);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to your profile</Text>
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          paddingHorizontal: 10,
          paddingVertical: 4,
          margin: 10,
          borderRadius: 10,
        }}
        onPress={() => signOut()}
      >
        <Text style={{ color: "black" }}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
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
