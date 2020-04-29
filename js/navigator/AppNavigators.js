import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import WelcomePage from "../page/WelcomePage"
import HomePage from "../page/HomePage"

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