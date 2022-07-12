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

import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Text, View } from "react-native";

import Constants from "expo-constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { forumMessagesAPI } from "../../api";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";
import { useTailwind } from "tailwind-rn";

export default function ForumDetail({ route, navigation }) {
  const [forums, setForums] = useState(null);

  // get navigation params
  const { forum } = route.params;
  //console.log(forum, "Param Details");

  const tailwind = useTailwind();

  const { data, error, isLoading } = useQuery("forumMessages", () => {
    return fetch(forumMessagesAPI(forum.id))
      .then((res) => res.json())
      .then((data) => {
        // console.log(data, "data");
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error!</Text>;
  }

  return (
    <View>
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
                  source={require("../../assets/images/adaptive-icon.png")}
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
                          source={require("../../assets/images/adaptive-icon.png")}
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
                ...tailwind("flex mx-2 py-2"),
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
                  paddingHorizontal: 4,
                  marginTop: 12,
                  textAlign: "justify",
                  marginBottom: 10,
                }}
              >
                No Messages Yet
              </Text>
              <Text>Be the first to respond..</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
