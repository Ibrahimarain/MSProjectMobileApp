import React, { Component } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import ConfirmationDailog from "./ConfirmationDailog";
import LoadingDialog from "./LoadingDialog";
import MessageDialog from "./MessageDialog";

let loadingDialog = null
let messageDialog = null
let confirmationDailog = null

export default class DialogHandler extends Component {

    render() {
        return (
            <>
                <LoadingDialog
                    ref={(ref) => {
                        loadingDialog = ref
                    }}
                />

                <MessageDialog
                    ref={(ref) => {
                        messageDialog = ref
                    }}
                />

                <ConfirmationDailog
                    ref={(ref) => {
                        confirmationDailog = ref
                    }}
                />

            </>
        );
    }
}

export const showLoading = (isShow,done) => {
    loadingDialog && loadingDialog.show(isShow,done)
}

export const showMessaage = (message, type, title) => {
        messageDialog && messageDialog.show({
            isSuccess: type,
            message: message,
            title: title
        })
}

export const ShowConfirmation = (props) => {
    confirmationDailog?.isVisible(props);
}
