import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import { Colors } from '../constants';

const MyFlatList = ({ onRefresh, data, renderItem }) => {

    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const [footerLoader, setFooterLoader] = useState(false);
    const [pageNo, setPageNo] = useState(1);
    const offset = 20;

    return (
        <FlatList
            style={{flex:1}}
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item, index)=> index.toString()}
            onEndReached={() => {

            }}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[Colors.secondary]}
                />
            }
            listFooterComponent={() =>
                <ActivityIndicator animating={footerLoader}
                    color={Colors.secondary}
                    size="large"
                />}
        />
    );

}

export default MyFlatList;
