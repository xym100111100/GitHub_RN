import React ,{Component}  from  "react"
import {View,Text,StyleSheet} from "react-native"

export  default class DetailPage extends Component {

    render(){
        return(
           <View style={style}  >  
               <Text>详情页</Text>
           </View> 
        )
    }
}

const style=StyleSheet.create({
    container:{
        flex:1
    }
})
