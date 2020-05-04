import React, { Component } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Button, TextInput, ViewPropTypes } from "react-native"
import { connect } from "react-redux"
import action from "../action"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"

import NavigationBar from "../common/NabigationBar"
const THEME_COLOR = "#678"
class MyPage extends Component {
    getRightButton() {
        return <View style={{ flexDirection: 'row' }} >
            <TouchableOpacity
                onPress={() => { }}
            >
                <View style={{ padding: 5, marginRight: 8 }} >
                    <Feather
                        name={'search'}
                        size={24}
                        style={{ color: 'white' }}
                    />
                </View>
            </TouchableOpacity>
        </View>
    }

    getLeftButton(callBack) {
        return (

            <TouchableOpacity onPress={callBack} >
                <View style={{padding:10,paddingRight:10}} >
                    <Ionicons
                        name={"ios-arrow-back"}
                        size={26}
                        style={{ color: 'white' }}
                    />
                </View>

            </TouchableOpacity>

        )
    }

    render() {
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStytle: 'ligth-content'
        }
        let navigationBar = <NavigationBar
            title={"我的"}
            stateBar={statusBar}
            style={{ backgroundColor: THEME_COLOR }}
            rightButton={this.getRightButton()}
            leftButton={this.getLeftButton()}
        />


        return (
            <View style={style.container} >
                {navigationBar}
                <Text style={style.welcome} >MyPage</Text>
                <Button
                    title={"修改主題黄色"}
                    onPress={
                        () => {

                            return this.props.onThemeChange("yellow")
                        }
                    }
                />

            </View>
        )
    }
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
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