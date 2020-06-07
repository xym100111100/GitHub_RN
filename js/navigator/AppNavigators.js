import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import WelcomePage from "../page/WelcomePage"
import HomePage from "../page/HomePage"
import DetailPage from "../page/DetailPage"
import WebViewPage from "../page/WebViewPage"

import FatchDemoPage from "../page/FatchDemoPage"
import AsyncStorageDemoPage from "../page/AsyncStorageDemoPage"
import DataStoreDemoPage from "../page/DataStoreDemoPage"


const InitNavigation = createStackNavigator(
    {
        WelcomePage: {
            screen: WelcomePage,
            navigationOptions: {
                headerShown: false
            }
        }

    }
)

const MainNavigation = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            headerShown: false
        }
    },
    DetailPage: {
        screen: DetailPage,
        navigationOptions: {
            headerShown: false
        }

    },
    WebViewPage: {
        screen: WebViewPage,
        navigationOptions: {
            headerShown: false
        }

    },
    FatchDemoPage: {
        screen: FatchDemoPage
    },
    AsyncStorageDemoPage: {
        screen: AsyncStorageDemoPage
    },
    DataStoreDemoPage: {
        screen: DataStoreDemoPage
    }
})




// 使用createSwitchNavigator跳转这样返回的时候就不能返回到欢迎页面了
export default createAppContainer(createSwitchNavigator(
    {
        Init: InitNavigation,
        Main: MainNavigation
    },
    {
        navigationOptions: {
            headerShown: false
        }
    }
))