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

function GreetingsListComponent() {
  const REACT_APP_BASE_S3_URL =
    'https://yiakunte.s3.eu-central-1.amazonaws.com/media/';

  const s3_base_url = REACT_APP_BASE_S3_URL;
  const images_app_folder = 'images/greetings';
  const audio_app_folder = 'audio/greetings';

  const image_fixed_url = s3_base_url + images_app_folder;
  const audio_fixed_url = s3_base_url + audio_app_folder;

  const greetings = [
    {
      english_name: 'hellow_too',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/hellow_too.wav`
    },
    {
      english_name: 'am_fairing_well',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/am_fairing_well.wav`
    },
    {
      english_name: 'good_afternoon',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/good_afternoon.wav`
    },
    {
      english_name: 'good_morning',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/good_morning.wav`
    },
    {
      english_name: 'good_morning_my_boy',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/good_morning_my_boy.wav`
    },
    {
      english_name: 'good_day',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/good_day.wav`
    },
    {
      english_name: 'good_morning_my_girl',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/good_morning_my_girl.wav`
    },
    {
      english_name: 'good_morning_woman',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/good_morning_woman.wav`
    },
    {
      english_name: 'hellow',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/hellow.wav`
    },
    {
      english_name: 'are_your_kids_good',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/are_your_kids_good.wav`
    },
    {
      english_name: 'how_are_you_fairing',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/how_are_you_fairing.wav`
    },
    {
      english_name: 'are_your__cows_good',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/are_your__cows_good.wav`
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
      <AudioListPlayerComponent audioFilesArray={greetings} />
    </SafeAreaView>
  );
}

export default GreetingsListComponent;
