import Types from "../types"
import DataStore, {FLAG_STOEAGE} from "../../expand/dao/DataStore"
import {headleData} from "../ActionUtil"

export function onLoadTrendingData(storeName, url, pageSize) {

   return dispatch => {
      dispatch({
         type: Types.TRENDING_REFRESH,
         storeName: storeName
      })
      let dataStore = new DataStore()
      dataStore.fetchData(url,FLAG_STOEAGE.flag_trending) // 异步action与数据流
         .then(data => {
            headleData(Types.TRENDING_REFRESH_SUCCESS,dispatch, storeName, data, pageSize)
         }).catch(error => {
            console.log(error)
            dispatch({
               type: Types.POPULAR_REFRESH_FAIL,
               storeName,
               error
            })
         })
   }
}

/**
 * 
 * @param {*} storeName 
 * @param {*} pageIndex 
 * @param {*} pageSize 
 * @param {原始数据} dataArray  
 * @param {*} callBack 
 */
export function onLoadMoreTrending(storeName, pageIndex, pageSize, dataArray = [], callBack) {
   return dispatch => {
      setTimeout(() => { // 模拟网络请求
         if ((pageIndex - 1) * pageSize >= dataArray.length) { // 已经加载完
            if (typeof callBack === 'function') {
               callBack("no more")
            }
            dispatch({
               type: Types.TRENDING_LOAD_MORE_FAIL,
               error: 'no more',
               storeName: storeName,
               pageIndex: --pageIndex,
               projectModes: dataArray
            })
         } else {
            // 这里的写法是最多只有三十条，加载的时候根据条件slice不同数量的数据
            let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageIndex * pageSize
            console.log("max:"+max)
            dispatch({
               type: Types.TRENDING_LOAD_MORE_SUCCESS,
               storeName,
               pageIndex,
               projectModes: dataArray.slice(0, max)
            })
         }

      }, 500);
   }
}
