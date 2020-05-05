import React from "react"
import { Image, TouchableOpacity, StyleSheet, Text, View } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"

export default class PopulartItem extends React.Component {

    render() {
        const { item } = this.props
        let favoriteButton =
            <TouchableOpacity
                style={{ padding: 6 }}
                underlayColor={"transparent"}
                onPress={() => {

                }}
            >
                <FontAwesome
                    name={"star-o"}
                    size={26}
                    style={{ color: 'red' }}
                />
            </TouchableOpacity>
        if (!item ) return null;
        return (
            <TouchableOpacity

                onPress={this.props.onSelect}
            >
                <View style={style.cell_container} > 
                    <Text>
                        {item.fullName}
                    </Text>
                    <Text style={style.description} >
                        {item.description}
                    </Text>
                    <View style={style.row} >
                        <View style={{ flexDirection: 'row' }} >
                            <Text> Built by : </Text>
                            {
                                item.contributors.map(((val,index)=>{
                                    return(<Image key={index}  style={{ width: 22, height: 22 }} source={{ uri: val }} />)
                                }))
                            }
                           
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }} >
                            <Text>Star: </Text>
                            <Text>{item.forkCount}</Text>

                        </View>
                        {favoriteButton}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const style = StyleSheet.create({
    cell_container: {
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        backgroundColor: "#dddddd",
        borderWidth: 0.1,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2
    },
    row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: "#212121"
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: "#757575"
    }
})