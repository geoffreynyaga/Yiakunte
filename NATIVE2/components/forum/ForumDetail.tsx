/*
 * File: c:\Users\geoff\Desktop\Yiakunte\src\NATIVE\components\forum\ForumDetail.tsx
 * Project: c:\Users\geoff\Desktop\Yiakunte\src\NATIVE
 * Created Date: Thursday, June 30th 2022, 12:57:30 pm
 * Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * Last Modified: Thursday June 30th 2022 12:57:30 pm
 * Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * This file should not be copied and/or distributed without the express
 * permission of Swift Lab Limited.
 * -----
 * Copyright (c) 2022 Swift Lab Limited.
 */

import * as SecureStore from "expo-secure-store";

import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import {
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { forumMessagesAPI, forumMessagesCreateAPI } from "../../api";
import { useMutation, useQuery } from "react-query";

import Constants from "expo-constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn";

export default function ForumDetail({ route, navigation }) {
  const [forums, setForums] = useState(null);
  const [message, setMessage] = useState<null | string>(null);
  const [token, setToken] = useState<null | string>(null);

  // get navigation params
  const { forum } = route.params;
  //console.log(forum, "Param Details");

  const tailwind = useTailwind();
  const inputRef = useRef(null);

  useEffect(() => {
    async function getToken() {
      const token = await SecureStore.getItemAsync("userToken");
      setToken(token);
    }
    getToken();
  }, [token]);

  const { data, error, isLoading } = useQuery(
    `forumMessages-${forum.id}`,
    () => {
      return fetch(forumMessagesAPI(forum.id))
        .then((res) => res.json())
        .then((data) => {
          // console.log(data, "data");
          return data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchInterval: 5000,
      retry: true,
    }
  );

  const mutation = useMutation(
    async (newPost) => {
      try {
        const res = await fetch(forumMessagesCreateAPI(forum.id), {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            message: message,
            forum_id: forum.id,
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
        alert("Message created");
        setMessage(null);
        Keyboard.dismiss();
      },
    }
  );

  if (isLoading) {
    return (
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
            fontSize: 34,
            fontWeight: "bold",
            color: "black",
            textAlign: "center",
          }}
        >
          Loading...
        </Text>
      </View>
    );
  }
  if (error) {
    return <Text>Error!</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          paddingHorizontal: 10,
          position: "absolute",
          bottom: 0,
          right: 5,
          left: 5,
          height: 50,
          zIndex: 99,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          backgroundColor: "#fefef5",
          paddingVertical: 4,
        }}
      >
        <TextInput
          placeholder="Enter your Reply"
          ref={inputRef}
          multiline
          //   numberOfLines={4}
          maxLength={280}
          style={{
            borderRadius: 30,
            flex: 10,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            backgroundColor: "#fdf6f6",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 4,
            width: "100%",
            height: "100%",
            paddingLeft: 10,
          }}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity
          onPress={() => {
            if (message) {
              console.log(message, "message");
              mutation.mutate();
              setMessage(null);
              Keyboard.dismiss();
              inputRef?.current.clear();
            }
          }}
          style={{
            flex: 2,
            justifyContent: "center",
            alignItems: "center",
            // shadowColor: "#000",
            // backgroundColor: "#fdf6f6",
            // shadowOffset: {
            //   width: 0,
            //   height: 2,
            // },
            // shadowOpacity: 0.25,
            // shadowRadius: 3.84,
            // elevation: 4,
            width: "100%",
            paddingLeft: 10,
          }}
        >
          <FontAwesome5 name="paper-plane" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{
          ...tailwind("flex"),
          // marginTop: Constants.statusBarHeight,
          flexDirection: "column",
        }}
      >
        <View
          style={{
            ...tailwind(" flex  mx-2 py-2"),
            flexDirection: "row",
            // flex: 1,
          }}
        >
          <TouchableOpacity
            style={{
              ...tailwind("mx-1 my-2  rounded-xl"),
              flex: 1,
              backgroundColor: "#ffffff",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                // borderWidth: 1,
                width: "100%",
                paddingLeft: 4,
                backgroundColor: "#fdf6f6",
                paddingTop: 2,
              }}
            >
              <View
                style={{
                  flex: 2,
                }}
              >
                {/* //Profile picture thumbnail */}
                <Image
                  source={{ uri: forum.created_by_profile_picture_thumbnail }}
                  style={{
                    borderWidth: 1,
                    borderColor: "#e760bf",
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                  }}
                />
              </View>
              <View
                style={{
                  flex: 7,
                  flexDirection: "column",
                }}
              >
                <Text>{forum.created_by}</Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: "#594057",
                  }}
                >
                  {forum.is_admin ? "Admin" : "Member"}
                </Text>
              </View>
              <View
                style={{
                  flex: 3,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                  }}
                >
                  {forum.date_modified}
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={{
                  ...tailwind("text-center  "),
                  color: "gray",
                  fontSize: 16,
                  // fontFamily: "Sans-serif-medium",
                  fontWeight: "bold",
                  paddingHorizontal: 4,
                  marginTop: 12,
                }}
              >
                {forum.name}
              </Text>
            </View>
            {forum.details ? (
              <View>
                <Text
                  style={{
                    ...tailwind("text-center  "),
                    color: "#0e9577",
                    fontSize: 12,
                    // fontFamily: "Sans-serif-medium",
                    fontWeight: "800",
                    paddingHorizontal: 4,
                    marginTop: 12,
                    textAlign: "justify",
                  }}
                >
                  {forum.details}
                </Text>
              </View>
            ) : null}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                width: "100%",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  // justifyContent: "space-evenly",
                  alignItems: "center",
                  // width: "100%",
                }}
              >
                <FontAwesome5
                  name="comment-alt"
                  size={18}
                  color="black"
                  style={{
                    ...tailwind("text-center"),
                    paddingHorizontal: 4,
                  }}
                />
                <Text
                  style={{
                    marginLeft: 2,
                    fontSize: 14,
                  }}
                >
                  {forum.num_of_messages}
                </Text>
              </View>

              <Text
                style={{
                  color: "black",
                }}
              >
                {/* <Ionicons name="heart-outline" size={32} color="black" /> */}
                <FontAwesome5
                  name="heart"
                  size={18}
                  color="black"
                  style={{
                    ...tailwind("text-center"),
                    paddingHorizontal: 4,
                  }}
                />
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <View
          style={{
            ...tailwind("mt-2 flex "),
            // flex: 8,
            flexDirection: "column",
            width: "100%",
            paddingBottom: 60,
          }}
        >
          {/* row 1 */}

          {data.length > 0 ? (
            data.map((forumMessage: any) => {
              return (
                <View
                  style={{
                    ...tailwind("flex mx-2 py-2"),
                    flexDirection: "row",
                  }}
                  key={forumMessage.id}
                >
                  <View
                    style={{
                      ...tailwind("mx-1 my-2  rounded-xl"),
                      flex: 1,
                      backgroundColor: "#fefe",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      alignItems: "center",
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 1,
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        // borderWidth: 1,
                        width: "100%",
                        paddingLeft: 4,
                        backgroundColor: "#fdf6f6",
                        paddingTop: 2,
                      }}
                    >
                      <View
                        style={{
                          flex: 2,
                        }}
                      >
                        {/* //Profile picture thumbnail */}
                        <Image
                          source={{
                            uri: forumMessage.created_by_profile_picture_thumbnail,
                          }}
                          style={{
                            borderWidth: 1,
                            borderColor: "green",
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          flex: 7,
                          flexDirection: "column",
                        }}
                      >
                        <Text>{forumMessage.created_by}</Text>
                        <Text
                          style={{
                            fontSize: 13,
                            color: "#594057",
                          }}
                        >
                          {forumMessage.is_admin ? "Admin" : "Member"}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 3,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                          }}
                        >
                          {forumMessage.date_created}
                        </Text>
                      </View>
                    </View>

                    {forumMessage.message ? (
                      <View>
                        <Text
                          style={{
                            ...tailwind("text-center"),
                            color: "#36162e",
                            fontSize: 12,
                            // fontFamily: "Sans-serif-medium",
                            fontWeight: "800",
                            paddingHorizontal: 4,
                            marginTop: 12,
                            textAlign: "justify",
                            marginBottom: 10,
                          }}
                        >
                          {forumMessage.message}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </View>
              );
            })
          ) : (
            <View
              style={{
                ...tailwind("flex py-2"),
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text
                style={{
                  ...tailwind("text-center"),
                  color: "#36162e",
                  fontSize: 28,
                  fontWeight: "800",
                  marginTop: 12,
                  marginBottom: 10,
                }}
              >
                No Messages Yet
              </Text>
              <Text>Be the first to reply..</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
