import Types from "../types"
import DataStore from "../../expand/dao/DataStore"

export function onLoadPopularData(storeName,url){
   return dispatch=>{
      dispatch({
         type:Types.POPULAR_REFRESH,
         storeName:storeName
      })
      let dataStore = new DataStore()
      dataStore.fetchData(url) // 一步action与数据流
      .then(data=>{
         
      })
   }
}