import { applyMiddleware, createStore } from "redux"
//  thunk操作异步数据流
import thunk from "redux-thunk"
import reducers from "../reducer"

const middlewares = [
    thunk
] 

/**
 * 创建store
 */
export default createStore(reducers, applyMiddleware(...middlewares))