import React, { Component, useEffect, useRef, useState } from 'react';
import { FlatList, Image, Text, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { Colors, Constants, GlobalStyles, WP } from '../constants';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import InputText from '../components/InputText';
import Carousel from 'react-native-banner-carousel';
import Button from '../components/Button';


export default ResultScreen = ({route}) => {
    const navigation = useNavigation();
    const {response} = route.params;
    const [images, setImages] = useState(response?.images ? response?.images : [])
    const [selectedItem, setSelectedItem] = useState(0)


    useEffect(() => {

    }, [])


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>

            <View
                style={{ height: "100%", width: "100%", backgroundColor: "white", alignItems: "center", justifyContent: "center", }}
            >

                <View style={{ width: "100%", backgroundColor: "white", height: WP(12), ...GlobalStyles.shadow, alignItems: "center", justifyContent: "center", }}>
                    <Text style={GlobalStyles.semiBold(4.5, "black")}>Results</Text>
                </View>

                <View style={{ height: WP(52) }}>
                    <Carousel
                        autoplay
                        index={0}
                        pageSize={WP(100)}
                    >
                        {images.map((image, index) => <Image
                            style={{ width: WP(100), height: WP(52), resizeMode: "contain" }}
                            source={{uri: Constants.BASE_URL+images}}
                        />)}
                    </Carousel>
                </View>


                <FlatList
                    style={{ width: "90%" }}
                    data={response.features}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={({item, index}) => {
                        let items = Object.keys(item)
                        return (
                            <InputText
                                ref={(ref) => { username = ref }}
                                style={{ width: "100%", marginVertical: WP(2) }}
                                placeholder={items[0]}
                                item={{
                                    field_init_value: item[items[0]]
                                }}
                            />
                        )
                    }}

                />

                <Button
                title="Done"
                style={{width:"90%", marginBottom:WP(5)}}
                onPress={()=>{
                    navigation.goBack()
                }}
                />


            </View>
        </SafeAreaView>
    );
};
