import PropTypes from 'prop-types';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { WP } from '../constants';
import Colors from '../constants/Colors';
import GlobalStyles from '../constants/GlobalStyles';

const InputText = forwardRef(
  (
    {
      onChangeText,
      placeholder,
      style,
      multiline,
      keyboardType,
      secureTextEntry,
      disable,
      mask,
      item,
      hideTopPlaceholder,
    },
    ref,
  ) => {
    const [showError, setShowError] = useState(false);
    const [value, setValue] = useState(
      item?.field_init_value ? item?.field_init_value : '',
    );
    const [showPassword, setShowPassword] = useState(
      secureTextEntry ? secureTextEntry : false,
    );

    useImperativeHandle(ref, () => ({
      getText() {
        return value.trim();
      },
      setText(value) {
        setValue(value);
      },
    }));

    return (
      <View style={style}>
        {!hideTopPlaceholder && (
          <Text
            style={{
              marginLeft: WP(2),
              marginBottom: WP(1),
              ...GlobalStyles.regular(3.5, Colors.primary),
            }}>
            {placeholder ? placeholder : ''}
          </Text>
        )}
        <View
          style={{
            alignItems: 'flex-end',
            backgroundColor: 'white',
            justifyContent: 'center',
            paddingHorizontal: WP(3),
            borderRadius: WP(1),
            borderColor: showError ? Colors.red : Colors.boldBorderColor,
            borderWidth: 2,
          }}>
          <TextInput
            value={value}
            style={[
              {
                width: '100%',
                maxHeight: WP(25),
                color: showError ? Colors.red : 'black',
                backgroundColor: 'white',
                fontSize: WP(3.6),
                paddingVertical: WP(3),
              },
              multiline && {paddingTop: WP(3)},
            ]}
            // mask={mask ? mask : undefined}
            onFocus={() => {
              if (showError) {
                setShowError(false);
              }
            }}
            returnKeyType="done"
            editable={disable ? false : true}
            multiline={multiline}
            keyboardType={
              keyboardType ? keyboardType : mask ? 'number-pad' : 'default'
            }
            placeholder={placeholder ? placeholder : ''}
            placeholderTextColor={Colors.lightGray}
            secureTextEntry={secureTextEntry ? showPassword : false}
            onChangeText={(formatted, extracted) => {
              const text = formatted.trim();
              setValue(text);
              setShowError(false);
              onChangeText && onChangeText(text, item);
            }}
          />

          {secureTextEntry && (
            <TouchableOpacity
              style={{
                height: '100%',
                justifyContent: 'center',
                position: 'absolute',
                paddingRight: WP(4),
              }}
              onPress={() => {
                setShowPassword(p => !p);
              }}>
              <Image
                style={{
                  width: WP(6),
                  height: WP(6),
                  resizeMode: 'contain',
                  tintColor: Colors.secondary,
                }}
                source={
                  !showPassword
                    ? require('../assets/showPass.png')
                    : require('../assets/hidePass.png')
                }
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  },
);

InputText.propTypes = {
  onChangeText: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  placeholder: PropTypes.string,
  keyboardType: PropTypes.string,
};

export default InputText;
