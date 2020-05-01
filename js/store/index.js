import { applyMiddleware, createStore } from "redux"
//  thunk操作异步数据流
import thunk from "redux-thunk"
import reducers from "../reducer"

/**
 * 自定义log组件
 */
const logger = store => next => action => {
    if (typeof action === "function") {
        console.log("function")
    } else {
        console.log("dispaching", action)
    }
    const result = next(action);
    console.log("nextSate", store.getState())
}


const middlewares = [
    logger,
    thunk
]

/**
 * 创建store
 */
export default createStore(reducers, applyMiddleware(...middlewares))