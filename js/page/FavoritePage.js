import React, { Component } from "react"
import { View, Text, StyleSheet, Button } from "react-native"
import NavigationUtil from "../navigator/NavigationUtil"

export default class FavoritePage extends Component {

    render() {
        const { navigation } = this.props
        return (
            <View style={style.container} >
                <Text style={style.welcome} onPress={() => {
                    NavigationUtil.goPage({},"DetailPage")
                }}  >跳转到详情页</Text>
                <Button
                    title={"修改主題"}
                    onPress={
                        () => navigation.setParams({
                            theme: {
                                tintColor: "orange",
                                updateTime: new Date().getTime()
                            }
                        })
                    }
                />

            </View>
        )
    }
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    },

})