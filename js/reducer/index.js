import {combineReducers} from "redux" 
// 合并Reducer 
import theme from "./theme"
// 合并Reducer 
import popular from "./popular"
const index = combineReducers({
    theme:theme,
    popular:popular
})

export default  index;