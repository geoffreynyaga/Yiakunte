import { StyleSheet } from "react-native";
import React from "react";
import { Text, View } from "react-native";
import AudioPlayerComponent from "../components/AudioPlayer";
import AudioPlayerExample from "../components/AudioPlayer.test";

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
