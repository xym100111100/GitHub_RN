import Types from "../../action/types";

const defaultState = {

}

/**
 * 这里的actin就是dispatch过来的值
 */
export default function onAction(state = defaultState, action) {

    // 这里不能修改state
    switch (action.type) {
        case Types.POPULAR_REFRESH_SUCCESS:   //下拉刷新成功
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    items: action.items, // 原始数据
                    projectModes: action.projectModes, // 此次要展示的数据
                    isLoading: false,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex
                }
            };
        case Types.POPULAR_REFRESH:  // 下拉刷新
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: true
                }
            }
        case Types.POPULAR_REFRESH_FAIL: // 下拉刷新失败
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false
                }
            }
        case Types.POPULAR_LOAD_MPRE_SUCCESS: // 上拉加载更多
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModes: action.projectModes,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex
                }
            }
        case Types.POPULAR_LOAD_MPRE_FALL: //上拉加载失败
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    hideLoadingMore: true,
                    pageIndex: action.pageIndex
                }
            }
        default:
            return state;
    }
}