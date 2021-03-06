import {combineReducers} from "redux" 
// 合并Reducer 
import theme from "./theme"
// 合并Reducer 
import popular from "./popular"
import trending from "./trending"
import favorite from "./favorite"
import language from "./language"

/**
 * 这里的popular|theme就是引入文件中返回的对象，页面就是订阅这个值
 */
const index = combineReducers({
    theme:theme,
    popular:popular,
    trending:trending,
    favorite:favorite,
    language:language
})

export default  index;