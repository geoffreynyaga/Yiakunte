import { StyleSheet } from "react-native";
import React from "react";
import { Text, View } from "react-native";
import AudioPlayerExample from "../components/audio_player/AudioPlayer";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <AudioPlayerExample />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
