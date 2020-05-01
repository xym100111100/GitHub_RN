export default class NavigationUtil {

    static goPage(params, page) {
        const  navigation  = NavigationUtil.navigation;
        if(!navigation){
            console.log("NavigationUtil.navigation can not be null")
        }
        navigation.navigate(page,{
            ...params
        })
    }

    static resetToHomePage(params) {
        const { navigation } = params
        navigation.navigate("Main")
    }
}