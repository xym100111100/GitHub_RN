import Types from "../../action/types";
import { ViewPagerAndroidComponent } from "react-native";

const defaultState = {
    theme: 'blue'
}

export default function onAction(state = defaultState, action) {
    // 这里不能修改action
    switch (action.type) {
        case Types.THEME_CHANGE:
            return {
                ...state,
                theme: action.theme
            };
           
        default:
            return state;
    }
}