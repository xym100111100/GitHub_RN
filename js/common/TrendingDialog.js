import React from "react"
import { View, TouchableOpacity, Modal, StyleSheet } from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import TimeSpan from "../model/TimeSpan"
export const TimeSpans = [new TimeSpan('今 天', 'since=daily'),
new TimeSpan('本 周', 'since=weekly'), new TimeSpan('本 月', 'since=monthly')];

export default class TrendingDialog extends React.Component {
    state = {
        visible: false
    }


    handChange() {
        this.setState({
            visible: !this.state.visible
        })
    }
    render() {

        return (
            <Modal
                transparent={true}
                visible={this.state.visible}
                onRequestClose={() => this.handChange()}
            >
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => {
                        this.handChange()
                    }}
                >
                    <MaterialIcons
                        name={"arrow-drop-up"}
                        size={36}
                        style={styles.arrow}
                    />
                    <View style={styles.content} >
                        {TimeSpans.map((item, index) => {
                            <TouchableOpacity
                                key={index}
                                onPress={this.onselect(item)}
                                underlayColor='transparent'
                            >
                                <View style={styles.text_container} >
                                    <Text style={styles.text} >
                                        item.showText
                                    </Text>
                                    {
                                        index !== TimeSpans.length - 1 ? <View style={styles.line} ></View>
                                            : null
                                    }
                                </View>
                            </TouchableOpacity>

                        })}
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
        flex: 1,
    },
    arrow: {
        marginTop: 40,
        color: "white",
        padding: 0,
        margin: -15
    },
    content: {
        backgroundColor: 'white',
        borderRadius: 3,
        paddingTop: 3,
        paddingBottom: 3,
        marginRight: 3
    },
    text_container: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    text: {
        fontSize: 16,
        color: 'black',
        fontWeight: '400',
        padding: 8,
        paddingLeft: 26,
        paddingRight: 26
    },
    line: {
        height: 0.3,
        backgroundColor: '#666666'
    }
})