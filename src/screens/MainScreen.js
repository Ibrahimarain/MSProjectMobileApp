import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
  Image,
  LogBox,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { showLoading, showMessaage } from '../components/DialogHandler';
import { Colors, Constants, WP } from '../constants';
import { apiRequest } from '../constants/Helper';

export default MainScreen = () => {
  const navigation = useNavigation();
  const [baseURL, setBaseURL] = useState(Constants.BASE_URL);
  const [selectedItem, setSelectedItem] = useState(0);

  useEffect(() => {
    LogBox.ignoreLogs([
      'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
    ]);
  }, []);

  const uploadVideo = (imageRes, data) => {
    let list = [
      {
        name: 'file',
        filename: imageRes.path.split('/').pop(),
        type: imageRes.mime,
        data: RNFetchBlob.wrap(data),
      },
    ];
    console.log('Constants.BASE_URL', Constants.BASE_URL);
    RNFetchBlob.fetch(
      'POST',
      Constants.BASE_URL + '/upload_api',
      {
        'Content-Type': 'multipart/form-data',
      },
      list,
    )
      .then(resp => {
        console.log('dsfsdf', resp);
        let res = resp.json();
        navigation.navigate('ResultScreen', {
          response: res,
        });
      })
      .catch(err => {
        alert(err.message);
        console.log('234235235 err', err);
        // ...
      })
      .finally(() => {
        showLoading(false);
      });
  };

  const login = () => {
    if (username.getText() && pass.getText()) {
      apiRequest(
        'POST',
        'api/tokenauth/authenticate',
        {
          usernameOrEmailAddress: username.getText(),
          Password: pass.getText(),
        },
        (isSuccess, result) => {
          if (isSuccess) {
            AsyncStorage.setItem('LOGIN_INFO', JSON.stringify(result));
            navigation.replace('MainScreen');
          }
        },
      );
    } else {
      showMessaage('Username and password should not be empty.');
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={{}}
          onPress={() => {
            ImagePicker.openPicker({
              multiple: false,
              mediaType: 'video',
              compressImageQuality: 0.5,
            }).then(images => {
              showLoading(true);
              uploadVideo(images, images.path.replace('file://', ''));
            });
          }}>
          <Image
            style={{width: WP(52), height: WP(52), resizeMode: 'contain'}}
            source={require('../assets/uploadVideo.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{marginTop: WP(5)}}
          onPress={() => {
            ImagePicker.openCamera({
              multiple: false,
              mediaType: 'video',
              compressImageQuality: 0.5,
            }).then(images => {
              showLoading(true);
              uploadVideo(images, images.path.replace('file://', ''));
            });
          }}>
          <Image
            style={{width: WP(52), height: WP(52), resizeMode: 'contain'}}
            source={require('../assets/recordVideo.png')}
          />
        </TouchableOpacity>

        {/* <TouchableOpacity
                    style={{ padding: WP(5), position: "absolute", top: 0, right: 0 }}
                    onPress={() => {
                        AsyncStorage.clear()
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: "LoginScreen" }],
                            })
                        );
                    }}
                >

                    <Image
                        style={{ width: WP(10), height: WP(10), resizeMode: "contain", tintColor: Colors.red }}
                        source={require("../assets/logout.png")}
                    />

                </TouchableOpacity> */}

        <TextInput
          value={baseURL}
          style={{
            width: '100%',
            position: 'absolute',
            backgroundColor: Colors.lightGray,
            top: 0,
            height: WP(12),
          }}
          onChangeText={text => {
            Constants.BASE_URL = text;
            setBaseURL(text);
            AsyncStorage.setItem('BASE_URL', text);
          }}
        />
      </View>
    </SafeAreaView>
  );
};
