import {combineReducers} from "redux" 
// 合并Reducer 
import theme from "./theme"
const index = combineReducers({
    theme:theme
})

export default  index;