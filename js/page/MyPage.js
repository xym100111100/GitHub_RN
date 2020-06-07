import React, { Component } from "react"
import { View, Text,ScrollView, TouchableOpacity, StyleSheet, Button, TextInput, ViewPropTypes } from "react-native"
import { connect } from "react-redux"
import action from "../action"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import {MORE_MENU} from '../common/MORE_MENU';
import GlobalStyles from '../res/styles/GlobalStyles';
import ViewUtil from '../util/ViewUtil';
import NavigationBar from "../common/NavigationBar"
import NavigationUtil from '../navigator/NavigationUtil';

const THEME_COLOR = "#678"
class MyPage extends Component {
    getRightButton() {
        return <View style={{ flexDirection: 'row' }} >
            <TouchableOpacity
                onPress={() => { }}
            >
                <View style={{ padding: 5, marginRight: 8 }} >
                    <Feather
                        name={'search'}
                        size={24}
                        style={{ color: 'white' }}
                    />
                </View>
            </TouchableOpacity>
        </View>
    }

    getLeftButton(callBack) {
        return (

            <TouchableOpacity onPress={callBack} >
                <View style={{padding:10,paddingRight:10}} >
                    <Ionicons
                        name={"ios-arrow-back"}
                        size={26}
                        style={{ color: 'white' }}
                    />
                </View>

            </TouchableOpacity>

        )
    }

    onClick(menu) {
        let RouteName, params = {};
        switch (menu) {
            case MORE_MENU.Tutorial:
                RouteName = 'WebViewPage';
                params.title = '教程';
                params.url = 'https://coding.m.imooc.com/classindex.html?cid=304';
                break;
        }
        if (RouteName) {
            NavigationUtil.goPage(params, RouteName);
        }
    }

    getItem(menu) {
        return ViewUtil.getMenuItem(() => this.onClick(menu), menu, THEME_COLOR);
    }

    render() {
      
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStytle: 'ligth-content'
        }
        let navigationBar = <NavigationBar
            title={"我的"}
            stateBar={statusBar}
            style={{ backgroundColor: THEME_COLOR }}
            rightButton={this.getRightButton()}
            leftButton={this.getLeftButton()}
        />


        return (
            <View  style={GlobalStyles.root_container}>
                {navigationBar}
                <ScrollView>
                <TouchableOpacity
                        style={styles.item}
                        onPress={() => this.onClick(MORE_MENU.About)}
                    >
                        <View style={styles.about_left}>
                            <Ionicons
                                name={MORE_MENU.About.icon}
                                size={40}
                                style={{
                                    marginRight: 10,
                                    color: THEME_COLOR,
                                }}
                            />
                            <Text>GitHub Popular</Text>
                        </View>
                        <Ionicons
                            name={'ios-arrow-forward'}
                            size={16}
                            style={{
                                marginRight: 10,
                                alignSelf: 'center',
                                color: THEME_COLOR,
                            }}/>
                    </TouchableOpacity>
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Tutorial)}
                      {/*趋势管理*/}
                      <Text style={styles.groupTitle}>趋势管理</Text>
                    {/*自定义语言*/}
                    {this.getItem(MORE_MENU.Custom_Language)}
                    {/*语言排序*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Sort_Language)}

                    {/*最热管理*/}
                    <Text style={styles.groupTitle}>最热管理</Text>
                    {/*自定义标签*/}
                    {this.getItem(MORE_MENU.Custom_Key)}
                    {/*标签排序*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Sort_Key)}
                    {/*标签移除*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Remove_Key)}

                    {/*设置*/}
                    <Text style={styles.groupTitle}>设置</Text>
                    {/*自定义主题*/}
                    {this.getItem(MORE_MENU.Custom_Theme)}
                    {/*关于作者*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.About_Author)}
                    <View style={GlobalStyles.line}/>
                    {/*反馈*/}
                    {this.getItem(MORE_MENU.Feedback)}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.CodePush)}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
    },
    about_left: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    item: {
        backgroundColor: 'white',
        padding: 10,
        height: 90,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    groupTitle: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 12,
        color: 'gray',
    },
});




/**
 * 1:注册mapDispachToProps(可以不用这样命名)，这样就能在this.props中拿到onThemeChange(必须这样命名，和action中的对应)进而执行theme中的onThemeChange
 * 2:action.onThemeChange(theme) 点击过去会发现这里其实会返回{ type: Types.THEME_CHANGE, theme: theme } 这样一个对象(这叫创建action)，进而就可以dispatch一个action就能修改到指定的state 
 * 3:由于创建store的时候已经将reducer放了进去，这里发出dispatch的时候就会被store监听到，store将type于每一个redure的key进行计算后得到新的state后更新state
 * 4：由于页面中的state是订阅了store里面的state的，这时候就会收到state发生改变的消息从而重新渲染页面
 * 
 * @param {*} dispatch 
 */
// const mapDispachToProps = dispatch => ({
//     onThemeChange: theme => dispatch({ type: 'THEME_CHANGE', theme: theme })

// })

/**
 * 与上面的方法一样效果，如果想在dispatch前做什么的话就用下面这种方法
 * 
 * 里面的原理应该是，如果传个对象进去就直接执行dispatch，如果是方法的话就将dispatch作为参数传到该方法里面
 * @param {*} dispatch 
 */
const mapDispachToProps = dispatch => ({
    onThemeChange: theme => dispatch((dispatch)=>{
        dispatch(
            { type: 'THEME_CHANGE', theme: theme }
        )
        
    })

})
const mapStateToProps = state => ({
    theme: state.theme.theme
})


export default connect(mapStateToProps, mapDispachToProps)(MyPage)