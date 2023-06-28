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

import * as ImagePicker from "expo-image-picker";
import * as React from "react";
import * as SecureStore from "expo-secure-store";

import {
  Button,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "react-native";

import { AuthContext } from "../auth/AuthContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RootStackScreenProps } from "../types";
import { userProfileDetailAPI } from "../api";
import { userProfileUpdateAPI } from "../api/index";

export default function ProfileScreen({
  navigation,
}: RootStackScreenProps<"NotFound">) {
  const { setToken } = React.useContext(AuthContext);

  const [profilePic, setProfilePic] = React.useState(null);
  const [profilePicClicked, setProfilePicClicked] = React.useState(false);

  const [isProfileEditing, setIsProfileEditing] = React.useState(false);

  const [image, setImage] = React.useState(null);
  // first Name
  const [first_name, setFirstName] = React.useState(null);
  // last Name
  const [last_name, setLastName] = React.useState(null);

  // const [formData, setFormData] = React.useState(new FormData());

  const formData = new FormData();

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
          // console.log(data, "this is data");
          // const c = {
          //   first_name: "Geoff",
          //   id: 2,
          //   last_name: null,
          //   profile_pic: null,
          //   profile_pic_thumbnail: null,
          // };

          if (data.first_name) {
            setFirstName(data.first_name);
          }
          if (data.last_name) {
            setLastName(data.last_name);
          }
          if (data.profile_pic) {
            setProfilePic(data.profile_pic);
          }
        });
    };

    getUserProfile();
  }, [isProfileEditing]);

  const handleProfileUpdate = async () => {
    // convert image to base64

    const data = {
      first_name: first_name,
      last_name: last_name,
      image: image,
    };

    formData.append("first_name", first_name ? first_name : "");
    formData.append("last_name", last_name ? last_name : "");
    if (image !== null) {
      formData.append("image", {
        uri: image,
        name: "image",
        type: "image/jpg",
      });
    }

    await fetch(userProfileUpdateAPI, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${await SecureStore.getItemAsync("userToken")}`,
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data, "this is update data");
        setIsProfileEditing(false);
      });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      // base64: true,
    });

    console.log(result);
    const dummy_result = {
      cancelled: false,
      height: 435,
      type: "image",
      uri: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540geoffreynyaga%252Fyiakunte/ImagePicker/6ea956d0-2eac-4648-81ba-7e66c8f710fb.jpg",
      width: 580,
    };

    formData.append("image", {
      uri: result.uri,
      name: "image",
      type: "image/jpg",
    });

    if (!result.cancelled) {
      // convert to base64
      setImage(result.uri);
    }
  };

  return first_name !== null || last_name !== null || profilePic !== null ? (
    <View style={styles.container}>
      <View
        style={{
          flex: 4,
          flexDirection: "column",
          // borderWidth: 1,
          // borderColor: "black",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#581b98",
            }}
          >
            Hi{" "}
            {first_name || last_name ? (
              <Text>
                {first_name} {last_name} ,
              </Text>
            ) : null}
          </Text>
          <Text style={styles.title}>Welcome to your profile</Text>
        </View>

        <TouchableOpacity
          style={{
            // flex: 3,
            flexDirection: "column",
            // borderColor: "black",
            // borderWidth: 1,
          }}
          onPress={() => {
            if (profilePic) {
              setProfilePicClicked(!profilePicClicked);
            } else {
              // upload profile pic
            }
          }}
        >
          {profilePic ? (
            <Image
              source={{ uri: profilePic }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: "#9c1de7",
              }}
              resizeMode="cover"
            />
          ) : (
            <Ionicons name="ios-person-outline" size={42} color="#9c1de7" />
          )}
        </TouchableOpacity>

        {profilePicClicked === false ? (
          <TouchableOpacity
            style={{
              // flex: 3,
              flexDirection: "column",
              // borderColor: "black",
              // borderWidth: 1,
              // height: 30,
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor: isProfileEditing ? "red" : "#9c1de7",
              justifyContent: "center",
              borderRadius: 5,
            }}
            onPress={() => {
              setIsProfileEditing(!isProfileEditing);
              setImage(null);
            }}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              {isProfileEditing === false ? "Edit Profile" : "Cancel Editing"}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <View
        style={{
          flex: 5,
          flexDirection: "row",
          // borderWidth: 1,
          // borderColor: "black",
          justifyContent: "space-between",
          marginTop: 10,
          backgroundColor: "#f0f0f0",
          // margin: 20,
        }}
      >
        {profilePicClicked === true ? (
          <View
            style={{
              flex: 4,
              flexDirection: "row",
              // borderWidth: 1,
              // borderColor: "black",
            }}
          >
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                zIndex: 999,
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: "#fc5c9c",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                setProfilePicClicked(!profilePicClicked);
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 26,
                }}
              >
                X
              </Text>
            </TouchableOpacity>
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
        ) : (
          <View
            style={{
              // flex: 4,
              paddingTop: 10,
              width: "100%",
              marginHorizontal: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                // borderWidth: 1,
                // borderColor: "red",
                height: 50,
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  paddingLeft: 10,
                  flex: 3,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  First Name:
                </Text>
              </View>
              <View
                style={{
                  paddingLeft: 10,
                  flex: 7,
                }}
              >
                {isProfileEditing === true ? (
                  <TextInput
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#3e3636",
                      borderWidth: 1,
                      borderColor: "#3e3636",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 5,
                      width: "80%",
                    }}
                    onChangeText={(text) => {
                      setFirstName(text);
                    }}
                    value={first_name}
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#3e3636",
                    }}
                  >
                    {first_name}
                  </Text>
                )}
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                // borderWidth: 1,
                // borderColor: "red",
                height: 50,
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  paddingLeft: 10,
                  flex: 3,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Last Name:
                </Text>
              </View>
              <View
                style={{
                  paddingLeft: 10,
                  flex: 7,
                }}
              >
                {isProfileEditing === true ? (
                  <TextInput
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#3e3636",
                      borderWidth: 1,
                      borderColor: "#3e3636",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 5,
                      width: "80%",
                    }}
                    onChangeText={(text) => {
                      setLastName(text);
                    }}
                    value={last_name}
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#3e3636",
                    }}
                  >
                    {last_name}
                  </Text>
                )}
              </View>
            </View>
            {isProfileEditing === true ? (
              <View
                style={{
                  flexDirection: "column",
                  // borderWidth: 1,
                  // borderColor: "red",
                  // height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  marginVertical: 10,
                }}
              >
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#3e3636",
                      borderWidth: 1,
                      borderColor: "#3e3636",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 5,
                      width: "80%",
                    }}
                    // onPress={() => {
                    //   setProfilePicClicked(!profilePicClicked);
                    // }}
                    onPress={pickImage}
                  >
                    {image ? "Change Profile Picture" : "Add Profile Picture"}
                  </Text>
                </TouchableOpacity>

                {/* {image && (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 100, height: 100, marginBottom: 10 }}
                  />
                )} */}
                {image && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                      }}
                    >
                      Profile Picture selected
                    </Text>
                    <Ionicons name="ios-checkmark" size={30} color="green" />
                  </View>
                )}
                <TouchableOpacity
                  style={{
                    backgroundColor: "blue",
                    paddingHorizontal: 30,
                    paddingVertical: 4,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 30,
                  }}
                  onPress={() => handleProfileUpdate()}
                >
                  <Text style={{ color: "#fefe" }}>Save Profile</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        )}
      </View>

      {isProfileEditing === true ? null : (
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
      )}
    </View>
  ) : (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Loading...
      </Text>

      <Text
        style={{
          fontSize: 14,
          fontWeight: "bold",
          textAlign: "center",
          color: "#3e36fe",
          marginVertical: 30,
          paddingHorizontal: 30,
        }}
      >
        If Loading persists, please log out below and try logging in again...
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#3e36fe",
          paddingHorizontal: 30,
          paddingVertical: 4,
          height: 40,
          flexDirection: "column",
          justifyContent: "center",
        }}
        onPress={() => signOut()}
      >
        {/* URGENT: Delete this */}
        <Text style={{ color: "#fefe" }}>Sign Out Here</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    // padding: 20,
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
