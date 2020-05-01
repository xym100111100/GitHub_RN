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
import  DynamicTabNavigator  from "../navigator/DynamicTabNavigator"
export default class HomePage extends Component {


    render() {
        // 这里注意不要直接返回Tab,而是一个标签<Tab />
        return <DynamicTabNavigator />;
    }
}

