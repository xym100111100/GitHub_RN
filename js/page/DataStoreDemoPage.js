import React from "react"
import { Text, View, StyleSheet, TextInput } from "react-native"
import DataStore from "../expand/dao/DataStore"
export default class DataStoreDemoPage extends React.Component {
    constructor(props) {
        super(props)
        this.DataStore = new DataStore();
        this.state = {
            showText: ''
        }
    }

    loadData() {
        //https://api.github.com/search/repositories?q=java github 搜索api
        let url = `https://api.github.com/search/repositories?q=${this.value}`
        this.DataStore.fetchData(url).then(data => {
            let showData = `初次加载时间:${new Date(data.timestamp)}\n${JSON.stringify(data.data)}`;
            console.log(showData)
         
        }).catch(e => {
           
        })
    }

    render() {
        return (
            <View style={style.container} >
                <Text style={style.text} >
                    离线缓存
                </Text>
                <TextInput style={style.input} onChangeText={(text) => {
                    this.value = text
                }} />
                <View>
                    <Text onPress={
                        () => this.loadData()
                    } >获取</Text>
                </View>
                <Text>
                    {this.state.showText}
                </Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {

    },
    input: {
        borderColor: 'red',
        borderWidth: 1,
        margin: 5
    },
    text: {

        textAlign: 'center'
    }
})