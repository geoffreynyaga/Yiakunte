import * as SecureStore from "expo-secure-store";

import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import {
Dimensions,
Image
} from "react-native";
import React, { useEffect } from "react";

import { AuthContext } from "./AuthContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import LoginScreen from "./Login";
import LottieView from "lottie-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "../navigation";
import SignUpScreen from "./SignUp";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTailwind } from "tailwind-rn";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const AuthStack = createNativeStackNavigator();

function SplashScreen() {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <LottieView
        autoPlay
        // ref={animation}
        style={{
          width: 200,
          height: 200,
          backgroundColor: "#fff",
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../assets/lottie/loading.json")}
      />
    </View>
  );
}

function WelcomeScreen({ navigation }) {
  const tailwind = useTailwind();

  return (
    <View style={{flex:1, flexDirection:'column',alignItems:"center", borderWidth:2, borderColor:"#11161a", justifyContent:"space-evenly", backgroundColor:"#f7f7f7"}}>
      <Text style={{...tailwind(
            "text-xl tracking-wider  text-center "
          ),
          color:"#682f1b"
        }
          }>Welcome</Text>

      <Image 
          source={require("../assets/images/welcome.jpeg")}
          style={{
            width: SCREEN_WIDTH *.95,
            height: "50%",
            resizeMode: "contain",
            //borderRadius: 40,
          }}
        />

<Text style={tailwind(
            "text-3xl tracking-widest font-bold  text-center text-purple-900"
          )
          }>Yiakunte App</Text>

          
      <TouchableOpacity style={{
        backgroundColor:"#f3558e",
        paddingHorizontal:40,
        paddingVertical:10,
        borderRadius:20,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around",
        width: 0.5 * SCREEN_WIDTH,
     
        
        
        }} 
        onPress={() => {
          navigation.navigate("SignIn");
        }} >

          <View style={{flex:1}}>

        <Text style={{color:"white", fontSize:18}}>Welcome
          </Text>
          </View>


      <View>

          <Ionicons name="arrow-forward-circle-outline" size={24} color="white" />
      </View>

         

          </TouchableOpacity>

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
            <AuthStack.Screen
              name="Splash"
              component={SplashScreen}
              options={{
                headerShown: false,
              }}
            />
          ) : token == null ? (
            // No token found, user isn't signed in
            <>
             <AuthStack.Screen
                name="WelcomeScreen"
                component={WelcomeScreen}
                options={{
                  //title: "Sign in",
                  headerShown: false,
                  // When logging out, a pop animation feels intuitive
                  // animationTypeForReplace: state.isSignout ? "pop" : "push",
                }}
              />
              <AuthStack.Screen
                name="SignIn"
                component={LoginScreen}
                options={{
                  title: "Sign in",
                  headerShown: false,
                  // When logging out, a pop animation feels intuitive
                  // animationTypeForReplace: state.isSignout ? "pop" : "push",
                }}
              />
              <AuthStack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{
                  title: "Sign up",
                  headerShown: false,
                }}
              />
            </>
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
