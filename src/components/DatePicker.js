import React, { Component, forwardRef, useImperativeHandle, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, SafeAreaView, } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import Dash from 'react-native-dash';
import ReactNativeModal from 'react-native-modal';
import { Colors, GlobalStyles, WP } from '../constants';
import { convertStamptToDate } from '../constants/Utils';

const DatePicker = forwardRef(({ style, textStyle, placeholder, onSelect, item }, ref) => {

    const [isVisible, setIsVisible] = useState(false)
    const [Selected, setSelected] = useState("")
    const [showError, setShowError] = useState(false)
    const listItem = item
    placeholder = placeholder ? placeholder : "Select"

    useImperativeHandle(ref, () => ({
        getText() {
            return Selected;
        },
        setText(value) {
            setSelected(value)
        },
        error() {
            setShowError(true)
        }
    }));


    return (
        <View style={style}>
            <Text style={{ marginLeft: WP(2), marginBottom: WP(1), ...GlobalStyles.regular(3.5, Colors.primary) }}>{placeholder ? placeholder : ""}</Text>
            <TouchableOpacity
                onPress={() => {
                    setIsVisible(!isVisible)
                    setShowError(false)
                }}
                style={[{
                    elevation: 4, padding: WP(3), borderRadius: WP(2), paddingLeft: WP(6), borderColor: showError ? Colors.red : Colors.boldBorderColor, borderWidth: 2,
                    justifyContent: "center", backgroundColor: "white"
                }]}
            >
               
                <Text style={[{ color: showError ? Colors.red : Selected == "" ? Colors.lightGray : Colors.primary }, textStyle]}>{Selected == "" ? placeholder : Selected}</Text>

                <Image
                    style={{ resizeMode: "contain", width: WP(5), height: WP(5), position: "absolute", right: WP(5), tintColor: showError ? Colors.red : Selected == "" ? Colors.lightGray : "black" }}
                    source={require("../assets/calander.png")}
                />

            </TouchableOpacity>

            <ReactNativeModal
                style={{ margin: 0, justifyContent: 'flex-end', }}
                isVisible={isVisible}
                animationIn="slideInUp"
                useNativeDriver={true}
                hideModalContentWhileAnimating={true}
                animationOut="slideOutDown"
                backdropOpacity={0.3}
                onBackdropPress={() => {
                    setIsVisible(false)
                }}

            >

              
                <View style={{ width: "100%", height: WP(10), backgroundColor: "white", position: "absolute", bottom: 0 }} />

                <SafeAreaView>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{
                            width: WP(100),
                            backgroundColor: "rgba(0,0,0,0)",
                            alignContent: "center", justifyContent: "flex-end"
                        }}
                    >
                        <View style={{ width: "100%", backgroundColor: "white", ...GlobalStyles.topBorder, borderRadius: 0, borderTopStartRadius: WP(10), borderTopEndRadius: WP(10) }}>
                        <View style={{backgroundColor:Colors.moreLightGray, borderTopStartRadius: WP(10), borderTopEndRadius: WP(10), marginBottom:WP(2)}}>
                                <Text
                                    style={{
                                        width: "90%",
                                        alignSelf: "center",
                                        textAlign: "center",
                                        marginVertical: WP(4),
                                        color: "black",
                                        ...GlobalStyles.semiBold(4.5, Colors.primary)
                                    }}
                                >{placeholder} </Text>

                                <Dash style={{ width: "100%", height: 5, opacity: 0.5, alignSelf: "center" }}
                                    dashColor={Colors.lightGray}
                                />
                            </View>
                            <View style={{ backgroundColor: "white" }}>
                                <CalendarPicker
                                initialDate={Selected == "" ? undefined : new Date(Selected)}
                                selectedStartDate={Selected == "" ? undefined : new Date(Selected)}
                    
                                     selectedDayColor={Colors.secondary}
                                     onDateChange={(date) => {
                                        let formatedDate = convertStamptToDate(date);
                                        setIsVisible(false)
                                        setSelected(formatedDate)
                                        onSelect && onSelect(formatedDate, listItem)
                                    }}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                </SafeAreaView>
            </ReactNativeModal>
        </View>
    );
})

export default DatePicker