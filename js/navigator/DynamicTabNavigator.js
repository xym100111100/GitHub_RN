import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"
import { createAppContainer } from "react-navigation"
import { createBottomTabNavigator, BottomTabBar } from "react-navigation-tabs"
import MyPage from "../page/MyPage"
import PopularPage from "../page/PopularPage"
import TrendingPage from "../page/TrendingPage"
import FavoritePage from "../page/FavoritePage"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Entypo from "react-native-vector-icons/Entypo"
import Ionicons from "react-native-vector-icons/Ionicons"
import { connect } from "react-redux"
const TABS = {
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
}


class DynamicTabNavigator extends React.Component {
   constructor(props) {
      super(props)
      console.disableYellowBox = true  // 去掉黄色警告
   }


   _tabNavigator() {

      if (this.Tabs) {
         return this.Tabs;
      }

      const { MyPage, PopularPage, TrendingPage, FavoritePage } = TABS

      const tabs = { MyPage, PopularPage, TrendingPage, FavoritePage };

      //PopularPage.navigationOptions.tabBarLabel = "最热0" //动态修改tab属性,由此可以知道可以修改很多属性

      return this.Tabs = createAppContainer(createBottomTabNavigator(tabs,
         {
            // 每次切换tabs都会运行这里，就可以顺利地修改主题啦
            tabBarComponent: props => {
               return <TabBarComponent theme={this.props.theme}   {...props} />
            }
         }))
   }

   render() {
      const Tab = this._tabNavigator();
      return (
         <Tab />
      )
   }
}

class TabBarComponent extends React.Component {



   render() {

      return <BottomTabBar
         {...this.props}
         activeTintColor={this.props.theme}
      />
   }
}

const mapStateToProps = state => ({
   theme: state.theme.theme
})

export default connect(mapStateToProps)(DynamicTabNavigator);