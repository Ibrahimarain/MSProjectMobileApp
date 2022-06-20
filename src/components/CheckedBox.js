import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import GlobalStyles from '../constants/GlobalStyles';
import { WP } from '../constants';
import CheckBox from '@react-native-community/checkbox';

const CheckedBox = forwardRef(({ style, field_name , disable, item}, ref) => {

    const [isChecked, setIsChecked] = useState(item.field_init_value ? item.field_init_value : false);
    
    useImperativeHandle(ref, () => ({
        getText() {
            return isChecked;
        }
    }));

    return (
        <TouchableOpacity 
        activeOpacity={1}
        style={[{ width: WP(100), flexDirection:"row", alignItems:"center"}, style]}
            onPress={() => {
                setIsChecked((p) => !p)
            }}
        >
            <CheckBox
                disabled={true}
                value={isChecked}
                tintColors={{ true: "white", false: disable ? Colors.lightGray : "white" }}
                style={{width:WP(5.5), height:WP(5.5), overflow:"hidden"}}
                boxType={"square"}
                onFillColor={Colors.secondary}
                onCheckColor={"white"}
            />

            <Text style={{ ...GlobalStyles.semiBold(3.8, Colors.primary) , marginLeft:WP(3)}}>{field_name}</Text>

        </TouchableOpacity>
    );
})


export default CheckedBox