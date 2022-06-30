import * as SecureStore from "expo-secure-store";

import { Button, Text, TextInput, View } from "react-native";
import React, { useEffect } from "react";

import { AuthContext } from "./AuthContext";
import LoginScreen from "./Login";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "../navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AuthStack = createNativeStackNavigator();

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

function HomeScreen() {
  return (
    <View>
      <Text>Signed in!</Text>
      <Button title="Sign out" />
    </View>
  );
}

export default function AuthFlow({ navigation }) {
  const [token, setToken] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    async function getToken() {
      let result = await SecureStore.getItemAsync("userToken");
      if (result) {
        // alert("🔐 Here's your value 🔐 \n" + result);
        setToken(result);
        setIsLoading(false);
      } else {
        // alert("No values stored under that key.");
        setIsLoading(false);
      }
    }

    getToken();
    // if (token) {
    //   navigation.navigate("Home");
    // }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <NavigationContainer>
        <AuthStack.Navigator>
          {isLoading ? (
            // We haven't finished checking for the token yet
            <AuthStack.Screen name="Splash" component={SplashScreen} />
          ) : token == null ? (
            // No token found, user isn't signed in
            <AuthStack.Screen
              name="SignIn"
              component={LoginScreen}
              options={{
                title: "Sign in",
                // When logging out, a pop animation feels intuitive
                // animationTypeForReplace: state.isSignout ? "pop" : "push",
              }}
            />
          ) : (
            // User is signed in
            <AuthStack.Screen
              name="Home2"
              component={RootNavigator}
              options={{
                title: "Home",
                headerShown: false,
                // When logging out, a pop animation feels intuitive
                // animationTypeForReplace: state.isSignout ? "pop" : "push",
              }}
            />
          )}
        </AuthStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
