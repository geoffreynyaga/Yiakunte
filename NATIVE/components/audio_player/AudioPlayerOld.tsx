import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";

import { Audio } from "expo-av";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Sound } from "expo-av/build/Audio";

interface SoundProps {
  audioUrl: string | null;
  onPress?: () => void;
}

export default function AudioPlayerComponent(props: SoundProps) {
  const [sound, setSound] = React.useState<Sound>();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  async function playSound() {
    console.log("Loading Sound");
    console.log(props.audioUrl, "url");

    const { sound } = await Audio.Sound.createAsync(
      { uri: props.audioUrl }
      // require("../../assets/audio/1.wav")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();

    // check if play is finished
    while (true) {
      const { isPlaying } = await sound.getStatusAsync();
      if (!isPlaying) {
        setIsPlaying(false);
        break;
      }
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
          setIsPlaying(false);
        }
      : undefined;
  }, [sound]);

  return (
    <TouchableOpacity
      onPress={() => {
        setIsPlaying(!isPlaying);
        if (isPlaying) {
          sound?.pauseAsync();
        } else {
          playSound();
        }
      }}
    >
      {/* <Button title="Play Sound" onPress={playSound} /> */}
      {isPlaying ? (
        <Ionicons name="ios-pause" size={40} color="#e035cf" />
      ) : (
        <Ionicons name="ios-play" size={40} color="#e035cf" />
      )}
    </TouchableOpacity>
  );
}
