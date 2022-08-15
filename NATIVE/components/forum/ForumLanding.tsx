/*
 * File: c:\Users\geoff\Desktop\Yiakunte\src\NATIVE\components\forum\ForumLanding.tsx
 * Project: c:\Users\geoff\Desktop\Yiakunte\src\NATIVE
 * Created Date: Thursday, June 30th 2022, 12:14:15 am
 * Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * Last Modified: Thursday June 30th 2022 12:14:15 am
 * Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * This file should not be copied and/or distributed without the express
 * permission of Swift Lab Limited.
 * -----
 * Copyright (c) 2022 Swift Lab Limited.
 */

import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Text, View } from "react-native";

import Constants from "expo-constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { forumsListAPI } from "../../api";
import { useQuery } from "react-query";
import { useTailwind } from "tailwind-rn";

export default function ForumLandingScreen({ navigation }) {
  const [forums, setForums] = useState(null);

  const tailwind = useTailwind();

  const { data, error, isLoading } = useQuery(
    "forums",
    async () => {
      try {
        const res = await fetch(forumsListAPI);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      // refetchInterval: 5000,
      retry: true,
      retryDelay: 0,
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
    <>
      {/*  floating button */}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          zIndex: 99,
          backgroundColor: "#b7e1b5",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 4,
        }}
        onPress={() => navigation.navigate("ForumCreate")}
      >
        <FontAwesome5
          name="plus"
          size={30}
          color="black"
          style={{
            ...tailwind("text-center"),
          }}
        />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{
          ...tailwind("flex"),
          marginTop: Constants.statusBarHeight,
          flexDirection: "column",
        }}
      >
        {/* Header Name */}
        <View
          style={{
            ...tailwind("px-2 mt-4"),
            // flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={tailwind(
              "text-3xl tracking-wider  text-center text-purple-900"
            )}
          >
            Yiakunte Community
          </Text>
        </View>
        {/* Categories */}
        <View
          style={{
            ...tailwind("px-2"),
            // flex: 1,
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Text
            style={tailwind("text-xl font-bold text-center text-purple-600")}
          >
            Forums
          </Text>
        </View>
        {/* Forums */}
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

          {data.map((forum: any) => {
            return (
              <View
                style={{
                  ...tailwind(" flex  mx-2 py-2"),
                  flexDirection: "row",
                  // flex: 1,
                }}
                key={forum.id}
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
                    elevation: 4,
                  }}
                  onPress={() => {
                    navigation.navigate("ForumDetail", {
                      forum: forum,
                    });
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
                          uri: forum.created_by_profile_picture_thumbnail,
                        }}
                        style={{
                          borderWidth: 1,
                          borderColor: "#e760bf",
                          height: 50,
                          width: 50,
                          borderRadius: 25,
                        }}
                        resizeMode="cover"
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
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}
