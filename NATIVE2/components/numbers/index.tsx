/*
 * File: c:\Users\geoff\Desktop\Yiakunte\src\NATIVE\components\body_parts\index.tsx
 * Project: c:\Users\geoff\Desktop\Yiakunte\src\NATIVE
 * Created Date: Friday, May 20th 2022, 9:57:13 pm
 * Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * Last Modified: Friday May 20th 2022 9:57:13 pm
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

function NumbersListComponent() {
  const REACT_APP_BASE_S3_URL =
    'https://yiakunte.s3.eu-central-1.amazonaws.com/media/';

  const s3_base_url = REACT_APP_BASE_S3_URL;
  const images_app_folder = 'images/numbers';
  const audio_app_folder = 'audio/numbers';

  const image_fixed_url = s3_base_url + images_app_folder;
  const audio_fixed_url = s3_base_url + audio_app_folder;

  const numbers: YiakuListItem[] = [
    {
      english_name: '100',
      yiakunte: '',
      image: '',
      active: false,
      audio: `${audio_fixed_url}/100.wav`
    },
    {
      english_name: '10',
      yiakunte: '',
      image: '',
      active: false,
      audio: `${audio_fixed_url}/10.wav`
    },
    {
      english_name: 'two',
      yiakunte: '',
      image: '',
      active: false,
      audio: `${audio_fixed_url}/two.wav`
    },
    {
      english_name: '60',
      yiakunte: '',
      image: '',
      active: false,
      audio: `${audio_fixed_url}/60.wav`
    },
    {
      english_name: '200',
      yiakunte: '',
      image: '',
      active: false,
      audio: `${audio_fixed_url}/200.wav`
    },
    {
      english_name: '9',
      yiakunte: '',
      image: '',
      active: false,
      audio: `${audio_fixed_url}/9.wav`
    },
    {
      english_name: '8',
      yiakunte: '',
      image: '',
      active: false,
      audio: `${audio_fixed_url}/8.wav`
    },
    {
      english_name: 'three',
      yiakunte: '',
      image: '',
      active: false,
      audio: `${audio_fixed_url}/three.wav`
    },
    {
      english_name: '70',
      yiakunte: '',
      image: '',
      active: false,
      audio: `${audio_fixed_url}/70.wav`
    },
    {
      english_name: '40',
      yiakunte: '',
      image: '',
      active: false,
      audio: `${audio_fixed_url}/40.wav`
    },
    {
      english_name: '6',
      yiakunte: '',
      image: '',
      active: false,
      audio: `${audio_fixed_url}/6.wav`
    },
    {
      english_name: '7',
      yiakunte: '',
      image: '',
      active: false,
      audio: `${audio_fixed_url}/7.wav`
    },
    {
      english_name: '5',
      yiakunte: '',
      image: '',
      active: false,
      audio: `${audio_fixed_url}/5.wav`
    },
    {
      english_name: '80',
      yiakunte: '',
      image: '',
      active: false,
      audio: `${audio_fixed_url}/80.wav`
    },
    {
      english_name: '4',
      yiakunte: '',
      image: '',
      active: false,
      audio: `${audio_fixed_url}/4.wav`
    },
    {
      english_name: '90',
      yiakunte: '',
      image: '',
      active: false,
      audio: `${audio_fixed_url}/90.wav`
    },
    {
      english_name: '50',
      yiakunte: '',
      image: '',
      active: false,
      audio: `${audio_fixed_url}/50.wav`
    },
    {
      english_name: '20',
      yiakunte: '',
      image: '',
      active: false,
      audio: `${audio_fixed_url}/20.wav`
    },
    {
      english_name: '30',
      yiakunte: '',
      image: '',
      active: false,
      audio: `${audio_fixed_url}/30.wav`
    },
    {
      english_name: 'one',
      yiakunte: '',
      image: '',
      active: false,
      audio: `${audio_fixed_url}/one.wav`
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
      <AudioListPlayerComponent audioFilesArray={numbers} />

      {/* <FlatList
        data={animals}
        renderItem={renderItem}
        keyExtractor={(item) => item.english_name}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-around',
          alignItems: 'center',
          flex: 1,
          flexDirection: 'row'
        }}
      /> */}
    </SafeAreaView>
  );
}

export default NumbersListComponent;
