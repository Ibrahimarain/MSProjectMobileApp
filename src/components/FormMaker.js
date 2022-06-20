import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, KeyboardAvoidingView } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import Colors from '../constants/Colors';
import GlobalStyles from '../constants/GlobalStyles';
import PropTypes from "prop-types";
import InputText from './InputText';
import DropDown from './DropDown';
import Button from './Button';
import DatePicker from './DatePicker';
import { WP } from '../constants';
import CheckedBox from './CheckedBox';

export const formTypes = {
    InputText: 1,
    DropDown: 2,
    Heading: 3,
    DatePicker: 4,
    CheckedBox: 4,
    Button: 111
}


const FormMaker = forwardRef(({ imformToParent, formJson , isGrid = false}, ref) => {

    const listRef = useRef()
    const listItemRef = useRef({})

    useImperativeHandle(ref, () => ({


    }));

    const renderItem = ({ item, index }) => {
        item.field_id = index
        switch (item.field_Type) {
            case formTypes.InputText:
                return (
                    <InputText
                        ref={(ref) => listItemRef[index] = ref}
                        item={item}
                        placeholder={item.field_name}
                        style={{ marginBottom: WP(5) }}
                        mask={item.mask}
                        multiline={item.multiline}
                        onChangeText={(value, item) => {
                            imformToParent(value, item)
                        }}
                    />
                );
                break;
            case formTypes.DropDown:
                return (
                    <DropDown
                        ref={(ref) => listItemRef[index] = ref}
                        item={item}
                        display_field={item.display_field}
                        placeholder={item.field_name}
                        get_id={item.get_id}
                        data={item.DropOptions}
                        isMulti={item.isMulti}
                        style={{ marginBottom: WP(5) }}

                    />

                );
                break;
            case formTypes.CheckedBox:
                return (
                    <CheckedBox
                        ref={(ref) => listItemRef[index] = ref}
                        item={item}
                        field_name={item.field_name}
                        style={{ marginBottom: WP(5) }}
                    />
                );
                break;
            case formTypes.DatePicker:
                return (
                    <DatePicker
                        ref={(ref) => listItemRef[index] = ref}
                        item={item}
                        style={{ marginBottom: WP(3), }}
                        placeholder={item.field_name}
                        onSelect={(date, item) => {

                        }}
                    />
                );
                break;

            case formTypes.Heading:
                return (
                    <Text style={{ ...GlobalStyles.Bold(4, "white"), backgroundColor: Colors.secondary, textAlign: "center", paddingVertical: WP(3), ...GlobalStyles.shadow, width: "100%", marginBottom: WP(5) }}>{item.field_name.toUpperCase()}</Text>
                );
                break;
            case formTypes.Button:
                return (
                    <Button
                        onPress={()=>{
                            formJson.forEach((element,index) => {
                                if(element.isMandatory && !listItemRef[index]?.getText()){

                                }else{
                                    console.log(element.field_name, listItemRef[index]?.getText());
                                }
                            });
                        }}
                        title="SAVE"
                        textStyle={{ color: "white" }}
                        style={{ backgroundColor: Colors.secondary, width: "100%", marginBottom: WP(5) }}
                    />
                );
                break;
            default:
                return <View />
                break;
        }
    };


    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={WP(10)}
            >
                <FlatList
                    ref={listRef}
                    numColumns={isGrid ? 2 : undefined}
                    contentContainerStyle={{ paddingTop: WP(5) }}
                    style={{ width: WP(90), alignSelf: "center", flex: 1, backgroundColor: "white" }}
                    bounces={false}
                    keyboardShouldPersistTaps="handled"
                    removeClippedSubviews={false}
                    showsVerticalScrollIndicator={false}
                    data={formJson}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={renderItem}
                />
            </KeyboardAvoidingView>
        </View>
    );
})


FormMaker.propTypes = {
    style: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])

}

export default FormMaker