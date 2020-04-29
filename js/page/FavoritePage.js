import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"

export default class FavoritePage extends Component {

    render() {
        return (
            <View style={style.container} >
                <Text style={style.welcome} >FavoritePage</Text>
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