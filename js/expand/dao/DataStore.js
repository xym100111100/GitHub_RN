import { AsyncStorage } from "react-native"
import { createStore } from "redux"

export default class DataStore {

    /**
     * 请求策略，先请求本地，再请网络
     * @param {*} url 
     */
    fetchData(url) {
        return new Promise((resolve, reject) => {
            this.fetchLocalData(url).then((warpData) => {
             
                let a = DataStore.checkTimestampValid(warpData.timestamp)
                console.log("aaaa",a )
                if (warpData && a) {
                    resolve(warpData)
                } else {
                    this.fetchNetData(url).then((data) => {
                        resolve(this._wrapData(data))
                    }).catch((error) => {
                        reject(error)
                    })
                }
            }).catch((error) => {
                this.fetchNetData(url).then((data) => {
                    resolve(this._wrapData(data))
                }).catch((error) => {
                    reject(error)
                })
            })
        })
    }



    /**
     * 保存数据
     * @param {} url 
     * @param {*} data 
     * @param {*} callback 
     */
    saveData(url, data, callback) {
        if (!data || !url) return;
        AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback => {
        })
    }


    /**
     * 从本地获取数据
     * @param {*} url 
     */
    fetchLocalData(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
             
                if (!error) {
                    try {
                        // 解析发生错误抛出异常
                        resolve(JSON.parse(result))
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(error)
                }
            })
        })
    }

    /**
     * 从网络获取数据
     * @param {} url 
     */
    fetchNetData(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error('Network response was not ok')
                })
                .then((responseData) => {
                    // 保存数据到本地
                    this.saveData(url, responseData)
                    // 返回数据给调用者
                    resolve(responseData)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }


    /**
     * 包装有效期
     * @param {} data 
     */
    _wrapData(data) {
        let a = { data: data, timestamp: new Date().getTime() }
  
        return a
    }

    /**
     * 检查timestamp是否再有效期
     * @param {} timestamp 
     */
    static checkTimestampValid(timestamp) {
       
        const currentDate = new Date();
        const targetDate = new Date();
        targetDate.setTime(timestamp);
        if (currentDate.getMonth() !== targetDate.getMonth()) {
            return false;
        }
        if (currentDate.getDate() !== targetDate.getDate()) {
            return false;
        }
        if (currentDate.getHours() - targetDate.getHours() > 4) {
            return false;
        }//有效期4个小时
        // if (currentDate.getMinutes() - targetDate.getMinutes() > 1)return false;
        return true;
    }


}