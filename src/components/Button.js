import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Colors, WP } from "../constants";

export default  Button = (props) => {
    var { title, style , textStyle,onPress,disabled, item} = props
    return (
        <TouchableOpacity
        disabled={disabled?disabled:false}
        onPress={()=>onPress&&onPress(item)}
            style={[{padding: WP(3), borderRadius: WP(1),
                justifyContent:"center", alignItems:"center",
                backgroundColor: Colors.secondary
            }, style]}
        >

        <Text style={[{color:"white", fontSize:WP(4)},textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};