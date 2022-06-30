/*
 * File: c:\Users\geoff\Desktop\Yiakunte\src\NATIVE\components\family_tree\index.tsx
 * Project: c:\Users\geoff\Desktop\Yiakunte\src\NATIVE
 * Created Date: Friday, May 20th 2022, 10:04:08 pm
 * Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * Last Modified: Friday May 20th 2022 10:04:08 pm
 * Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * This file should not be copied and/or distributed without the express
 * permission of Swift Lab Limited.
 * -----
 * Copyright (c) 2022 Swift Lab Limited.
 */

import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import React from "react";
import { YiakuListItem } from "../../types";
import { useTailwind } from "tailwind-rn";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const Item = ({
  english_name,
  yiakunte_name,
  image,
}: {
  english_name: string;
  yiakunte_name: string;
  image: string | null;
}) => (
  <TouchableOpacity
    style={{
      height: 0.35 * SCREEN_HEIGHT,
      width: 0.45 * SCREEN_WIDTH,
      backgroundColor: "#fdfdfd",
      // marginHorizontal: 0.025 * SCREEN_WIDTH,
      marginBottom: 0.04 * SCREEN_HEIGHT,
      alignSelf: "center",
      flexDirection: "column",
    }}
  >
    <View
      style={{
        // backgroundColor: "red",
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text>{english_name}</Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "#fff4e3",
          paddingVertical: 10,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          " {yiakunte_name} "
        </Text>
      </View>
      <View style={{ flex: 8, justifyContent: "center", alignItems: "center" }}>
        {image !== null && image !== "" ? (
          <Image
            source={image}
            style={{ width: "80%", height: "80%" }}
            resizeMode="contain"
          />
        ) : (
          <Text>No Image</Text>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

function FamilyTreeListComponent() {
  const tailwind = useTailwind();

  const animals: YiakuListItem[] = [
    { english_name: "Homestead", yiakunte: "Laata", image: "" },
    { english_name: "Girl", yiakunte: "Intal", image: "" },
    { english_name: "Boy", yiakunte: "Kurtei / kuco", image: "" },
    { english_name: "Lady", yiakunte: "Damatu", image: "" },
    { english_name: "Warrior", yiakunte: "N'oromin", image: "" },
    { english_name: "Humanbeing", yiakunte: "Jie", image: "" },
    { english_name: "Gentleman", yiakunte: "Rron", image: "" },
    { english_name: "Sister", yiakunte: "Tau'", image: "" },
    { english_name: "Mother", yiakunte: "Nenetei", image: "" },
    { english_name: "Father", yiakunte: "Paasaha", image: "" },
    { english_name: "Granfather", yiakunte: "Aagushe", image: "" },
    { english_name: "Grandmother", yiakunte: "Looyo", image: "" },
    { english_name: "Uncle", yiakunte: "Adheth", image: "" },
    { english_name: "Aunt", yiakunte: "Walashy aabahay", image: "" },
    { english_name: "Cousins", yiakunte: "Ina adeer'", image: "" },
    { english_name: "Friend", yiakunte: "Saaxib", image: "" },
    { english_name: "Boyfriend", yiakunte: "Wiil saaxib", image: "" },
    { english_name: "Girlfriend", yiakunte: "Gabar Saaxib", image: "" },
    { english_name: "Enemy", yiakunte: "Apori", image: "" },
    { english_name: "Groups", yiakunte: "Qusaaha", image: "" },
  ];

  const renderItem: ListRenderItem<YiakuListItem> = ({ item }) => (
    <Item
      english_name={item.english_name}
      yiakunte_name={item.yiakunte}
      image={item.image}
    />
  );

  return (
    <SafeAreaView style={{ marginTop: StatusBar.currentHeight || 0 }}>
      <FlatList
        data={animals}
        renderItem={renderItem}
        keyExtractor={(item) => item.english_name}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-around",
          alignItems: "center",
          flex: 1,
          flexDirection: "row",
        }}
      />
    </SafeAreaView>
  );
}

export default FamilyTreeListComponent;
