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
  active: false;
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

function BodyPartsListComponent() {
  const REACT_APP_BASE_S3_URL =
    'https://yiakunte.s3.eu-central-1.amazonaws.com/media/';

  const s3_base_url = REACT_APP_BASE_S3_URL;
  const images_app_folder = 'images/body_parts';
  const audio_app_folder = 'audio/body_parts';

  const image_fixed_url = s3_base_url + images_app_folder;
  const audio_fixed_url = s3_base_url + audio_app_folder;

  const body_parts: YiakuListItem[] = [
    {
      english_name: 'Head',
      yiakunte: 'mete',
      image: `${image_fixed_url}/head.jpg`,
      active: false,
      audio: `${audio_fixed_url}/head.wav`
    },
    {
      english_name: 'Chest',
      yiakunte: 'Sheu',
      image: `${image_fixed_url}/chest.jpg`,
      active: false,
      audio: `${audio_fixed_url}/chest.wav`
    },
    {
      english_name: 'Eyes',
      yiakunte: 'Ila',
      image: `${image_fixed_url}/eyes.jpg`,
      active: false,
      audio: `${audio_fixed_url}/eyes.wav`
    },
    {
      english_name: 'Body',
      yiakunte: 'Naxap',
      image: `${image_fixed_url}/body.jpg`,
      active: false,
      audio: `${audio_fixed_url}/body.wav`
    },
    {
      english_name: 'Neck',
      yiakunte: 'Tokoro',
      image: `${image_fixed_url}/neck.jpg`,
      active: false,
      audio: `${audio_fixed_url}/neck.wav`
    },
    {
      english_name: 'Shoulder',
      yiakunte: 'Kelege',
      image: `${image_fixed_url}/shoulder.jpg`,
      active: false,
      audio: `${audio_fixed_url}/shoulder.wav`
    },
    {
      english_name: 'Armpit',
      yiakunte: 'Qoiqola',
      image: `${image_fixed_url}/armpit.jpg`,
      active: false,
      audio: `${audio_fixed_url}/armpit.wav`
    },
    {
      english_name: 'Hand',
      yiakunte: 'Tike',
      image: `${image_fixed_url}/hand.jpg`,
      active: false,
      audio: `${audio_fixed_url}/hand.wav`
    },
    {
      english_name: 'Toe',
      yiakunte: 'Quipi',
      image: `${image_fixed_url}/toe.jfif`,
      active: false,
      audio: `${audio_fixed_url}/toe.wav`
    },
    {
      english_name: 'Nails',
      yiakunte: 'Segel ',
      image: `${image_fixed_url}/nails.jpg`,
      active: false,
      audio: `${audio_fixed_url}/nails.wav`
    },
    {
      english_name: 'Stomach',
      yiakunte: 'Ire',
      image: `${image_fixed_url}/stomach.jpg`,
      active: false,
      audio: `${audio_fixed_url}/stomach.wav`
    },
    {
      english_name: 'Leg',
      yiakunte: 'Miji',
      image: `${image_fixed_url}/leg.jpg`,
      active: false,
      audio: `${audio_fixed_url}/leg.wav`
    },
    {
      english_name: 'Thigh',
      yiakunte: 'Ikut',
      image: `${image_fixed_url}/thigh.jpg`,
      active: false,
      audio: `${audio_fixed_url}/thigh.wav`
    },
    {
      english_name: 'back',
      yiakunte: 'Tulu',
      image: `${image_fixed_url}/back.jpg`,
      active: false,
      audio: `${audio_fixed_url}/back.wav`
    },
    {
      english_name: 'intestines',
      yiakunte: 'Rehmo',
      image: `${image_fixed_url}/intestines.jpg`,
      active: false,
      audio: `${audio_fixed_url}/intestines.wav`
    },
    {
      english_name: 'Muscle',
      yiakunte: "T'ebe",
      image: `${image_fixed_url}/muscle.jpg`,
      active: false,
      audio: `${audio_fixed_url}/muscle.wav`
    },
    {
      english_name: 'Wrist',
      yiakunte: "T'oso",
      image: `${image_fixed_url}/wrist.jpg`,
      active: false,
      audio: `${audio_fixed_url}/wrist.wav`
    },
    {
      english_name: 'bone',
      yiakunte: 'Mucu',
      image: `${image_fixed_url}/bone.jpg`,
      active: false,
      audio: `${audio_fixed_url}/bone.wav`
    },
    {
      english_name: 'skin',
      yiakunte: 'Rrege',
      image: `${image_fixed_url}/skin.jpg`,
      active: false,
      audio: `${audio_fixed_url}/skin.wav`
    },
    {
      english_name: 'heart',
      yiakunte: "Ce'e",
      image: `${image_fixed_url}/heart.jpg`,
      active: false,
      audio: `${audio_fixed_url}/heart.wav`
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
      <AudioListPlayerComponent audioFilesArray={body_parts} />

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

export default BodyPartsListComponent;
