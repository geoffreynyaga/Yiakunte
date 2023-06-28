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

function FamilyTreeListComponent() {
  const REACT_APP_BASE_S3_URL =
    'https://yiakunte.s3.eu-central-1.amazonaws.com/media/';

  const s3_base_url = REACT_APP_BASE_S3_URL;
  const images_app_folder = 'images/family_tree';
  const audio_app_folder = 'audio/family';

  const image_fixed_url = s3_base_url + images_app_folder;
  const audio_fixed_url = s3_base_url + audio_app_folder;

  const family_tree = [
    {
      english_name: 'sister',
      yiakunte: '',
      image: `${image_fixed_url}/`,
      audio: `${audio_fixed_url}/sister.wav`
    },
    {
      english_name: 'friend',
      yiakunte: '',
      image: `${image_fixed_url}/`,
      audio: `${audio_fixed_url}/friend.wav`
    },
    {
      english_name: 'children',
      yiakunte: '',
      image: `${image_fixed_url}/`,
      audio: `${audio_fixed_url}/children.wav`
    },
    {
      english_name: 'mother',
      yiakunte: '',
      image: `${image_fixed_url}/`,
      audio: `${audio_fixed_url}/mother.wav`
    },
    {
      english_name: 'girl',
      yiakunte: '',
      image: `${image_fixed_url}/girl.png`,
      audio: `${audio_fixed_url}/girl.wav`
    },
    {
      english_name: 'enemy',
      yiakunte: '',
      image: `${image_fixed_url}/`,
      audio: `${audio_fixed_url}/enemy.wav`
    },
    {
      english_name: 'aunt',
      yiakunte: '',
      image: `${image_fixed_url}/`,
      audio: `${audio_fixed_url}/aunt.wav`
    },
    {
      english_name: 'boyfriend',
      yiakunte: '',
      image: `${image_fixed_url}/`,
      audio: `${audio_fixed_url}/boyfriend.wav`
    },
    {
      english_name: 'uncle',
      yiakunte: '',
      image: `${image_fixed_url}/`,
      audio: `${audio_fixed_url}/uncle.wav`
    },
    {
      english_name: 'grand_mother',
      yiakunte: '',
      image: `${image_fixed_url}/`,
      audio: `${audio_fixed_url}/grand_mother.wav`
    },
    {
      english_name: 'gentleman',
      yiakunte: '',
      image: `${image_fixed_url}/`,
      audio: `${audio_fixed_url}/gentleman.wav`
    },
    {
      english_name: 'girlfriend',
      yiakunte: '',
      image: `${image_fixed_url}/`,
      audio: `${audio_fixed_url}/girlfriend.wav`
    },
    {
      english_name: 'groups',
      yiakunte: '',
      image: `${image_fixed_url}/group.jpg`,
      audio: `${audio_fixed_url}/groups.wav`
    },
    {
      english_name: 'father',
      yiakunte: '',
      image: `${image_fixed_url}/man_father.jpg`,
      audio: `${audio_fixed_url}/father.wav`
    },
    {
      english_name: 'cousins',
      yiakunte: '',
      image: `${image_fixed_url}/`,
      audio: `${audio_fixed_url}/cousins.wav`
    },
    {
      english_name: 'boy',
      yiakunte: '',
      image: `${image_fixed_url}/boy.jpg`,
      audio: `${audio_fixed_url}/boy.wav`
    },
    {
      english_name: 'grandfather',
      yiakunte: '',
      image: `${image_fixed_url}/grand_father.jpg`,
      audio: `${audio_fixed_url}/grandfather.wav`
    },
    {
      english_name: 'homestead',
      yiakunte: '',
      image: `${image_fixed_url}/`,
      audio: `${audio_fixed_url}/homestead.wav`
    },
    {
      english_name: 'worrior',
      yiakunte: '',
      image: `${image_fixed_url}/worrier.jpg`,
      audio: `${audio_fixed_url}/worrior.wav`
    },
    {
      english_name: 'human_being',
      yiakunte: '',
      image: `${image_fixed_url}/`,
      audio: `${audio_fixed_url}/human_being.wav`
    },
    {
      english_name: 'lady',
      yiakunte: '',
      image: `${image_fixed_url}/lady.jpg`,
      audio: `${audio_fixed_url}/lady.wav`
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
      <AudioListPlayerComponent audioFilesArray={family_tree} />
    </SafeAreaView>
  );
}

export default FamilyTreeListComponent;
