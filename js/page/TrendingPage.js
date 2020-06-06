import React, { Component } from "react"
import { View, FlatList, Text, StyleSheet, DeviceEventEmitter,RefreshControl, ActivityIndicator, TouchableOpacity } from "react-native"
import { createMaterialTopTabNavigator } from "react-navigation-tabs"
import { createAppContainer } from "react-navigation"
import { connect } from "react-redux"
import actions from "../action/index"
import TrendingItem from "../common/TrendingItem"
import TrendingDialog, { TimeSpans } from '../common/TrendingDialog';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Toast from 'react-native-easy-toast'
import NavigationBar from "../common/NavigationBar"
const EVENT_TYPE_TIME_SPAN_CHANGE = 'EVENT_TYPE_TIME_SPAN_CHANGE';
import {FLAG_STORAGE} from '../expand/dao/DataStore';
import FavoriteDao from '../expand/dao/FavoriteDao';
import FavoriteUtil from '../util/FavoriteUtil';
import NavigationUtil from '../navigator/NavigationUtil';

const URL = 'https://github.com/trending/';
const QUERY_STR = "&sort=stars"
const THEME_COLOR = "#678"
const pageSize = 10 // 设置常亮防止修改

const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_trending);
/**
 * 页面获取数据
 * 1:首先订阅reducer中的trending作为props
 * 
 * 
 */
export default class TrendingPage extends Component {

    constructor(props) {
        super(props)
        //this.tabNames = ["ALL", "C", "C#", "PHP"] 注意，这里追踪下去会发现是使用了一个组件去请求github上的数据，gitub上面有该组件不一定有。
        this.tabNames = ["java"]
        this.state = {
            timeSpan: TimeSpans[0],
        };
    }
    _genTabs() {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => <TrendingTabPage timeSpan={this.state.timeSpan} {...props} tabLabel={item} />,  // 这种写法是动态设置导航的基础
                navigationOptions: {
                    title: item
                }
            }
        })
        return tabs;
    }

    renderTitleView() {
        return <View>
            <TouchableOpacity
                underlayColor='transparent'
                onPress={() => this.dialog.show()}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{
                        fontSize: 18,
                        color: '#FFFFFF',
                        fontWeight: '400',
                    }}>趋势 {this.state.timeSpan.showText}</Text>
                    <MaterialIcons
                        name={'arrow-drop-down'}
                        size={22}
                        style={{ color: 'white' }}
                    />
                </View>
            </TouchableOpacity>
        </View>;
    }

    onSelectTimeSpan(tab) {
        this.dialog.dismiss();
        this.setState({
            timeSpan: tab,
        });
        DeviceEventEmitter.emit(EVENT_TYPE_TIME_SPAN_CHANGE, tab);


    }

    renderTrendingDialog() {
        return <TrendingDialog
            ref={dialog => this.dialog = dialog}   // 这里就相当是this.dialog = this.resf.dialog,然后就能获取到该组件和里面的方法了
            onSelect={tab => this.onSelectTimeSpan(tab)}
        />;
    }

    _tabNav() {
        if (!this.tabNav) {
            return (
                this.tabNav = createAppContainer(createMaterialTopTabNavigator(
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
                ))
            )

        } else {
            return this.tabNav
        }
    }

    render() {
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStytle: 'ligth-content'
        }
        let navigationBar = <NavigationBar
            titleView={this.renderTitleView()}
            stateBar={statusBar}
            style={{ backgroundColor: THEME_COLOR }}
        />


        const TabNavigator = this._tabNav()
        return (
            <View style={style.container} >
                {navigationBar}
                <TabNavigator />
                {this.renderTrendingDialog()}
            </View>
        )
    }
}



class TrendingTab extends Component {
    constructor(props) {
        super(props);
        const { tabLabel, timeSpan } = this.props;

        this.storeName = tabLabel;
        this.timeSpan = timeSpan;
    }

    componentDidMount() {
        // 切记下面要去掉监听
        this.loadData()
        this.timeSpanChangeListener = DeviceEventEmitter.addListener(EVENT_TYPE_TIME_SPAN_CHANGE, (timeSpan) => {
            this.timeSpan = timeSpan;
            this.loadData();
        });
    }

    componentWillUnmount() {
        if (this.timeSpanChangeListener) {
            this.timeSpanChangeListener.remove();
        }

    }

    loadData(loadMore, refreshFavorite) {
        const {onRefreshTrending, onLoadMoreTrending, onFlushTrendingFavorite} = this.props;
        const store = this._store();
        const url = this.genFetchUrl(this.storeName);
        if (loadMore) {
            onLoadMoreTrending(this.storeName, ++store.pageIndex, pageSize, store.items, favoriteDao, callback => {
                this.refs.toast.show('没有更多了');
            });
        } else if (refreshFavorite) {
            onFlushTrendingFavorite(this.storeName, store.pageIndex, pageSize, store.items, favoriteDao);
            this.isFavoriteChanged = false;
        } else {
            onRefreshTrending(this.storeName, url, pageSize, favoriteDao);
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
      
        return URL + key + '?' + this.timeSpan.searchText;
    }




    renderItem(data) {
        const item = data.item;
        
        return <TrendingItem
            projectModel={item}
        
            onSelect={(callback) => {
                NavigationUtil.goPage({
                
                    projectModel: item,
                    flag: FLAG_STORAGE.flag_trending,
                    callback,
                }, 'DetailPage');
                //  this.props.navigation.navigate('tab1');//跳转到createMaterialTopTabNavigator中的指定tab，主要这个navigation一定要是在跳转到createMaterialTopTabNavigator中的指页面获取的
            }}
            onFavorite={(item, isFavorite) => FavoriteUtil.onFavorite(favoriteDao, item, isFavorite, FLAG_STORAGE.flag_trending)}
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
        return (
            <View style={style.container} >
                <FlatList
                    data={store.projectModels}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => '' + item.item.fullName}
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
    trending: state.trending,
});
const mapDispatchToProps = dispatch => ({
    //将 dispatch(onRefreshPopular(storeName, url))绑定到props
    onRefreshTrending: (storeName, url, pageSize, favoriteDao) => dispatch(actions.onRefreshTrending(storeName, url, pageSize, favoriteDao)),
    onLoadMoreTrending: (storeName, pageIndex, pageSize, items, favoriteDao, callBack) => dispatch(actions.onLoadMoreTrending(storeName, pageIndex, pageSize, items, favoriteDao, callBack)),
    onFlushTrendingFavorite: (storeName, pageIndex, pageSize, items, favoriteDao) => dispatch(actions.onFlushTrendingFavorite(storeName, pageIndex, pageSize, items, favoriteDao)),
});
//注意：connect只是个function，并不应定非要放在export后面
const TrendingTabPage = connect(mapStateToProps, mapDispatchToProps)(TrendingTab);

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