import React , {useState} from "react";
import { Text, View ,Switch, Image} from "react-native";
import { Colors, GlobalStyles, WP } from "../constants";

export default  SwitchToggel = (props) => {
    let { style, icon, title, disabled, item , onValueChange} = props
    const [isEnabled, setIsEnabled] = useState(false)

    const toggleChanged = (value) => {
        setIsEnabled(value)
        onValueChange(value)
    }

    return (
        <View
        disabled={disabled?disabled:false}
       
            style={[{width:"90%", padding: WP(3), borderRadius: WP(1),
                 alignItems:"center",
                flexDirection:"row",
            }, style]}
        >

            <Image
            style={{width:WP(8), height:WP(8), resizeMode:"contain", tintColor:Colors.primary}}
            source={icon}
            />

            <Text style={{...GlobalStyles.regular(3.5), marginLeft:WP(3), flex:1}}>{title}</Text>

            <Switch
                trackColor={{ false: Colors.lightGray, true: Colors.primary }}
                thumbColor={"#f4f3f4"}
                ios_backgroundColor={Colors.lightGray}
                onValueChange={toggleChanged}
                value={isEnabled}
            />
        </View>
    );
};