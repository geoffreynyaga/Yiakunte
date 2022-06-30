/*
 * File: c:\Users\geoff\Desktop\Yiakunte\src\NATIVE\components\cultural\index.tsx
 * Project: c:\Users\geoff\Desktop\Yiakunte\src\NATIVE
 * Created Date: Friday, May 20th 2022, 10:09:19 pm
 * Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * Last Modified: Friday May 20th 2022 10:09:19 pm
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

function CulturalItemsListComponent() {
  const tailwind = useTailwind();

  const animals: YiakuListItem[] = [
    { english_name: "Bees", yiakunte: "Kit'e'ni", image: "" },
    { english_name: "Bee hives", yiakunte: "Nukal'eae", image: "" },
    { english_name: "Bee hive general", yiakunte: "Meren", image: "" },
    { english_name: "Beehive bent", yiakunte: "Koh", image: "" },
    { english_name: "Bee wax", yiakunte: "Cooconi", image: "" },
    { english_name: "Comb", yiakunte: "Ac'agnu", image: "" },
    { english_name: "Cave", yiakunte: "Keebni", image: "" },
    { english_name: "Honey guide", yiakunte: "Tik'ampu", image: "" },
    { english_name: "Honey comb", yiakunte: "Acugnai", image: "" },
    { english_name: "Honey guide greator", yiakunte: "Inoinondi", image: "" },
    { english_name: "Hump", yiakunte: "Lege", image: "" },
    { english_name: "Hunt", yiakunte: "Saag", image: "" },
    { english_name: "Honey badeger", yiakunte: "Koiri", image: "" },
    { english_name: "Honey bag ", yiakunte: "Egma", image: "" },
    { english_name: "Honey general", yiakunte: "Sakmai", image: "" },
    {
      english_name: "Arrow (without iron point)",
      yiakunte: "Makil",
      image: "",
    },
    {
      english_name: "Arrow (for shooting human beings)",
      yiakunte: "Kigeret",
      image: "",
    },
    {
      english_name: "Arrow (with oval point)",
      yiakunte: "Ke'c'eian",
      image: "",
    },
    { english_name: "Arrow (single barbed)", yiakunte: "R'arankai", image: "" },
    { english_name: "Shoot", yiakunte: "Dooret", image: "" },
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

export default CulturalItemsListComponent;
