import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import Modal from "react-native-modal";
import { Colors, GlobalStyles, WP } from "../constants";
import Button from "./Button";


export default class MessageDialog extends Component {
    constructor(props) {
        super(props);
        this.params = {}
        this.state = {
            ShowDialog: false
        };
    }
    show = (params) => {
        this.params = params
        this.setState({
            ShowDialog: true,
        }, () => {
            if (this.params?.isSuccess) {
                setTimeout(() => {
                    this.setState({
                        ShowDialog: false,
                    })
                }, 1000);
            }
        });
    };

    render() {
        const color =  this.params?.isSuccess ? Colors.green : Colors.red
        return (
            <>
                <Modal
                    style={{ felx: 1, alignItems: "center", }}
                    isVisible={this.state.ShowDialog}
                    animationIn="bounceIn"
                    animationOut="bounceOut"
                    backdropOpacity={0.5}
                    hideModalContentWhileAnimating={true}
                    useNativeDriver={true}

                >
                    <View style={{ width: "90%", paddingVertical:WP(6), alignItems: "center", borderRadius: WP(5), ...GlobalStyles.topBorder, borderTopColor: color }}>

                        <Image
                            style={{ width:WP(13), height:WP(13), resizeMode:"contain"}}
                            source={ this.params?.isSuccess ?  require('../assets/tick_icon.png') : require('../assets/cross_icon.png') }
                        />

                         <Text style={{...GlobalStyles.Bold(5, color), marginTop:WP(4), width: "70%", textAlign:"center"}}  numberOfLines={2}>{this.params?.title ? this.params?.title : "Alert"}</Text>
                        {this.params?.message && <Text style={{...GlobalStyles.semiBold(3.5, Colors.gray), marginTop:WP(2), width: "70%" ,textAlign:"center"}}
                        numberOfLines={2}
                        >{this.params.message}</Text>}

                        {!this.params?.isSuccess && <Button
                            style={{ width: "70%", marginTop: WP(4) , backgroundColor:color}}
                            title="OK"
                            onPress={() => {
                                this.setState({
                                    ShowDialog: false,
                                });
                            }}
                        />}
                     
                    </View>
                </Modal>
            </>
        );
    }
}
