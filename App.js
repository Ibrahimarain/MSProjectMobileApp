/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Dimensions
} from 'react-native';
import DialogHandler from './src/components/DialogHandler';
import Colors from './src/constants/Colors';
import ScreenNavigation from './src/navigations/ScreenNavigation';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.primary }}>
      <SafeAreaView style={{ backgroundColor: Colors.primary, width: WIDTH, height: HEIGHT + StatusBar.currentHeight }}>
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
          <ScreenNavigation />
          <DialogHandler/>
        </View>
      </SafeAreaView>
    </View>
  );
};
export default App;
