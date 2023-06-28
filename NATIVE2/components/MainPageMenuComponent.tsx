import * as WebBrowser from 'expo-web-browser';

import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';

import Constants from 'expo-constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { useTailwind } from 'tailwind-rn';

export default function MainPageMenuComponent({ navigation }) {
  const tailwind = useTailwind();

  return (
    <View
      style={{
        ...tailwind('bg-gray-100'),
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        // margin statusBar height
        paddingTop: Constants.statusBarHeight
      }}
    >
      {/* Header Name */}
      <View
        style={{
          ...tailwind('px-2 mt-4'),
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Text
          style={tailwind(
            'text-3xl tracking-wider  text-center text-purple-900'
          )}
        >
          Yiakunte App
        </Text>

        <Text style={tailwind('text-xl font-bold text-center text-purple-600')}>
          Categories
        </Text>
      </View>

      {/* Menu */}
      <View
        style={{
          ...tailwind('mt-2 flex bg-gray-50'),
          flex: 9,
          flexDirection: 'column',
          width: '100%'
        }}
      >
        {/* row 1 */}
        <View
          style={{
            ...tailwind(' flex  mx-2 py-2'),
            flexDirection: 'row',
            flex: 1
          }}
        >
          <TouchableOpacity
            style={{
              ...tailwind('mx-2 my-2  rounded-xl '),
              flex: 1,
              backgroundColor: '#9764c7',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}
            onPress={() => {
              navigation.navigate('BodyParts');
            }}
          >
            <Ionicons name='eye-outline' size={32} color='white' />

            <Text style={tailwind('text-center text-white ')}>Body Parts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...tailwind('mx-2 my-2  rounded-xl '),
              flex: 1,
              backgroundColor: '#9764c7',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}
            //on press navigate

            onPress={() => {
              navigation.navigate('Animals');
            }}
          >
            <Ionicons name='paw-outline' size={32} color='white' />
            <Text style={tailwind('text-center text-white  ')}>Animals</Text>
          </TouchableOpacity>
        </View>
        {/* row 2 */}
        <View
          style={{
            ...tailwind(' flex  mx-2 py-2'),
            flexDirection: 'row',
            flex: 1
          }}
        >
          <TouchableOpacity
            style={{
              ...tailwind('mx-2 my-2  rounded-xl '),
              flex: 1,
              backgroundColor: '#9764c7',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}
            onPress={() => {
              navigation.navigate('TreesAndEnvironment');
            }}
          >
            <Ionicons name='leaf-outline' size={32} color='white' />

            <Text style={tailwind('text-center text-white ')}>
              Trees & Environment
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              ...tailwind('mx-2 my-2  rounded-xl '),
              flex: 1,
              backgroundColor: '#9764c7',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}
            onPress={() => {
              navigation.navigate('CulturalItems');
            }}
          >
            <Ionicons name='bonfire-outline' size={32} color='white' />

            <Text style={tailwind('text-center text-white ')}>
              Cultural Utility Items
            </Text>
          </TouchableOpacity>
        </View>
        {/* row 3 */}
        <View
          style={{
            ...tailwind(' flex  mx-2 py-2'),
            flexDirection: 'row',
            flex: 1
          }}
        >
          <TouchableOpacity
            style={{
              ...tailwind('mx-2 my-2  rounded-xl '),
              flex: 1,
              backgroundColor: '#9764c7',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}
            onPress={() => {
              navigation.navigate('Greetings');
            }}
          >
            <Ionicons name='library-outline' size={32} color='white' />

            <Text style={tailwind('text-center text-white ')}>Greetings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...tailwind('mx-2 my-2  rounded-xl '),
              flex: 1,
              backgroundColor: '#9764c7',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}
            onPress={() => {
              navigation.navigate('FamilyTree');
            }}
          >
            <Ionicons name='git-merge-outline' size={32} color='white' />

            <Text style={tailwind('text-center text-white ')}>Family Tree</Text>
          </TouchableOpacity>
        </View>
        {/* row 4 */}
        <View
          style={{
            ...tailwind(' flex  mx-2 py-2'),
            flexDirection: 'row',
            flex: 1
          }}
        >
          <TouchableOpacity
            style={{
              ...tailwind('mx-2 my-2  rounded-xl '),
              flex: 1,
              backgroundColor: '#9764c7',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}
            onPress={() => {
              navigation.navigate('Food');
            }}
          >
            <Ionicons name='restaurant-outline' size={32} color='white' />

            <Text style={tailwind('text-center text-white ')}>Food</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...tailwind('mx-2 my-2  rounded-xl '),
              flex: 1,
              backgroundColor: '#9764c7',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}
            onPress={() => {
              navigation.navigate('Birds');
            }}
          >
            <Ionicons name='logo-twitter' size={32} color='white' />

            <Text style={tailwind('text-center text-white ')}>Birds</Text>
          </TouchableOpacity>
        </View>
        {/* row 5 */}
        <View
          style={{
            ...tailwind(' flex  mx-2 py-2'),
            flexDirection: 'row',
            flex: 1
          }}
        >
          <TouchableOpacity
            style={{
              ...tailwind('mx-2 my-2  rounded-xl '),
              flex: 1,
              backgroundColor: '#9764c7',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}
            onPress={() => {
              navigation.navigate('Numbers');
            }}
          >
            <Ionicons name='md-calculator-outline' size={32} color='white' />

            <Text style={tailwind('text-center text-white ')}>Numbers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...tailwind('mx-2 my-2  rounded-xl '),
              flex: 1,
              backgroundColor: '#9764c7',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}
          >
            <Ionicons name='md-man-outline' size={32} color='white' />

            <Text style={tailwind('text-center text-white ')}>
              Chat the Meta-Human
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet'
  );
}
