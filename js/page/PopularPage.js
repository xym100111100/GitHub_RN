import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"
import { createMaterialTopTabNavigator } from "react-navigation-tabs"
import { createAppContainer } from "react-navigation"

export default class PoPularPage extends Component {

    constructor(props) {
        super(props)
        this.tabNames = ["Java", "Android", "ios", "React"]
    }
    _genTabs() {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => <PopularTab {...props} tabLabel={item} />,  // 这种写法是动态设置导航的基础
                navigationOptions: {
                    title: item
                }
            }
        })
        return tabs;
    }

    render() {
        const TabNavigator = createAppContainer(createMaterialTopTabNavigator(
            this._genTabs(),
            {
                tabBarOptions: {
                    tabStyle:style.tabStyle,
                    upperCaseLabel:false,
                    scrollEnabled:true,
                    style:{
                        backgroundColor:'#a67'
                    },
                    inficatorStyle:style.inficatorStyle,
                    labelStyle:style.lableStyle
                }
            }
        ))
        return (
            <View style={style.container} >
                <TabNavigator />
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
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    },
    tabStyle: {
        minWidth:50
    },
    inficatorStyle:{
        height:2,
        backgroundColor:"white",
    },
    lableStyle:{
        fontSize:23,
        marginTop:6,
        marginBottom:6
    }

})