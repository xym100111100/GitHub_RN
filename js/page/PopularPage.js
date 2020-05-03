import React, { Component } from "react"
import { View, FlatList, Text, StyleSheet, RefreshControl } from "react-native"
import { createMaterialTopTabNavigator } from "react-navigation-tabs"
import { createAppContainer } from "react-navigation"
import { connect } from "react-redux"
import actions from "../action/index"
import PopulartItem from "../common/PopularItem"

//https://api.github.com/search/repositories?q=java
const URL = "https://api.github.com/search/repositories?q="
const QUERY_STR = "&sort=stars"
const THEME_COLOR = "red"
export default class PoPularPage extends Component {

    constructor(props) {
        super(props)
        this.tabNames = ["Java", "Android", "ios", "React"]
    }
    _genTabs() {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => <PoPularTabPage {...props} tabLabel={item} />,  // 这种写法是动态设置导航的基础
                navigationOptions: {
                    title: item
                }
            }
        })
        return tabs;
    }

    render() {
        const TabNavigator = createAppContainer(createMaterialTopTabNavigator(
            this._genTabs(),
            {
                tabBarOptions: {
                    tabStyle: style.tabStyle,
                    upperCaseLabel: false,
                    scrollEnabled: true,
                    style: {
                        backgroundColor: '#a67'
                    },
                    inficatorStyle: style.inficatorStyle,
                    labelStyle: style.lableStyle
                }
            }
        ))
        return (
            <View style={style.container} >
                <TabNavigator />
            </View>
        )
    }
}


class PopularTab extends Component {
    constructor(props) {
        super(props);
        const { tabLabel } = this.props
        this.storeName = tabLabel;

    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        const { onLoadPopularData } = this.props
        const url = this.genFetchUrl(this.storeName)
        onLoadPopularData(this.storeName, url)
    }

    genFetchUrl(key) {
        return URL + key + QUERY_STR
    }

    renderItem(data) {
        const item = data.item
        return (
            <PopulartItem
                item={item}
                onSelect={() => {

                }}
            />
        )
    }

    render() {
        const { popular } = this.props
        let store = popular[this.storeName] // 动态获取state
        if (!store) {
            store = {
                items: [],
                isLoading: false
            }
        }
        return (
            <View style={style.container} >
                <FlatList
                    data={store.items}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => "" + item.id}
                    refreshControl={
                        <RefreshControl
                            title={"loading"}
                            titleColor={THEME_COLOR}
                            refreshing={store.isLoading}
                            onRefresh={() => this.loadData()}
                            tintColor={THEME_COLOR}
                        />
                    }
                />
            </View>
        )
    }
}


const mapStateToProps = state => ({
    popular: state.popular
})

const mapDispatchTOProps = dispatch => ({
    onLoadPopularData: (storeName, url) => dispatch(actions.onLoadPopularData(storeName, url))
})

const PoPularTabPage = connect(mapStateToProps, mapDispatchTOProps)(PopularTab)

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    },
    tabStyle: {
        minWidth: 50
    },
    inficatorStyle: {
        height: 2,
        backgroundColor: "white",
    },
    lableStyle: {
        fontSize: 23,
        marginTop: 6,
        marginBottom: 6
    }

})