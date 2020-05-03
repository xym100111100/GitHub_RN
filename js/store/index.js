import { applyMiddleware, createStore } from "redux"
//  thunk操作异步数据流
import thunk from "redux-thunk"
import reducers from "../reducer"

/**
 * 自定义log组件
 * 
 * params: 这个next是执行动作的(必须是这个名字)，如果没有执行这个方法的话组件状态是不会改变的，类似vue钩子函数中的vue,这样就能在执行修改状态前后做一些操作了
 */
const logger = store => next => action => {
    if (typeof action === "function") {
        // console.log("function")
    } else {
        // console.log("dispaching", action)
    }
    const result = next(action);
        // console.log(store.getState()) //这里是修改后的状态
}


const middlewares = [
    logger,
    thunk
]

/**
 * 创建store
 */
export default createStore(reducers, applyMiddleware(...middlewares))