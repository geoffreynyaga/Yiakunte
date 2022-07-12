/*
 * File: c:\Users\geoff\Desktop\Yiakunte\src\NATIVE\components\food\index.tsx
 * Project: c:\Users\geoff\Desktop\Yiakunte\src\NATIVE
 * Created Date: Friday, May 20th 2022, 9:44:02 pm
 * Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * Last Modified: Friday May 20th 2022 9:44:02 pm
 * Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * This file should not be copied and/or distributed without the express
 * permission of Swift Lab Limited.
 * -----
 * Copyright (c) 2022 Swift Lab Limited.
 */

import React from "react";
import {
  Dimensions,
  Image,
  ListRenderItem,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
} from "react-native";

import { useTailwind } from "tailwind-rn";
import { YiakuListItem } from "../../types";

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

function FoodListComponent() {
  const tailwind = useTailwind();

  const animals: YiakuListItem[] = [
    { english_name: "Food", yiakunte: "Ekto", image: "" },
    { english_name: "Egg", yiakunte: "Bol'oli", image: "" },
    { english_name: "Fat", yiakunte: "Lehen", image: "" },
    { english_name: "Grinded meat", yiakunte: "Sapapi", image: "" },
    { english_name: "Honey", yiakunte: "Sikai", image: "" },
    { english_name: "Yellow Honey", yiakunte: "Diko", image: "" },
    { english_name: "Purified honey", yiakunte: "Elel", image: "" },
    { english_name: "Maize", yiakunte: "Hylpeya", image: "" },
    { english_name: "Marrow", yiakunte: "C'ee'n", image: "" },
    { english_name: "Liver", yiakunte: "Ahman", image: "" },
    { english_name: "Meat", yiakunte: "Y'eei", image: "" },
    { english_name: "Hump meat", yiakunte: "Cox", image: "" },
    { english_name: "Milk", yiakunte: "Deeks", image: "" },
    { english_name: "Water", yiakunte: "An'o", image: "" },
    { english_name: "Salt", yiakunte: "Y'ei", image: "" },
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

export default FoodListComponent;
