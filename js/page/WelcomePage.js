import React, { Component } from "react"
import { StyleSheet, View, Text } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons'
import NavigationUtil from "../navigator/NavigationUtil"
export default class WelcomePage extends Component {
    componentDidMount() {
        this.timer = setTimeout(() => {
            NavigationUtil.resetToHomePage(this.props)
            // 跳转到首页
        }, 2000);
    }

    componentWillMount() {
        // 页面销毁的时候清空定时器，与启动定时器成对出现！
        this.timer && clearTimeout(this.timer)
    }

    render() {

        return (
            <View style={style.container} >
                <Text>欢迎
                    <Ionicons
                        name={'ios-home'}
                        size={26}
                        style={{ color: 'red' }}
                    />页面</Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    }
})