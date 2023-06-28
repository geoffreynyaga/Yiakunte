import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { Audio } from 'expo-av';
import Ionicons from '@expo/vector-icons/Ionicons';

const AudioListPlayerComponent = ({ audioFilesArray }) => {
  const [audioFiles, setAudioFiles] = useState(audioFilesArray);
  const [soundObjects, setSoundObjects] = useState([]);

  useEffect(() => {
    //fetchAudioFiles();
    return () => {
      // Clean up resources
      if (soundObjects) {
        soundObjects.forEach((sound) => {
          if (sound !== undefined) {
            sound.sound.unloadAsync();
          }
        });
      }
    };
  }, []);

  // const fetchAudioFiles = async () => {
  //   try {
  //     const response = await fetch('https://example.com/audio-files.json');
  //     const data = await response.json();
  //     setAudioFiles(data.audioFiles);
  //   } catch (error) {
  //     console.error('Error fetching audio files:', error);
  //   }
  // };

  const handlePlayPause = async (audioFile) => {
    try {
      const sound = new Audio.Sound();
      await sound.loadAsync({ uri: audioFile.audio });

      const isPlaying = soundObjects.some((obj) => obj.isPlaying);

      if (isPlaying) {
        // Pause currently playing audio
        soundObjects.forEach((obj) => {
          if (obj.isPlaying) {
            obj.sound.pauseAsync();
            obj.isPlaying = false;
          }
        });
      } else {
        // Start playing the selected audio
        await sound.playAsync();
        soundObjects.push({ sound, isPlaying: true });
      }

      setSoundObjects([...soundObjects]);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        width: '100%',
        // height: 40,
        borderWidth: 1,
        borderColor: item.active ? 'red' : '#5d3891',
        marginVertical: 4,
        // paddingVertical: 4,
        borderRadius: 12,
        backgroundColor: '#f5f5f5'
      }}
      onPress={() => {
        handlePlayPause(item);
        item.active = !item.active;
      }}
    >
      <View
        style={{
          // padding: 10,
          paddingVertical: item.image ? 0 : 20,
          // paddingHorizontal: 20,
          paddingLeft: item.image ? 0 : 10,
          paddingRight: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 10
              // borderWidth: 1
              // borderColor: '#9c1de7'
            }}
            resizeMode='cover'
          />
        ) : null}

        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#071e3d' }}>
          {item.english_name}
        </Text>
        {/* <Text>{item.artist}</Text> */}
        {/* <Text>{item.duration}</Text> */}
        {item.active ? (
          <Ionicons name='pause' size={32} color='red' />
        ) : (
          <Ionicons name='play' size={32} color='#5d3891' />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        paddingHorizontal: 8
      }}
    >
      {/* <Text>{JSON.stringify(soundObjects)}</Text> */}
      <FlatList
        data={audioFilesArray}
        renderItem={renderItem}
        keyExtractor={(item) => item.english_name}
      />
    </View>
  );
};

export default AudioListPlayerComponent;
