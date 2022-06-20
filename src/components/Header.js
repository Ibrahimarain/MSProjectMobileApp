import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import Colors from '../constants/Colors';
import GlobalStyles from '../constants/GlobalStyles';
import PropTypes from "prop-types";
import { WP } from '../constants';

const Header = forwardRef(({ style, navigation ,title}, ref) => {

    const [showError, setShowError] = useState(false)


    useImperativeHandle(ref, () => ({


    }));

    return (
        <View style={[{ width: WP(100), height: WP(12), justifyContent: "center", borderBottomColor: Colors.boldBorderColor, borderBottomWidth: 1, backgroundColor:"white" }, style]}>

            <Text
                style={{ ...GlobalStyles.Bold(4, Colors.primary), alignSelf: "center" }}>{title}</Text>

            {navigation && navigation.canGoBack() && <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ width: WP(12), height: WP(12), position: "absolute", alignItems: "center", justifyContent: "center", left: WP(2) }}
            >
                <Image
                    style={{ width: WP(5), height: WP(5), resizeMode: "contain", tintColor: Colors.gray, transform: [{ rotate: "180deg" }] }}
                    source={require("../assets/arrow.png")}
                />
            </TouchableOpacity>}

        </View>
    );
})


export default Header