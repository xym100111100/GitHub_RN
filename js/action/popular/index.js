import Types from "../types"
import DataStore from "../../expand/dao/DataStore"

export function onLoadPopularData(storeName, url) {
   return dispatch => {
      dispatch({
         type: Types.POPULAR_REFRESH,
         storeName: storeName
      })
      let dataStore = new DataStore()
      dataStore.fetchData(url) // 异步action与数据流
         .then(data => {
            headleData(dispatch, storeName, data)
         }).catch(error => {
            console.log(error)
            dispatch({
               type: Types.LOAD_POPULAR_FAIL,
               storeName,
               error
            })
         })
   }
}


function headleData(dispatch, storeName, data) {
   dispatch({
      type: Types.LOAD_POPULLAR_SUCCESS,
      items: data && data.data && data.data.items,
      storeName
   })


}