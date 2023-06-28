/*
 * File: /Users/geoff/Documents/code/Yiakunte/NATIVE2/screens/PDFScreen/PDFScreenComponent.tsx
 * Project: yiakunte
 * Author: Geoffrey Nyaga  at geoffrey@swiftlab.tech
 * -----
 * Last Modified: Wednesday June 28th 2023 11:06:04 am
 * Modified By: Geoffrey Nyaga at geoffrey@swiftlab.tech
 * -----
 * This file should not be copied and/or distributed without the express
 * permission of Swift Lab Limited
 *
 * Copyright (c) 2023 Swift Lab Limited
 * -----
 * HISTORY:
 */

import {
  ActivityIndicator,
  Button,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import React, { Component, useEffect, useState } from 'react';

import WebView from 'react-native-webview';

export default function PDFScreenDetail({ route, navigation }) {
  const { pdfUrl } = route.params;

  //console.log(pdfUrl, 'pdfURL');

  const [isAndroid, setIsAndroid] = useState(true);

  const handleLoadStart = () => {
    console.log('WebView loading started.');
  };

  const handleLoadEnd = () => {
    console.log('WebView loading finished.');
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      setIsAndroid(true);
    } else {
      setIsAndroid(false);
    }
    return () => {};
  }, []);

  const _Loading = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color={'#4CAF50'} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {!isAndroid ? (
        <WebView
          source={{ uri: pdfUrl }}
          style={{
            marginTop: 20,
            width: Dimensions.get('window').width,
            height: 400
          }}
          startInLoadingState={true}
          renderLoading={() => _Loading()}
        />
      ) : (
        // <Text>PDF not loading on IOS</Text>
        <WebView
          source={{ uri: `https://docs.google.com/viewer?url=${pdfUrl}` }}
          allowFileAccess={true}
          originWhitelist={['*']}
          startInLoadingState={true}
          renderLoading={() => _Loading()}
          style={styles.pdf}
          // onLoad={(syntheticEvent) => {
          //   const { nativeEvent } = syntheticEvent;
          //   this.url = nativeEvent.url;
          // }}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
          }}
          onHttpError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn(
              'WebView received error status code: ',
              nativeEvent.statusCode
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25
  },
  pdf: {
    flex: 1,
    // width: 300,
    // marginHorizontal: 30,
    width: Dimensions.get('window').width,

    height: Dimensions.get('window').height
  }
});
