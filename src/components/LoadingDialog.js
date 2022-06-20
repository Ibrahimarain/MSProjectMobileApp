import React, { Component } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import Modal from "react-native-modal";
import { Colors, GlobalStyles, WP } from "../constants";


export default class LoadingDialog extends Component {
    constructor(props) {
        super(props);
        this.done = null
        this.state = {
            ShowDialog: false
        }
    }
    show = (value, done) => {
        this.done = done
        this.setState({
            ShowDialog: value,
        });
    };

    isShowing = () => {
       return this.state.ShowDialog
    };

    render() {
        return (
            <>
                <Modal
                    style={{ felx: 1, alignItems: "center", }}
                    isVisible={this.state.ShowDialog}
                    animationIn="bounceIn"
                    animationOut="bounceOut"
                    backdropOpacity={0.5}
                    onModalHide={()=> {
                        this.done && this.done()
                    }}
                    hideModalContentWhileAnimating={true}
                    useNativeDriver={true}

                >
                    <View style={{ width: "50%", paddingVertical:WP(6), alignItems: "center", borderRadius: WP(5), ...GlobalStyles.topBorder }}>

                        <ActivityIndicator
                            size={'large'}
                            color={Colors.secondary}
                        />

                        <Text style={{ ...GlobalStyles.semiBold(4, "black") , marginTop:WP(3)}}>Please Wait...</Text>


                    </View>
                </Modal>
            </>
        );
    }
}

