import React, { Component } from "react"
import { View, Text, StyleSheet,Button } from "react-native"

export default class MyPage extends Component {

    render() {
        const {navigation} = this.props
        return (
            <View style={style.container} >
                <Text style={style.welcome} >MyPage</Text>
                <Button
                    title={"修改主題"}
                    onPress={
                        () => navigation.setParams({
                            theme: {
                                tintColor: "blue",
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