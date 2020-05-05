import React, { Component } from "react"
import { View, FlatList, Text, StyleSheet, RefreshControl, ActivityIndicator } from "react-native"
import { createMaterialTopTabNavigator } from "react-navigation-tabs"
import { createAppContainer } from "react-navigation"
import { connect } from "react-redux"
import actions from "../action/index"
import TrendingtItem from "../common/TrendingItem"
import Toast from 'react-native-easy-toast'
import NavigationBar from "../common/NabigationBar"

const URL = 'https://github.com/trending/';
const QUERY_STR = "&sort=stars"
const THEME_COLOR = "#678"
const pageSize = 10 // 设置常亮防止修改


/**
 * 页面获取数据
 * 1:首先订阅reducer中的trending作为props
 * 
 * 
 */
export default class TrendingPage extends Component {

    constructor(props) {
        super(props)
        //this.tabNames = ["ALL", "C", "C#", "PHP"]
        this.tabNames = ["java"]
    }
    _genTabs() {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => <TrendingTabPage {...props} tabLabel={item} />,  // 这种写法是动态设置导航的基础
                navigationOptions: {
                    title: item
                }
            }
        })
        return tabs;
    }

    render() {
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStytle: 'ligth-content'
        }
        let navigationBar = <NavigationBar
            title={"趋势"}
            stateBar={statusBar}
            style={{ backgroundColor: THEME_COLOR }}
        />


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
                {navigationBar}
                <TabNavigator />
            </View>
        )
    }
}



class TrendingTab extends Component {
    constructor(props) {
        super(props);
        const { tabLabel } = this.props
        this.storeName = tabLabel;

    }

    componentDidMount() {
        this.loadData()
    }

    loadData(loadMore) {
        const { onLoadTrendingData, onLoadMoreTrending } = this.props
        const store = this._store()
        const url = this.genFetchUrl(this.storeName)
        if (loadMore) {
            onLoadMoreTrending(this.storeName, ++store.pageIndex, pageSize, store.items, callBack = () => {
                this.refs.toast.show("没有更多了")
            })
        } else {
            onLoadTrendingData(this.storeName, url, pageSize)
        }


    }



    _store() {
        const { trending } = this.props;
        let store = trending[this.storeName]
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModes: [],
                hideLoadingMore: true
            }
        }
        return store
    }

    genFetchUrl(key) {
        return URL+key;
    }

    renderItem(data) {
        const item = data.item
        return (
            <TrendingtItem
                item={item}
                onSelect={() => {

                }}
            />
        )
    }

    genIndicator() {

        return this._store().hideLoadingMore ? <View></View> :
            <View style={style.indicatorContainer} >
                <ActivityIndicator
                    size='large'
                    animating={true}
                />
                <Text>正在加载更多</Text>

            </View>
    }

    render() {

        let store = this._store();
        return (
            <View style={style.container} >
                <FlatList
                    data={store.projectModes}
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
                    ListFooterComponent={() => this.genIndicator()}
                    onEndReached={() => {
                        this.loadData(true)
                    }}
                    onEndReachedThreshold={0.5} //距离底部的距离
                />
                <Toast
                    ref={'toast'}
                    position={'center'}
                ></Toast>
            </View>
        )
    }
}


/**
 * 这里只订阅自己需要的就行，否则当某个state改变时render方法就会重新执行
 * @param {} state 
 */

const mapStateToProps = state => ({
    trending: state.trending
})

const mapDispatchTOProps = dispatch => ({
    onLoadTrendingData: (storeName, url, pageSize) => dispatch(actions.onLoadTrendingData(storeName, url, pageSize)),

    onLoadMoreTrending: (storeName, pageIndex, pageSize, items, callBack) => dispatch(actions.onLoadMoreTrending(storeName, pageIndex, pageSize, items, callBack))
})

const TrendingTabPage = connect(mapStateToProps, mapDispatchTOProps)(TrendingTab)

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
    },
    indicatorContainer: {
        alignItems: 'center'
    },
    indicator: {
        color: 'red',
        margin: 10
    }

})