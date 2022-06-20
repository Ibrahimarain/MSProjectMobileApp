import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import RNFetchBlob from "rn-fetch-blob";
import { showLoading, showMessaage } from "../components/DialogHandler";
import Constants from "./Constants";

export const apiRequest =  async (method, requestType, dataParam, responseCallback) => {
        if (Constants.IS_INTERNET_CONNETED) {
            "NOTLOAD" in dataParam ? showLoading(false) : showLoading(true)
            const loginInfo = await AsyncStorage.getItem("LOGIN_INFO")
            const token = loginInfo ? JSON.parse(loginInfo).accessToken : ""
            // let reqData = []
            // if (dataParam) {
            //     for (const key in dataParam) {
            //         if(key == "IMAGE_FILE"){
            //             reqData.push({
            //                 name: dataParam[key].name,
            //                 filename: dataParam[key].name + ".jpeg",
            //                 data: dataParam[key].data,
            //                 type: "image/jpeg",
            //             });
            //         }else if (dataParam.hasOwnProperty(key)) {
            //             const element = dataParam[key];
            //             reqData.push({ name: key, data: element+"" })
            //         }
            //     }
            // }
            console.log("url", Constants.BASE_URL+requestType)
            console.log("request Data: ", JSON.stringify(dataParam))
            console.log("token: ", `Bearer ${token}`)
            RNFetchBlob.fetch(
                method,
                Constants.BASE_URL + requestType,
                {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${token}`
                },
                JSON.stringify(dataParam)
            ).then((res) => {
                showLoading(false, () => {
                    // console.log("=====row_responce====>", res)
                    let response = res.json();
                    console.log("request_response "+requestType+" ==> ", JSON.stringify(response.result))
                    if (response.success) {
                        responseCallback(true, response.result);
                    } else {
                        if (response.error.details) {
                            showMessaage(response.error.details, false,response.error.message)
                        }else{
                            showMessaage(response.error.message, false,null)
                        }
                        responseCallback(false, response);
                    }
                })
            }).catch((err) => {
                showLoading(false,()=>{
                    responseCallback(false, null);
                    catError(err.message,"NOTLOAD" in dataParam)
                    console.log("request error: ", err.message)
                })
            });
        } else {
            
        }
    }

    export const catError = (message)=>{
        if(message.includes("JSON Parse error")){
            showMessaage("Invalid response from server",false)
        }else if(message.includes("Unable to resolve host",false) || message.includes("The Internet connection appears to be offline",false)){
            showMessaage("Please check your internet connection & try again",false)
        } else{
            showMessaage(message,false)
        }
    }






