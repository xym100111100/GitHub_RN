import React, { Component } from "react"
import { View, Text, StyleSheet, Button, TextInput } from "react-native"
import { connect } from "react-redux"
import action from "../action"

class MyPage extends Component {

    render() {
        const { navigation } = this.props
        return (
            <View style={style.container} >
                <Text style={style.welcome} >MyPage</Text>
                <Button
                    title={"修改主題黄色"}
                    onPress={
                        () => {
                    
                            return this.props.onThemeChange("yellow")
                        }
                    }
                />
                <TextInput />
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




/**
 * 1:注册mapDispachToProps(可以不用这样命名)，这样就能在this.props中拿到onThemeChange(必须这样命名，和action中的对应)进而执行theme中的onThemeChange
 * 2:action.onThemeChange(theme) 点击过去会发现这里其实会返回{ type: Types.THEME_CHANGE, theme: theme } 这样一个对象，进而就可以dispatch一个action就能修改到指定的state 
 * 3:由于创建store的时候已经将reducer放了进去，这里发出dispatch的时候就会被store监听到，store将type于每一个redure的key进行计算后得到新的state后更新state
 * 4：由于页面中的state是订阅了store里面的state的，这时候就会收到state发生改变的消息从而重新渲染页面
 * 
 * @param {*} dispatch 
 */
const mapDispachToProps = dispatch => ({
    onThemeChange: theme => dispatch(action.onThemeChange(theme))

})
const mapStateToProps = state => ({
    theme: state.theme.theme
 })
export default connect(mapStateToProps, mapDispachToProps)(MyPage)