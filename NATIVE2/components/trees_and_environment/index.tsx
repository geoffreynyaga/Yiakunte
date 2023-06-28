/*
 * File: /Users/geoff/Documents/code/Yiakunte/NATIVE2/components/trees_and_environment/index.tsx
 * Project: yiakunte
 * Author: Geoffrey Nyaga  at geoffrey@swiftlab.tech
 * -----
 * Last Modified: Monday June 26th 2023 8:43:44 pm
 * Modified By: Geoffrey Nyaga at geoffrey@swiftlab.tech
 * -----
 * This file should not be copied and/or distributed without the express
 * permission of Swift Lab Limited
 *
 * Copyright (c) 2023 Swift Lab Limited
 * -----
 * HISTORY:
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

function TreesAndEnvironmentListComponent() {
  const REACT_APP_BASE_S3_URL =
    'https://yiakunte.s3.eu-central-1.amazonaws.com/media/';

  const s3_base_url = REACT_APP_BASE_S3_URL;
  const images_app_folder = 'images/trees_and_environment';
  const audio_app_folder = 'audio/trees_and_environment';

  const image_fixed_url = s3_base_url + images_app_folder;
  const audio_fixed_url = s3_base_url + audio_app_folder;

  const trees_and_environment = [
    {
      english_name: 'white cloud',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/white_cloud.wav`
    },
    {
      english_name: 'sunny day',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/sunny_day.wav`
    },
    {
      english_name: 'sand',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/sand.wav`
    },
    {
      english_name: 'the climate is good',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/the_climate_is_good.wav`
    },
    {
      english_name: 'village',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/village.wav`
    },
    {
      english_name: 'it is a sunny day',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/it_is_a_sunny_day.wav`
    },
    {
      english_name: 'a windy day',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/a_windy_day.wav`
    },
    {
      english_name: 'a rainy day',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/a_rainy_day.wav`
    },
    {
      english_name: 'a calm day',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/a_calm_day_.wav`
    },
    {
      english_name: 'mountain',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/mountain.wav`
    },
    {
      english_name: 'lantana trifolia',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/trees/lantana_trifolia.wav`
    },
    {
      english_name: 'lannea rivae',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/trees/lannea_rivae.wav`
    },
    {
      english_name: 'euphobia',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/trees/euphobia.wav`
    },
    {
      english_name: 'ozoroa insginis',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/trees/ozoroa_insginis.wav`
    },
    {
      english_name: 'hypoxis obtusa',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/trees/hypoxis_obtusa.wav`
    },
    {
      english_name: 'acacia siyal',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/trees/acacia_siyal.wav`
    },
    {
      english_name: 'jasminum',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/trees/jasminum.wav`
    },
    {
      english_name: 'aconthera shimperi',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/trees/aconthera_shimperi.wav`
    },
    {
      english_name: 'hibiscus macrantha',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/trees/hibiscus_macrantha(2).wav`
    },
    {
      english_name: 'adenia gummyfera',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/trees/adenia_gummyfera.wav`
    },
    {
      english_name: 'indigofera lupatana baker',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/trees/indigofera_lupatana_baker.wav`
    },
    {
      english_name: 'croton dichogomus',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/trees/croton_dichogomus.wav`
    },
    {
      english_name: 'solanecio hadienisis',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/trees/solanecio_hadienisis.wav`
    },
    {
      english_name: 'lipius javanica',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/trees/lipius_javanica.wav`
    },
    {
      english_name: 'solanum nigrum',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/trees/solanum_nigrum.wav`
    },
    {
      english_name: 'mytenious andatus blackclock',
      yiakunte: '',
      image: '',
      audio: `${audio_fixed_url}/trees/mytenious_andatus_blackclock__.wav`
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
      <AudioListPlayerComponent audioFilesArray={trees_and_environment} />
    </SafeAreaView>
  );
}

export default TreesAndEnvironmentListComponent;
