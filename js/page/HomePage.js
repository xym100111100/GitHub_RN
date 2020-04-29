import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"
import { createAppContainer } from "react-navigation"
import { createBottomTabNavigator } from "react-navigation-tabs"
import MyPage from "../page/MyPage"
import PopularPage from "../page/PopularPage"
import TrendingPage from "../page/TrendingPage"
import FavoritePage from "../page/FavoritePage"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Entypo from "react-native-vector-icons/Entypo"
import Ionicons from "react-native-vector-icons/Ionicons"

export default class HomePage extends Component {

    _tabNavigation() {
        return createAppContainer(
            createBottomTabNavigator({
                FavoritePage: {
                    screen: FavoritePage,
                    navigationOptions: {
                        tabBarLabel: "收藏",
                        tabBarIcon: ({ tintColor, focused }) => (
                            <MaterialIcons
                                name={"favorite"}
                                size={26}
                                style={{ color: tintColor }}
                            />
                        )
                    }
                },
                TrendingPage: {
                    screen: TrendingPage,
                    navigationOptions: {
                        tabBarLabel: "趋势",
                        tabBarIcon: ({ tintColor, focused }) => (
                            <Ionicons
                                name={"md-trending-up"}
                                size={26}
                                style={{ color: tintColor }}
                            />
                        )
                    }
                },
                PopularPage: {
                    screen: PopularPage,
                    navigationOptions: {
                        tabBarLabel: "最热",
                        tabBarIcon: ({ tintColor, focused }) => (
                            <MaterialIcons
                                name={"whatshot"}
                                size={26}
                                style={{ color: tintColor }}
                            />
                        )
                    }
                },
                MyPage: {
                    screen: MyPage,
                    navigationOptions: {
                        tabBarLabel: "我的",
                        tabBarIcon: ({ tintColor, focused }) => (
                            <Entypo
                                name={"user"}
                                size={26}
                                style={{ color: tintColor }}
                            />
                        )
                    }
                },
            })
        )
    }


    render() {
        const Tab = this._tabNavigation()
        // 这里注意不要直接返回Tab,而是一个标签<Tab />
        return <Tab />;
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