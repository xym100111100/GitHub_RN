import React from "react"
import { View, ScrollView, Button, Text, StyleSheet, TextInput } from "react-native"



export default class FatchDemoPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showText: ''
        }
    }

    loadData() {
        //https://api.github.com/search/repositories?q=java github 搜索api
        let url = "https://api.github.com/search/repositories?q=" + this.searchKey

        fetch(url).then(res => res.text()).then(resText => {
            this.setState({
                showText: resText
            })
        })
    }

    loadData2() {
        //https://api.github.com/search/repositories?q=java github 搜索api
        let url = "https://api.github.com/search/repositories?q=java" 
        console.log(url)
        fetch(url).then(res => {
            console.log(res)
            if (res.ok) {
                return res.text()
            }
            // 这里需要new下面的catch
            throw new Error('Nerwork response was not ok')
        }).then(resText => {
            console.log(resText)
            this.setState({
                showText: resText
            })
        })
            .catch(e => {
                this.setState({
                    showText: e.toString()
                })
            })
    }

    loadData3() {
        //https://api.github.com/search/repositories?q=java github 搜索api
        let url = "https://duamai.com/pfm-svr/pfm/sys"
        fetch(url).then(res => {
            if (res.ok) {
                return res.text()
            }
            // 这里需要new下面的catch
            throw new Error('Nerwork response was not ok')
        }).then(resText => {
            console.log(resText)
            this.setState({
                showText: resText
            })
        })
            .catch(e => {
                this.setState({
                    showText: e.toString()
                })
            })
    }


    TextMath() {


        let url = "https://duamai.com/pfm-svr/pfm/sys"

        fetch(url).then(res => res.text()).then(resText => {
            console.log(resText)
            this.setState({
                showText: resText
            })
        })
    }

    render() {
        return (
            <View style={style.container}  >
                <Text  >fatch 应用</Text>
                <TextInput
                    onChange={(text) => {
                        this.searchKey = text
                    }}
                    style={style.input} />
                <Button onPress={() => {
                    this.loadData2()
                }} title={"获取数据"} /> 
                <ScrollView>

                    <Text>{this.state.showText}</Text>
                </ScrollView>
            </View>
        )
    }
}


const style = StyleSheet.create({
    container: {
        flex: 1,

    },
    input: {
        borderColor: "red",
        borderWidth: 1
    }
})