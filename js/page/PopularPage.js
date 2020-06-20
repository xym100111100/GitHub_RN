import React, { Component } from "react"
import { View, FlatList, Text, StyleSheet, RefreshControl, ActivityIndicator } from "react-native"
import { createMaterialTopTabNavigator } from "react-navigation-tabs"
import { createAppContainer } from "react-navigation"
import { connect } from "react-redux"
import actions from "../action/index"
import PopularItem from "../common/PopularItem"
import Toast from 'react-native-easy-toast'
import NavigationBar from "../common/NavigationBar"
import FavoriteDao from '../expand/dao/FavoriteDao';
import {FLAG_STORAGE} from '../expand/dao/DataStore';
import FavoriteUtil from '../util/FavoriteUtil';
import NavigationUtil from "../navigator/NavigationUtil"
import {FLAG_LANGUAGE} from '../expand/dao/LanguageDao';
//https://api.github.com/search/repositories?q=java
const URL = "https://api.github.com/search/repositories?q="
const QUERY_STR = "&sort=stars"
const THEME_COLOR = "#678"
const pageSize = 10 // 设置常亮防止修改
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);


/**
 * 页面获取数据
 * 1:首先订阅reducer中的popular作为props
 * 
 * 
 */
 class PopularPage extends Component {

    constructor(props) {
        super(props)
        const {onLoadLanguage} = this.props;
        onLoadLanguage(FLAG_LANGUAGE.flag_key);
    }
    _genTabs() {
        const tabs = {};
        const {keys} = this.props;
        keys.forEach((item, index) => {
            if (item.checked) {
                tabs[`tab${index}`] = {
                    screen: props => <PopularTabPage {...props} tabLabel={item.name}/>,
                    navigationOptions: {
                        title: item.name,
                    },
                };
            }
        });
        return tabs;
    }

    render() {
        const {keys} = this.props;
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStytle: 'ligth-content'
        }
        let navigationBar = <NavigationBar
            title={"最热"}
            stateBar={statusBar}
            style={{ backgroundColor: THEME_COLOR }}
        />


        const TabNavigator = keys.length ? createAppContainer(createMaterialTopTabNavigator(
            this._genTabs(),
            {
                tabBarOptions: {
                    tabStyle: style.tabStyle,
                    upperCaseLabel: false,
                    scrollEnabled: true,
                    style: {
                        backgroundColor: THEME_COLOR
                    },
                    inficatorStyle: style.inficatorStyle,
                    labelStyle: style.lableStyle
                }
            }
        )): null;
        return (
            <View style={style.container} >
                {navigationBar}
                {TabNavigator && <TabNavigator/>}
            </View>
        )
    }
}

const mapPopularStateToProps = state => ({
    keys: state.language.keys,
  
});
const mapPopularDispatchToProps = dispatch => ({
    onLoadLanguage: (flag) => dispatch(actions.onLoadLanguage(flag)),
});
//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapPopularStateToProps, mapPopularDispatchToProps)(PopularPage);



class PopularTab extends Component {
    constructor(props) {
        super(props);
        const { tabLabel } = this.props
        this.storeName = tabLabel;

    }

    componentDidMount() {
        this.loadData()
    }


    loadData(loadMore, refreshFavorite) {
        const {onRefreshPopular, onLoadMorePopular, onFlushPopularFavorite} = this.props;
        const store = this._store();
        const url = this.genFetchUrl(this.storeName);
        if (loadMore) {
            onLoadMorePopular(this.storeName, ++store.pageIndex, pageSize, store.items, favoriteDao, callback => {
                this.refs.toast.show('没有更多了');
            });
        } else if (refreshFavorite) {
            onFlushPopularFavorite(this.storeName, store.pageIndex, pageSize, store.items, favoriteDao);
        } else {
            onRefreshPopular(this.storeName, url, pageSize, favoriteDao);
        }
    }



    _store() {
        const { popular } = this.props;
        let store = popular[this.storeName]
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
        return URL + key + QUERY_STR
    }

    renderItem(data) {
        const item = data.item;
        
        return <PopularItem
            projectModel={item}
        
            onSelect={(callback) => {
                NavigationUtil.goPage({
                
                    projectModel: item,
                    flag: FLAG_STORAGE.flag_popular,
                    callback,
                }, 'DetailPage');
                //  this.props.navigation.navigate('tab1');//跳转到createMaterialTopTabNavigator中的指定tab，主要这个navigation一定要是在跳转到createMaterialTopTabNavigator中的指页面获取的
            }}
            onFavorite={(item, isFavorite) => FavoriteUtil.onFavorite(favoriteDao, item, isFavorite, FLAG_STORAGE.flag_popular)}
        />;
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
        // 数据格式示例
        // store={
        //     hideLoadingMore: false,
        //     isLoading: false,
        //     items:'原始数据',
        //     pageIndex: 1,
        //     projectModels:[
        //         {ProjectModel:{
        //             isFavorite: false,
        //             item:'每一条数据'
        //         }}
        //     ]

        // }
        return (
            <View style={style.container} >
                <FlatList
                    data={store.projectModels}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => '' + item.item.id}
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
    popular: state.popular,
});
const mapDispatchToProps = dispatch => ({
    //将 dispatch(onRefreshPopular(storeName, url))绑定到props
    onRefreshPopular: (storeName, url, pageSize, favoriteDao) => dispatch(actions.onRefreshPopular(storeName, url, pageSize, favoriteDao)),
    onLoadMorePopular: (storeName, pageIndex, pageSize, items, favoriteDao, callBack) => dispatch(actions.onLoadMorePopular(storeName, pageIndex, pageSize, items, favoriteDao, callBack)),
    onFlushPopularFavorite: (storeName, pageIndex, pageSize, items, favoriteDao) => dispatch(actions.onFlushPopularFavorite(storeName, pageIndex, pageSize, items, favoriteDao)),
});
//注意：connect只是个function，并不应定非要放在export后面
const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);


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