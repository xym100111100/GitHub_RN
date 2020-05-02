import React, { Component } from "react"
import { View, Text, StyleSheet, Button } from "react-native"
import NavigationUtil from "../navigator/NavigationUtil"
import { connect } from "react-redux"
import action from "../action"
class FavoritePage extends Component {

    render() {
        const { navigation } = this.props
        return (
            <View style={style.container} >
                <Text style={style.welcome} onPress={() => {
                    NavigationUtil.goPage({}, "DetailPage")
                }}  >跳转到详情页</Text>
                <Button
                    title={"修改主題"}
                    onPress={
                        () => this.props.onThemeChange("green")

                    }
                />
                <Text style={style.welcome} onPress={() => {
                    NavigationUtil.goPage({}, "FatchDemoPage")
                }}  >跳转到fatch</Text>
                <Text style={style.welcome} onPress={() => {
                    NavigationUtil.goPage({}, "AsyncStorageDemoPage")
                }}  >跳转到AsyncStorage</Text>
                <Text style={style.welcome} onPress={() => {
                    NavigationUtil.goPage({}, "DataStoreDemoPage")
                }}  >跳转到离线缓存</Text>
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


const mapDispachToProps = dispatch => ({
    onThemeChange: theme => dispatch(action.onThemeChange(theme))
})

export default connect(null, mapDispachToProps)(FavoritePage)