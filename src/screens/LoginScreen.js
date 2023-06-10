import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Image, View } from 'react-native';
import Button from '../components/Button';
import { showMessaage } from '../components/DialogHandler';
import InputText from '../components/InputText';
import { WP } from '../constants';
import Colors from '../constants/Colors';
import GlobalStyles from '../constants/GlobalStyles';

const LoginScreen = () => {
  const [authType, setAuthType] = useState(false);
  const navigation = useNavigation();
  let username = useRef();
  let pass = useRef();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        style={{position: 'absolute'}}
        source={require('../assets/pattern.png')}
      />

      <View
        style={{
          width: '90%',
          alignItems: 'center',
          backgroundColor: 'white',
          paddingBottom: WP(3),
          borderColor: Colors.boldBorderColor,
          ...GlobalStyles.shadow,
          borderWidth: 1,
          borderTopColor: Colors.secondary,
          borderTopWidth: 4,
          borderRadius: WP(3),
        }}>
        <Image
          style={{width: '80%', height: WP(30), resizeMode: 'contain'}}
          source={require('../assets/logo.png')}
        />

        <InputText
          ref={ref => {
            username = ref;
          }}
          style={{width: '85%'}}
          hideTopPlaceholder={true}
          placeholder="Username"
        />

        <InputText
          ref={ref => {
            pass = ref;
          }}
          style={{width: '85%', marginTop: WP(4)}}
          hideTopPlaceholder={true}
          placeholder="Password"
          secureTextEntry={true}
        />

        <Button
          style={{width: '85%', marginVertical: WP(4)}}
          title="Login"
          onPress={() => {
            if (
              (username.getText() == 'Admin' ||
                username.getText() == 'admin') &&
              pass.getText() == '123456'
            ) {
              AsyncStorage.setItem('LOGIN_INFO', '1');
              navigation.replace('MainScreen');
            } else {
              showMessaage('Invalid Username and password.');
            }
          }}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
