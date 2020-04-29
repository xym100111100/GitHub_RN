import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"
import { createMaterialTopTabNavigator } from "react-navigation-tabs"
import { createAppContainer } from "react-navigation"

export default class PoPularPage extends Component {



    render() {
        const TabNavigator = createAppContainer(createMaterialTopTabNavigator({

        }))
        return (
            <View style={style.container} >
                <Text style={style.welcome} >PoPularPage</Text>
            </View>
        )
    }
}


class PopularTab extends Component {
    render() {
        return (
            <View>
                <Text>事实上</Text>
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