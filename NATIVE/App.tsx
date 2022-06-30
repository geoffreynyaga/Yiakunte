import * as React from "react";

import { QueryClient, QueryClientProvider } from "react-query";

import AuthFlow from "./auth";
// import Navigation from "./navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { TailwindProvider } from "tailwind-rn";
import useCachedResources from "./hooks/useCachedResources";
import utilities from "./tailwind.json";

// Create a client

const queryClient = new QueryClient();

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <TailwindProvider utilities={utilities}>
            <AuthFlow navigation={undefined} />
            <StatusBar />
          </TailwindProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    );
  }
}
