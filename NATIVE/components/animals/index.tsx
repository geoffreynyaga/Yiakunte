/*
 * File: c:\Users\geoff\Desktop\Yiakunte\src\NATIVE\components\animals\index.tsx
 * Project: c:\Users\geoff\Desktop\Yiakunte\src\NATIVE
 * Created Date: Wednesday, May 11th 2022, 7:30:28 pm
 * Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * Last Modified: Wednesday May 11th 2022 7:30:28 pm
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

function AnimalsListComponent() {
  const tailwind = useTailwind();

  const animals: YiakuListItem[] = [
    {
      english_name: "Aard Vark",
      yiakunte: "Dhawaaqida",
      image: require("../../assets/images/animals/aardvark.jpg"),
    },
    {
      english_name: "Aard wolf",
      yiakunte: "Warwarsan",
      image: require("../../assets/images/animals/aardwolf.jpg"),
    },
    {
      english_name: "Animal carnivorous",
      yiakunte: "Arapei",
      image: null,
    },
    {
      english_name: "Wild herbivorous",
      yiakunte: "Ehnen",
      image: null,
    },
    {
      english_name: "Ant black",
      yiakunte: "Losusu",
      image: require("../../assets/images/animals/antblack.jpg"),
    },
    {
      english_name: "Antelope",
      yiakunte: "Erer",
      image: require("../../assets/images/animals/antelope.webp"),
    },
    {
      english_name: "Antelope impala",
      yiakunte: "Dabada",
      image: require("../../assets/images/animals/impala.jpg"),
    },
    {
      english_name: "baboon",
      yiakunte: "Lit'ari",
      image: null,
    },
    {
      english_name: "Buffalo",
      yiakunte: "Pee'e",
      image: null,
    },
    {
      english_name: "Buzard",
      yiakunte: "Legei",
      image: null,
    },
    {
      english_name: "Calf",
      yiakunte: "Rehe",
      image: null,
    },
    {
      english_name: "Camel",
      yiakunte: "Ynem",
      image: null,
    },
    {
      english_name: "Cattle",
      yiakunte: "waa",
      image: null,
    },
    {
      english_name: "Chameleon",
      yiakunte: "Qaag",
      image: null,
    },
    {
      english_name: "Dove",
      yiakunte: "puk'ri",
      image: null,
    },
    {
      english_name: "Donkey",
      yiakunte: "Lepe",
      image: null,
    },
    {
      english_name: "Duck",
      yiakunte: "QanQalei'",
      image: null,
    },
    {
      english_name: "Eagle Crowned",
      yiakunte: "Sakiri",
      image: null,
    },
    {
      english_name: "Eagle tawny",
      yiakunte: "Magro",
      image: null,
    },
    {
      english_name: "Eagle verreaux",
      yiakunte: "Legeici",
      image: null,
    },
    {
      english_name: "Elephant",
      yiakunte: "Sogomei",
      image: null,
    },
    {
      english_name: "Elephant female",
      yiakunte: "Neheti sog'omei",
      image: null,
    },
    {
      english_name: "Elephant male",
      yiakunte: "Sakt Sogomei",
      image: null,
    },
    {
      english_name: "Gazelle grants",
      yiakunte: "Wargas",
      image: null,
    },
    {
      english_name: "Gazelle thompsons",
      yiakunte: "Kap'era",
      image: null,
    },
    {
      english_name: "Goat",
      yiakunte: "Quoto",
      image: null,
    },
    {
      english_name: " Goat female",
      yiakunte: "Quoto nehe",
      image: null,
    },
    {
      english_name: "Goat castrated male",
      yiakunte: "Quoto kelleh",
      image: null,
    },
    {
      english_name: "Goat young",
      yiakunte: "Ku'ru'ma",
      image: null,
    },
    {
      english_name: "Bird white bellied",
      yiakunte: "Qaa'aiu",
      image: null,
    },
    {
      english_name: "Rhino",
      yiakunte: "Iligorori",
      image: null,
    },
    {
      english_name: "Gazelles",
      yiakunte: "ell'e",
      image: null,
    },
    {
      english_name: "Spider",
      yiakunte: "Ikoi",
      image: null,
    },
    {
      english_name: "Mosquito",
      yiakunte: "Hinsoni",
      image: null,
    },
    {
      english_name: "Hornbill Crowned",
      yiakunte: "Eitihe'en",
      image: null,
    },
    {
      english_name: "Hyena",
      yiakunte: "se'e'ka",
      image: null,
    },
    {
      english_name: "Hyrax",
      yiakunte: "Deeku",
      image: null,
    },
    {
      english_name: "Lamp",
      yiakunte: "Ku'ru'ma",
      image: null,
    },
    {
      english_name: "Lizard",
      yiakunte: "B'ooqotan",
      image: null,
    },
    {
      english_name: "Locust",
      yiakunte: "Amaten",
      image: null,
    },
    {
      english_name: "Maggot",
      yiakunte: "Korojei",
      image: null,
    },
    {
      english_name: "Mongoose black striped",
      yiakunte: "Simenkor",
      image: null,
    },
    {
      english_name: "Mongoose white striped",
      yiakunte: "Pilless",
      image: null,
    },
    {
      english_name: "Monkey",
      yiakunte: "D'aanyeer",
      image: null,
    },
    {
      english_name: "Mouse bird",
      yiakunte: "Kas'oro",
      image: null,
    },
    {
      english_name: "Ostrich",
      yiakunte: "Wnah",
      image: null,
    },
    {
      english_name: "ox",
      yiakunte: "Qorpa",
      image: null,
    },
    {
      english_name: "Ox pecker",
      yiakunte: "Lari'ai",
      image: null,
    },
    {
      english_name: "Pig bush",
      yiakunte: "Qoie",
      image: null,
    },
    {
      english_name: "Pigeon",
      yiakunte: "Pukuri",
      image: null,
    },
    {
      english_name: "Pigeon rock",
      yiakunte: "Laiso",
      image: null,
    },
    {
      english_name: "Porcupine",
      yiakunte: "Lehpo",
      image: null,
    },
    {
      english_name: "Quail",
      yiakunte: "Gel'emi",
      image: null,
    },
    {
      english_name: "Quiver",
      yiakunte: "Hrax",
      image: null,
    },
    {
      english_name: "Rhinoceros male",
      yiakunte: "Larse",
      image: null,
    },
    {
      english_name: "Rhinoceros female",
      yiakunte: "S'aco",
      image: null,
    },
    {
      english_name: "Snake",
      yiakunte: "Morxo",
      image: null,
    },
    {
      english_name: "Spurrowl",
      yiakunte: "C'eriakuh",
      image: null,
    },
    {
      english_name: "Squirrel black",
      yiakunte: "Adasaniah",
      image: null,
    },
    {
      english_name: "Squirrel white",
      yiakunte: "Parkobu",
      image: null,
    },
    {
      english_name: "Insectivorous",
      yiakunte: "Cayayaanka",
      image: null,
    },
    {
      english_name: "Anti driver safari",
      yiakunte: "t'or'ote",
      image: null,
    },
    {
      english_name: "Anti bear",
      yiakunte: "Qat'ua",
      image: null,
    },
    {
      english_name: "Anti flying",
      yiakunte: "Ye'eiy'eei",
      image: null,
    },
    {
      english_name: "Butterfly",
      yiakunte: "Riparipinte",
      image: null,
    },
    {
      english_name: "Centipede",
      yiakunte: "Kol'opa",
      image: null,
    },
    {
      english_name: "Dragon fly",
      yiakunte: "Ye'eiy'eei",
      image: null,
    },
    {
      english_name: "Fly",
      yiakunte: "Hinsoni",
      image: null,
    },
    {
      english_name: "Hornbill Ground",
      yiakunte: "Muntut",
      image: null,
    },
    {
      english_name: "Hornbill Von dor Deckons",
      yiakunte: "Qotiqote",
      image: null,
    },
  ];

  const renderItem: ListRenderItem<Animal> = ({ item }) => (
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

export default AnimalsListComponent;
