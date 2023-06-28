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
  View
} from 'react-native';

import AudioListPlayerComponent from '../audio_player/NewAudioPlayList';
import AudioPlayerComponent from '../audio_player/AudioPlayerOld';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { YiakuListItem } from '../../types';

// import { REACT_APP_BASE_S3_URL } from "@env";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const Item = ({
  english_name,
  yiakunte_name,
  image,
  audio,
  active
}: {
  english_name: string;
  yiakunte_name: string;
  image: string | null;
  audio: string | null;
  active: boolean;
}) => (
  <View
    style={{
      height: 0.35 * SCREEN_HEIGHT,
      width: 0.45 * SCREEN_WIDTH,
      backgroundColor: '#fdfdfd',
      marginBottom: 0.04 * SCREEN_HEIGHT,
      alignSelf: 'center',
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingTop: 10
    }}
  >
    {/* English */}
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text>{english_name}</Text>
    </View>
    {/* Yiakunte */}
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff4e3',
        paddingVertical: 10
      }}
    >
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
        " {yiakunte_name} "
      </Text>
    </View>
    {/* Image */}
    <View style={{ flex: 6, justifyContent: 'center', alignItems: 'center' }}>
      {image !== null && image !== '' ? (
        <Image
          // source={image}
          source={{
            uri: image
          }}
          style={{ width: '80%', height: '80%' }}
          resizeMode='contain'
        />
      ) : (
        <Text>No Image</Text>
      )}
    </View>
    {/* Play */}
    {active && audio !== null && audio !== '' ? (
      <TouchableOpacity
        style={{
          flex: 2,
          paddingBottom: 0,
          marginBottom: 0,
          borderWidth: StyleSheet.hairlineWidth,
          // borderColor: "#ccd7ff",
          borderColor: 'black',

          borderRadius: 10,
          marginHorizontal: 4
        }}
      >
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}
        >
          <AudioPlayerComponent audioUrl={audio} />
        </View>
      </TouchableOpacity>
    ) : (
      <View style={{ flex: 2, paddingBottom: 0, marginBottom: 0 }} />
    )}
  </View>
);

function FoodListComponent() {
  const REACT_APP_BASE_S3_URL =
    'https://yiakunte.s3.eu-central-1.amazonaws.com/media/';

  const s3_base_url = REACT_APP_BASE_S3_URL;
  const images_app_folder = 'images/food';
  const audio_app_folder = 'audio/food';

  const image_fixed_url = s3_base_url + images_app_folder;
  const audio_fixed_url = s3_base_url + audio_app_folder;

  const food = [
    {
      english_name: 'liver',
      yiakunte: '',
      image: `${image_fixed_url}/liver.jpg`,
      audio: `${audio_fixed_url}/liver.wav`
    },
    {
      english_name: 'honey',
      yiakunte: '',
      image: `${image_fixed_url}/honey.jpg`,
      audio: `${audio_fixed_url}/honey.wav`
    },
    {
      english_name: 'maize',
      yiakunte: '',
      image: `${image_fixed_url}/maize.jpg`,
      audio: `${audio_fixed_url}/maize.wav`
    },
    {
      english_name: 'meat',
      yiakunte: '',
      image: `${image_fixed_url}/meat.jpg`,
      audio: `${audio_fixed_url}/meat.wav`
    },
    {
      english_name: 'bone_marrow',
      yiakunte: '',
      image: `${image_fixed_url}/marrow.jpg`,
      audio: `${audio_fixed_url}/bone_marrow.wav`
    },
    {
      english_name: 'milk',
      yiakunte: '',
      image: `${image_fixed_url}/milk.jpg`,
      audio: `${audio_fixed_url}/milk.wav`
    },
    {
      english_name: 'salt',
      yiakunte: '',
      image: `${image_fixed_url}/salt.jpg`,
      audio: `${audio_fixed_url}/salt.wav`
    },
    {
      english_name: 'purifed_honey',
      yiakunte: '',
      image: `${image_fixed_url}/purified_honey.jpg`,
      audio: `${audio_fixed_url}/purifed__honey.wav`
    },
    {
      english_name: 'egg',
      yiakunte: '',
      image: `${image_fixed_url}/egg.jpg`,
      audio: `${audio_fixed_url}/egg.wav`
    },
    {
      english_name: 'fat',
      yiakunte: '',
      image: `${image_fixed_url}/fat.jpg`,
      audio: `${audio_fixed_url}/fat.wav`
    },
    {
      english_name: 'yelllow_honey',
      yiakunte: '',
      image: `${image_fixed_url}/yellow_honey.jpg`,
      audio: `${audio_fixed_url}/yelllow_honey.wav`
    },
    {
      english_name: 'food',
      yiakunte: '',
      image: `${image_fixed_url}/food.jpg`,
      audio: `${audio_fixed_url}/food.wav`
    },
    {
      english_name: 'hump_meat',
      yiakunte: '',
      image: `${image_fixed_url}/hump_meat.jpg`,
      audio: `${audio_fixed_url}/hump_meat.wav`
    },
    {
      english_name: 'grinded_meat',
      yiakunte: '',
      image: `${image_fixed_url}/grinded_meat.jpg`,
      audio: `${audio_fixed_url}/grinded_meat_.wav`
    },
    {
      english_name: 'water',
      yiakunte: '',
      image: `${image_fixed_url}/water.jpg`,
      audio: `${audio_fixed_url}/water.wav`
    }
  ];

  const renderItem: ListRenderItem<YiakuListItem> = ({ item }) => (
    <Item
      english_name={item.english_name}
      yiakunte_name={item.yiakunte}
      image={item.image}
      audio={item.audio}
      active={true}
    />
  );

  return (
    <SafeAreaView style={{ marginTop: StatusBar.currentHeight || 0 }}>
      <AudioListPlayerComponent audioFilesArray={food} />
    </SafeAreaView>
  );
}

export default FoodListComponent;
