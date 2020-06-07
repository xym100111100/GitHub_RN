import React, {Component} from 'react';
import {StyleSheet,Text,TouchableOpacity, View, DeviceInfo} from 'react-native';
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';
import BackPressComponent from '../common/BackPressComponent';

import NavigationBar, {NAVIGATION_BAR_HEIGHT} from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import share from '../res/data/share';
import ShareUtil from '../util/ShareUtil';
import {WebView} from 'react-native-webview';
import FavoriteDao from '../expand/dao/FavoriteDao';

const TRENDING_URL = 'https://github.com/';
type Props = {};
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NavigationUtil from '../navigator/NavigationUtil';

const THEME_COLOR = "#678"

export default class DetailPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        const {projectModel, flag} = this.params;
        this.favoriteDao = new FavoriteDao(flag);
        const title = projectModel.item.full_name || projectModel.item.fullName;
        this.url = projectModel.item.html_url || TRENDING_URL + projectModel.item.fullName;
        this.state = {
            title: title,
            url: this.url,
            canGoBack: false,
            isFavorite: projectModel.isFavorite,
        };
        this.backPress = new BackPressComponent({backPress: () => this.onBackPress()});
    }

    

    
    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }

    onBackPress() {
        this.onBack();
        return true;
    }

    onBack() {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            NavigationUtil.goBack(this.props.navigation);
        }
    }


    onBack() {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            NavigationUtil.goBack(this.props.navigation);
        }
    }

    
    onFavoriteButtonClick() {
        const {projectModel, callback} = this.params;
        const isFavorite = projectModel.isFavorite = !projectModel.isFavorite;
        callback(isFavorite);//更新Item的收藏状态
        this.setState({
            isFavorite: isFavorite,
        });
        let key = projectModel.item.fullName ? projectModel.item.fullName : projectModel.item.id.toString();
        if (projectModel.isFavorite) {
            this.favoriteDao.saveFavoriteItem(key, JSON.stringify(projectModel.item));
        } else {
            this.favoriteDao.removeFavoriteItem(key);
        }
    }


    renderRightButton() {
        return (<View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                    onPress={() => this.onFavoriteButtonClick()}>
                    <FontAwesome
                        name={this.state.isFavorite ? 'star' : 'star-o'}
                        size={20}
                        style={{color: 'white', marginRight: 10}}
                    />
                </TouchableOpacity>
                {ViewUtil.getShareButton(() => {
                    let shareApp = share.share_app;
                    ShareUtil.shareboard(shareApp.content, shareApp.imgUrl, this.url, shareApp.title, [0, 1, 2, 3, 4, 5, 6], (code, message) => {
                        console.log('result:' + code + message);
                    });
                })}
            </View>
        );
    }


    /**
     * 通过该属性这个监听到导航发生的变化，这样在webview里面点击后跳转的页面就能在返回的时候再次跳转进去而不是直接使用navigation，
     * 直接使用的话会跳转到进来时候的页面
     * @param {} navState 
     */
    onNavigationStateChange(navState) {
        console.log(navState)
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,
        });
    }

    render(){

        let navigationBar = <NavigationBar
        leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
        title={this.state.title}
        style={{backgroundColor:THEME_COLOR}}
        rightButton={this.renderRightButton()}
    />;
    
        return(
        
                <View style={styles.container}>
                {navigationBar}
                    <WebView
                        style={{marginTop: 0}}
                        ref={webView => this.webView = webView}
                        startInLoadingState={true} // 显示加载的图标
                        onNavigationStateChange={e => this.onNavigationStateChange(e)}
                        source={{uri: this.state.url}}
                    />
                  
                </View>
           
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navBar: {
        position: 'absolute',
        left: 0,
        right: 0,
    },
});