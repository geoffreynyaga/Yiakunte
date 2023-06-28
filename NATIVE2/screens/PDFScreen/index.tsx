/*
 * File: /Users/geoff/Documents/code/Yiakunte/NATIVE2/screens/PDFScreen/index.tsx
 * Project: yiakunte
 * Author: Geoffrey Nyaga  at geoffrey@swiftlab.tech
 * -----
 * Last Modified: Monday June 26th 2023 9:13:35 pm
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
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useState } from 'react';

import { Ionicons } from '@expo/vector-icons';

export default function PDFScreen({ navigation }) {
  const [pdfs, setPdfs] = useState([
    {
      book_name: 'Yiaku Dictionary',
      pdfUrl:
        'https://yiakunte.s3.eu-central-1.amazonaws.com/media/pdf/booklet.pdf'
    },
    {
      book_name: 'Yiaku Pictorial',
      pdfUrl:
        'https://yiakunte.s3.eu-central-1.amazonaws.com/media/pdf/pictorial.pdf'
    },
    {
      book_name: 'Yiaku Bio-Cultural Protocol',
      pdfUrl:
        'https://yiakunte.s3.eu-central-1.amazonaws.com/media/pdf/yiaku.pdf'
    }
  ]);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
      }}
    >
      {pdfs ? (
        pdfs.map((pdf, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                // flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#c5e3f6',
                height: 70,
                paddingHorizontal: 30,
                borderRadius: 10,
                marginBottom: 20,
                width: Dimensions.get('window').width * 0.7
              }}
              onPress={() => {
                navigation.navigate('PDFDetail', {
                  pdfUrl: pdf.pdfUrl
                });
              }}
            >
              <Ionicons name='book-outline' size={32} color='#303a52' />

              <Text style={{ marginLeft: 20, fontStyle: 'italic' }}>
                {pdf.book_name}
              </Text>
            </TouchableOpacity>
          );
        })
      ) : (
        <Text>No PDF</Text>
      )}
      {/* */}
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
    marginHorizontal: 30,
    width: Dimensions.get('window').width,

    height: Dimensions.get('window').height * 0.5
  }
});
