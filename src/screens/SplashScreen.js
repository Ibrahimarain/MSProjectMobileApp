import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Animated, Image, View } from 'react-native';
import { Constants, WP } from '../constants';
import Colors from '../constants/Colors';

const SplashScreen = () => {
  const closeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(closeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: false,
    }).start(async () => {
      const loginInfo = await AsyncStorage.getItem('LOGIN_INFO');
      const BASE_URL = await AsyncStorage.getItem('BASE_URL');
      if (BASE_URL) {
        Constants.BASE_URL = BASE_URL;
      }
      console.log('loginInfologinInfo ', JSON.stringify(loginInfo));
      setTimeout(() => {
        if (true) {
          navigation.replace('MainScreen');
        } else {
        }
      }, 200);
    });
  }, []);

  const Ltr = closeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-WP(40), 0],
  });
  const rtl = closeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [WP(60), 0],
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.secondary,
        alignItems: 'center',
      }}>
      <Image
        style={{width: '100%', height: '100%', position: 'absolute'}}
        source={require('../assets/pattern.png')}
      />

      <Animated.Image
        style={{
          width: '90%',
          height: '100%',
          position: 'absolute',
          resizeMode: 'contain',
          transform: [{translateX: Ltr}],
        }}
        source={require('../assets/logo-icon.png')}
      />

      <Animated.Image
        style={{
          width: '90%',
          height: '100%',
          position: 'absolute',
          resizeMode: 'contain',
          transform: [{translateX: rtl}],
        }}
        source={require('../assets/logo-text.png')}
      />
    </View>
  );
};

export default SplashScreen;
