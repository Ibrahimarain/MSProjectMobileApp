import React, { Component, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, SafeAreaView, } from 'react-native';
import Dash from 'react-native-dash';
import { FlatList } from 'react-native-gesture-handler';
import ReactNativeModal from 'react-native-modal';
import { Colors, GlobalStyles, WP } from '../constants';

const InputText = forwardRef(({ data, style, textStyle, placeholder, onSelect, item, isMulti , display_field, get_id}, ref) => {

    const [isVisible, setIsVisible] = useState(false)
    const [Selected, setSelected] = useState(-1)
    const [MultiSelected, setMultiSelected] = useState([])
    const [showError, setShowError] = useState(false)
    const [SearchText, setSearchText] = useState("")
    const listItem = item
    placeholder = placeholder ? placeholder : "Select"

    useImperativeHandle(ref, () => ({
        getText() {
            if(isMulti){
                return get_id ? data[Selected][get_id] : data[Selected];
            }else{
                return getMultiID();
            }
           
        },
        error() {
            setShowError(true)
        }
    }));

    useEffect(()=>{
        setText()
    },[])

    const setText = () => {
        if (item.field_init_value) {
            console.log("sdfsdfsd",data);
            if(isMulti){
                let multitext = []
                item.field_init_value.forEach(element => {
                    multitext.push(data.findIndex(x => {
                        const text = display_field ? x[display_field] : x
                        const id = get_id ? x[get_id] : x
                        return text == element || id == element
                    }))
                });
                setMultiSelected(multitext)
            }else{
                setSelected(data.findIndex(x => {
                    const text = display_field ? x[display_field] : x
                    const id = get_id ? x[get_id] : x
                    return text == item.field_init_value || id == item.field_init_value
                }))
            }
            
        }
    }

    const getMultiText = () => {
        let text = []
        MultiSelected.forEach(element => {
            element != -1 && text.push(display_field ? data[element][display_field] : data[element])
        });
        return text.toLocaleString()
    }

    const getMultiID = () => {
        let ID = []
        MultiSelected.forEach(element => {
            ID.push(get_id ? data[element][get_id] : data[element])
        });
        return ID
    }

    return (
        <View style={style}>
            <Text style={{ marginLeft: WP(2), marginBottom: WP(1), ...GlobalStyles.regular(3.5, Colors.primary) }}>{placeholder ? placeholder : ""}</Text>
            <TouchableOpacity
                onPress={() => {
                    setIsVisible(!isVisible)
                    setShowError(false)
                    setSearchText(false)
                }}
                style={[{
                    elevation: 4, padding: WP(3), borderRadius: WP(2), paddingLeft: WP(6), borderColor: showError ? Colors.red : Colors.boldBorderColor, borderWidth: 2,
                    justifyContent: "center", backgroundColor: "white"
                }]}
            >
                {isMulti ?
                    <Text style={[{ color: showError ? Colors.red : data.length == 0 || MultiSelected.length == 0 ? Colors.lightGray : Colors.primary }, textStyle]}>{data.length == 0 || MultiSelected.length == 0 ? placeholder : getMultiText()}</Text>
                    :
                    <Text style={[{ color: showError ? Colors.red : data.length == 0 || Selected == -1 ? Colors.lightGray : Colors.primary }, textStyle]}>{data.length == 0 || Selected == -1 ? placeholder : display_field ? data[Selected][display_field] : data[Selected]}</Text>
                }


                <Image
                    style={{ width: "100%", resizeMode: "contain", width: WP(3), height: WP(3), position: "absolute", right: WP(5), tintColor: showError ? Colors.red : data.length == 0 || Selected == -1 ? Colors.lightGray : "black", transform: [{ rotate: '90deg' }] }}
                    source={require("../assets/arrow.png")}
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
                        <View style={{ width: "100%", backgroundColor: "white",  ...GlobalStyles.topBorder, borderRadius: 0, borderTopStartRadius: WP(10), borderTopEndRadius: WP(10) }}>
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
                            {data.length > 8 && <TextInput
                                style={{
                                    width: "90%",
                                    padding: 0, margin: 0, paddingVertical: WP(3),
                                    alignSelf: "center", borderRadius: WP(2),
                                    backgroundColor: Colors.moreLightGray, color: Colors.gray, paddingHorizontal: WP(2)
                                }}
                                placeholder="Search"
                                placeholderTextColor={Colors.gray}
                                onChangeText={(text) => {
                                    setSearchText(text)
                                }}
                            /> }
                            <FlatList
                                style={{ height: data.length < 8 ? null : WP(100) }}
                                data={data}
                                ListEmptyComponent={() => <Text style={{ alignSelf: "center", paddingVertical: WP(5) }}>No Item Found</Text>}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => {
                                    const text = display_field ? item[display_field] : item
                                    if (SearchText == "" || text.toString().includes(SearchText)) {
                                        return (
                                            <>
                                            <TouchableOpacity
                                                style={{
                                                    flexDirection: "row",
                                                    justifyContent: "flex-start",
                                                    padding: WP(3)
                                                }}
                                                onPress={() => {
                                                    if (isMulti) {
                                                        let cureentIndex = MultiSelected.findIndex((i)=> i == index)
                                                        if(cureentIndex != -1){
                                                            let mmm = [...MultiSelected]
                                                            mmm.splice(cureentIndex,1)
                                                            setMultiSelected(mmm)
                                                        }else{
                                                            setMultiSelected((p) => [...p, index])
                                                        }
                                                    } else {
                                                        setIsVisible(false)
                                                        setSelected(index)
                                                        onSelect && onSelect(item, listItem)
                                                    }
                                                }}
                                            >
                                                {isMulti ?
                                                    <Image
                                                        style={{ width: WP(9), resizeMode: "contain", height: WP(5), tintColor: MultiSelected.includes(index) ? Colors.secondary : "white" }}
                                                        source={require("../assets/tick_icon.png")}
                                                    />
                                                    : <Image
                                                        style={{ width: WP(9), resizeMode: "contain", height: WP(5), tintColor: Selected == index ? Colors.secondary : "white" }}
                                                        source={require("../assets/tick_icon.png")}
                                                    />}
                                                <Text
                                                    style={{
                                                        textAlign: "center",
                                                        color: Colors.primary,
                                                        fontSize: WP(3.8), alignSelf: "center"
                                                    }}
                                                >{text} </Text>
                                            </TouchableOpacity>
                                            <Dash style={{ width: "85%", height: 1, opacity: 0.5, alignSelf: "center" }}
                                    dashColor={Colors.boldBorderColor} />
                                            </>
                                        )
                                    }
                                }
                                }
                            />
                        </View>
                    </TouchableOpacity>
                </SafeAreaView>
            </ReactNativeModal>
        </View>
    );
})

export default InputText