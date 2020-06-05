import React from "react"
import AsyncStorage from '@react-native-community/async-storage';

import { View, Text, Button, TextInput, StyleSheet } from "react-native"

const KEY = "save_key"
export default class AsyncStorageDemoPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }

    async doSave() {
      
        AsyncStorage.setItem(KEY, this.value, error => {
            error && console.log(error.toString())
        })
    }

    async getSave() {
        AsyncStorage.getItem(KEY, (error, value) => {
            this.setState({
                value: value
            })
          
            error && console.log(error.toString())
        })
    }

    async delSave() {
        AsyncStorage.removeItem(KEY, error => {
            if(error){
                console.log(error.toString())
            }else{
                console.log("删除成功")
            }
            
        })
    }
    async modSave(){
        AsyncStorage.mergeItem(KEY,JSON.stringify(this.state.value),error=>{
            if(error){
                console.log(error.toString())
            }else{
                console.log("修改成功")
            }
        })
    }



    render() {
        return (
            <View style={style.container} >

                <TextInput style={style.input} onChangeText={text => {
                    this.value = text
                }} />
                <View style={style.texts} >
                    <Text
                        onPress={() => {
                            this.getSave()
                        }} >
                        查询
                    </Text>
                    <Text
                        onPress={() => {
                            this.doSave()
                        }}>
                        增加
                    </Text>
                    <Text onPress={() => {
                        this.delSave()
                    }}  >删除</Text>
                    <Text 
                        onPress={()=>{
                            this.modSave()
                        }}
                    >修改</Text>
                </View>
                <Text>{this.state.value}</Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        borderColor: 'red',
        borderWidth: 1
    },
    texts: {
        marginTop: 10,

        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})