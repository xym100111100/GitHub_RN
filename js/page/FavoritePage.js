import React, { Component } from "react"
import { View, Text, StyleSheet, Button } from "react-native"
import NavigationUtil from "../navigator/NavigationUtil"
import { connect } from "react-redux"
import action from "../action"
import NavigationBar from "../common/NabigationBar"
const THEME_COLOR = "#678"
class FavoritePage extends Component {

    render() {


        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStytle: 'ligth-content'
        }
        let navigationBar = <NavigationBar
            title={"趋势"}
            stateBar={statusBar}
            style={{ backgroundColor: THEME_COLOR }}
        />
        return (
            <View style={style.container} >
                {navigationBar}
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