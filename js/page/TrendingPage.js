import React, { Component } from "react"
import { View, Text, StyleSheet, Button } from "react-native"
import { connect } from "react-redux"
import action from "../action"
class TrendingPage extends Component {

    render() {
        const { navigation } = this.props
        return (
            <View style={style.container} >
                <Text style={style.welcome} >TrendingPage</Text>
                <Button
                    title={"修改主題"}
                    onPress={
                        ()=>this.props.onThemeChange("red")
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


const mapDispachToProps = dispatch => ({
    onThemeChange: theme => dispatch(action.onThemeChange(theme))
})

export default connect (null,mapDispachToProps)(TrendingPage)