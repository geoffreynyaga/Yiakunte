import * as WebBrowser from "expo-web-browser";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Text, View } from "react-native";
import Constants from "expo-constants";
import { useTailwind } from "tailwind-rn";
import { FontAwesome } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function MainPageMenuComponent({ navigation }) {
  const tailwind = useTailwind();

  return (
    <View
      style={{
        ...tailwind("bg-gray-100"),
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
        // margin statusBar height
        paddingTop: Constants.statusBarHeight,
      }}
    >
      {/* Header Name */}
      <View
        style={{
          ...tailwind("px-2 mt-4"),
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Text
          style={tailwind(
            "text-3xl tracking-wider  text-center text-purple-900"
          )}
        >
          Yiakunte App
        </Text>
      </View>
      {/* Categories */}
      <View
        style={{
          ...tailwind("px-2"),
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Text style={tailwind("text-xl font-bold text-center text-purple-600")}>
          Categories
        </Text>
      </View>
      {/* Menu */}
      <View
        style={{
          ...tailwind("mt-2 flex bg-gray-50"),
          flex: 8,
          flexDirection: "column",
          width: "100%",
        }}
      >
        {/* row 1 */}
        <View
          style={{
            ...tailwind(" flex  mx-2 py-2"),
            flexDirection: "row",
            flex: 1,
          }}
        >
          <TouchableOpacity
            style={{
              ...tailwind("mx-2 my-2  rounded-xl "),
              flex: 1,
              backgroundColor: "#9764c7",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Ionicons name="eye-outline" size={32} color="white" />

            <Text style={tailwind("text-center text-white ")}>Body Parts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...tailwind("mx-2 my-2  rounded-xl "),
              flex: 1,
              backgroundColor: "#9764c7",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
            //on press navigate

            onPress={() => {
              navigation.navigate("Animals");
            }}
          >
            <Ionicons name="paw-outline" size={32} color="white" />
            <Text style={tailwind("text-center text-white  ")}>Animals</Text>
          </TouchableOpacity>
        </View>
        {/* row 2 */}
        <View
          style={{
            ...tailwind(" flex  mx-2 py-2"),
            flexDirection: "row",
            flex: 1,
          }}
        >
          <TouchableOpacity
            style={{
              ...tailwind("mx-2 my-2  rounded-xl "),
              flex: 1,
              backgroundColor: "#9764c7",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Ionicons name="leaf-outline" size={32} color="white" />

            <Text style={tailwind("text-center text-white ")}>
              Trees & Environment
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...tailwind("mx-2 my-2  rounded-xl "),
              flex: 1,
              backgroundColor: "#9764c7",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Ionicons name="bonfire-outline" size={32} color="white" />

            <Text style={tailwind("text-center text-white ")}>
              Cultural Utility Items
            </Text>
          </TouchableOpacity>
        </View>
        {/* row 3 */}
        <View
          style={{
            ...tailwind(" flex  mx-2 py-2"),
            flexDirection: "row",
            flex: 1,
          }}
        >
          <TouchableOpacity
            style={{
              ...tailwind("mx-2 my-2  rounded-xl "),
              flex: 1,
              backgroundColor: "#9764c7",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Ionicons name="library-outline" size={32} color="white" />

            <Text style={tailwind("text-center text-white ")}>Dictionary</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...tailwind("mx-2 my-2  rounded-xl "),
              flex: 1,
              backgroundColor: "#9764c7",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Ionicons name="git-merge-outline" size={32} color="white" />

            <Text style={tailwind("text-center text-white ")}>Family Tree</Text>
          </TouchableOpacity>
        </View>
        {/* row 4 */}
        <View
          style={{
            ...tailwind(" flex  mx-2 py-2"),
            flexDirection: "row",
            flex: 1,
          }}
        >
          <TouchableOpacity
            style={{
              ...tailwind("mx-2 my-2  rounded-xl "),
              flex: 1,
              backgroundColor: "#9764c7",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Ionicons name="restaurant-outline" size={32} color="white" />

            <Text style={tailwind("text-center text-white ")}>Food</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...tailwind("mx-2 my-2  rounded-xl "),
              flex: 1,
              backgroundColor: "#9764c7",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Ionicons name="md-man-outline" size={32} color="white" />

            <Text style={tailwind("text-center text-white ")}>
              Chat the Meta-Human
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
  );
}
