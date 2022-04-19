import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import * as React from "react";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <TailwindProvider utilities={utilities}>
          <Navigation />
          <StatusBar />
        </TailwindProvider>
      </SafeAreaProvider>
    );
  }
}
