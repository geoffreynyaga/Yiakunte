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

function AnimalsListComponent() {
  const REACT_APP_BASE_S3_URL =
    'https://yiakunte.s3.eu-central-1.amazonaws.com/media/';

  const s3_base_url = REACT_APP_BASE_S3_URL;
  const images_app_folder = 'images/animals';
  const audio_app_folder = 'audio/animals';

  const image_fixed_url = s3_base_url + images_app_folder;
  const audio_fixed_url = s3_base_url + audio_app_folder;

  const animals: YiakuListItem[] = [
    {
      english_name: 'Canivorous Animal',
      yiakunte: '',
      image: '',
      active: false,
      audio: `${audio_fixed_url}/canivorous_animal.wav`
    },
    {
      english_name: 'ostrich',
      yiakunte: '',
      image: `${image_fixed_url}/ostrich.jpg`,
      active: false,
      audio: `${audio_fixed_url}/ostrich.wav`
    },
    {
      english_name: 'cow',
      yiakunte: '',
      image: `${image_fixed_url}/cattle.jpg`,
      active: false,
      audio: `${audio_fixed_url}/cow.wav`
    },
    {
      english_name: 'pig bush',
      yiakunte: '',
      image: `${image_fixed_url}/pig_bush.jpg`,
      active: false,
      audio: `${audio_fixed_url}/pig_bush.wav`
    },
    {
      english_name: 'sheep',
      yiakunte: '',
      image: `${image_fixed_url}/sheep1.jpg`,
      active: false,
      audio: `${audio_fixed_url}/sheep.wav`
    },
    {
      english_name: 'porcupine',
      yiakunte: '',
      image: `${image_fixed_url}/pocupine.jpg`,
      active: false,
      audio: `${audio_fixed_url}/pocupine.wav`
    },
    {
      english_name: 'zebra',
      yiakunte: '',
      image: `${image_fixed_url}/zebra.jpg`,
      active: false,
      audio: `${audio_fixed_url}/zebra.wav`
    },
    {
      english_name: 'bee',
      yiakunte: '',
      image: `${image_fixed_url}/bees.jpg`,
      active: false,
      audio: `${audio_fixed_url}/bee.wav`
    },
    {
      english_name: 'buzard',
      yiakunte: '',
      image: `${image_fixed_url}/buzzard.jpg`,

      active: false,
      audio: `${audio_fixed_url}/buzard.wav`
    },
    {
      english_name: 'centipede',
      yiakunte: '',
      image: `${image_fixed_url}/centipede.jpg`,
      active: false,
      audio: `${audio_fixed_url}/centipede.wav`
    },
    {
      english_name: 'hyena',
      yiakunte: '',
      image: `${image_fixed_url}/hyena.jpg`,
      active: false,
      audio: `${audio_fixed_url}/hyena.wav`
    },
    {
      english_name: 'white striped mongoose',
      yiakunte: '',
      image: `${image_fixed_url}/mongoose_white_stripped.jpg`,
      active: false,
      audio: `${audio_fixed_url}/white_striped_mongoose.wav`
    },
    {
      english_name: 'black squirel',
      yiakunte: '',
      image: `${image_fixed_url}/squirrel_black.jpg`,
      active: false,
      audio: `${audio_fixed_url}/black_squirel.wav`
    },
    {
      english_name: 'butterfly',
      yiakunte: '',
      image: `${image_fixed_url}/butterfly.jpg`,
      active: false,
      audio: `${audio_fixed_url}/butterfly.wav`
    },
    {
      english_name: 'bees',
      yiakunte: '',
      image: `${image_fixed_url}/bees.jpg`,
      active: false,
      audio: `${audio_fixed_url}/bees.wav`
    },
    {
      english_name: 'black striped mongoose',
      yiakunte: '',
      image: `${image_fixed_url}/mangoose_black_stripped.jpg`,
      active: false,
      audio: `${audio_fixed_url}/black_striped_mongoose.wav`
    },
    {
      english_name: 'impala antelope',
      yiakunte: '',
      image: `${image_fixed_url}/impala_antelope.jpg`,
      active: false,
      audio: `${audio_fixed_url}/impala_antelope.wav`
    },
    {
      english_name: 'ox',
      yiakunte: '',
      image: `${image_fixed_url}/ox.jpg`,
      active: false,
      audio: `${audio_fixed_url}/ox.wav`
    },
    {
      english_name: 'dragon fly',
      yiakunte: '',
      image: `${image_fixed_url}/dragon_fly.jpg`,
      active: false,
      audio: `${audio_fixed_url}/dragon_fly.wav`
    },
    {
      english_name: 'antelope',
      yiakunte: '',
      image: `${image_fixed_url}/antelope.jpg`,
      active: false,
      audio: `${audio_fixed_url}/antelope.wav`
    },
    {
      english_name: 'dog',
      yiakunte: '',
      image: `${image_fixed_url}/dog.jpg`,
      active: false,
      audio: `${audio_fixed_url}/dog.wav`
    },
    {
      english_name: 'insectivorous',
      yiakunte: '',
      image: `${image_fixed_url}/insectivorous.jpg`,
      active: false,
      audio: `${audio_fixed_url}/insectivorous.wav`
    },
    {
      english_name: 'ard wolf',
      yiakunte: '',
      image: `${image_fixed_url}/ard_wolf.jpg`,
      active: false,
      audio: `${audio_fixed_url}/ard_wolf.wav`
    },
    {
      english_name: 'lion',
      yiakunte: '',
      image: `${image_fixed_url}/_lion.jpg`,
      active: false,
      audio: `${audio_fixed_url}/lion.wav`
    },
    {
      english_name: 'locust',
      yiakunte: '',
      image: `${image_fixed_url}/locust.jpg`,
      active: false,
      audio: `${audio_fixed_url}/locust.wav`
    },
    {
      english_name: 'ant bear',
      yiakunte: '',
      image: `${image_fixed_url}/anti_bear.jpg`,
      active: false,
      audio: `${audio_fixed_url}/ant_bear.wav`
    },
    {
      english_name: 'rhino',
      yiakunte: '',
      image: `${image_fixed_url}/rhino.jpg`,
      active: false,
      audio: `${audio_fixed_url}/rhino.wav`
    },
    {
      english_name: 'fly',
      yiakunte: '',
      image: `${image_fixed_url}/fly.jpg`,
      active: false,
      audio: `${audio_fixed_url}/fly.wav`
    },
    {
      english_name: 'rabbit',
      yiakunte: '',
      image: `${image_fixed_url}/rabit.jpg`,
      active: false,
      audio: `${audio_fixed_url}/rabit.wav`
    },
    {
      english_name: 'giraffe',
      yiakunte: '',
      image: `${image_fixed_url}/giraffe_wild_harbivore.jpg`,
      active: false,
      audio: `${audio_fixed_url}/giraffe.wav`
    },
    {
      english_name: 'monkey',
      yiakunte: '',
      image: `${image_fixed_url}/monkey.jpg`,
      active: false,
      audio: `${audio_fixed_url}/monkey.wav`
    },
    {
      english_name: 'lamb',
      yiakunte: '',
      image: `${image_fixed_url}/lamb.jpg`,
      active: false,
      audio: `${audio_fixed_url}/lamb.wav`
    },
    {
      english_name: 'pigeon rock',
      yiakunte: '',
      image: `${image_fixed_url}/pigeon_rock.jpg`,
      active: false,
      audio: `${audio_fixed_url}/rock_pigeon.wav`
    },
    {
      english_name: 'goat',
      yiakunte: '',
      image: `${image_fixed_url}/goat_male1.jpg`,
      active: false,
      audio: `${audio_fixed_url}/goat.wav`
    },
    {
      english_name: 'habivorous animal',
      yiakunte: '',
      image: `${image_fixed_url}/habivorous_animal.jpg`,
      active: false,
      audio: `${audio_fixed_url}/habivorous_animal.wav`
    },
    {
      english_name: 'maggot',
      yiakunte: '',
      image: `${image_fixed_url}/maggot.jpg`,
      active: false,
      audio: `${audio_fixed_url}/maggot.wav`
    },
    {
      english_name: 'baboon',
      yiakunte: '',
      image: `${image_fixed_url}/baboon.jpeg`,
      active: false,
      audio: `${audio_fixed_url}/baboon.wav`
    },
    {
      english_name: 'mouse bird',
      yiakunte: '',
      image: `${image_fixed_url}/mouse_bird.jpg`,
      active: false,
      audio: `${audio_fixed_url}/mouse_bird.wav`
    },
    {
      english_name: 'snake',
      yiakunte: '',
      image: `${image_fixed_url}/snake.jpg`,
      active: false,
      audio: `${audio_fixed_url}/snake.wav`
    },
    {
      english_name: 'ox pecker',
      yiakunte: '',
      image: `${image_fixed_url}/ox_pecker.jpg`,
      active: false,
      audio: `${audio_fixed_url}/oxpeka.wav`
    },
    {
      english_name: 'white squirel',
      yiakunte: '',
      image: `${image_fixed_url}/squirrel_white.jpg`,
      active: false,
      audio: `${audio_fixed_url}/white__squirel.wav`
    },
    {
      english_name: 'sparrow',
      yiakunte: '',
      image: `${image_fixed_url}/sparrow.jpg`,
      active: false,
      audio: `${audio_fixed_url}/sparrow.wav`
    },
    {
      english_name: 'rhinoserous',
      yiakunte: '',
      image: `${image_fixed_url}/rhino.jpg`,
      active: false,
      audio: `${audio_fixed_url}/rhinoserous.wav`
    },
    {
      english_name: 'hilux',
      yiakunte: '',
      image: `${image_fixed_url}/hilux.jpg`,
      active: false,
      audio: `${audio_fixed_url}/hilux.wav`
    },
    {
      english_name: 'flying ant',
      yiakunte: '',
      image: `${image_fixed_url}/flying_ant.jpg`,
      active: false,
      audio: `${audio_fixed_url}/flying_ant_.wav`
    },
    {
      english_name: 'safari ant',
      yiakunte: '',
      image: `${image_fixed_url}/safari_ant.jpg`,
      active: false,
      audio: `${audio_fixed_url}/safari_ant.wav`
    },
    {
      english_name: 'pigeon',
      yiakunte: '',
      image: `${image_fixed_url}/pigeon.jpg`,
      active: false,
      audio: `${audio_fixed_url}/pigeon.wav`
    },
    {
      english_name: 'buffalo',
      yiakunte: '',
      image: `${image_fixed_url}/buffalo.jpg`,
      active: false,
      audio: `${audio_fixed_url}/buffalo.wav`
    },
    {
      english_name: 'black ant',
      yiakunte: '',
      image: `${image_fixed_url}/black_ant.jpg`,
      active: false,
      audio: `${audio_fixed_url}/black_ant.wav`
    },
    {
      english_name: 'lizard',
      yiakunte: '',
      image: `${image_fixed_url}/lizard.jpg`,
      active: false,
      audio: `${audio_fixed_url}/lizard.wav`
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
      <AudioListPlayerComponent audioFilesArray={animals} />

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

export default AnimalsListComponent;
