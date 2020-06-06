import React, {Component} from 'react';
import {StyleSheet,Text,TouchableOpacity, View, DeviceInfo} from 'react-native';

import NavigationBar, {NAVIGATION_BAR_HEIGHT} from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import share from '../res/data/share';
import ShareUtil from '../util/ShareUtil';
import {WebView} from 'react-native-webview';
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
        const title = projectModel.item.full_name || projectModel.item.fullName;
        this.url = projectModel.item.html_url || TRENDING_URL + projectModel.item.fullName;
        this.state = {
            title: title,
            url: this.url,
        };
    }

    
    onBack() {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            NavigationUtil.goBack(this.props.navigation);
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

    onNavigationStateChange(navState) {
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
           <View style={style}  >  
               {navigationBar}
               <WebView
        source={{ uri: 'https://infinite.red' }}
        style={{ marginTop: 20 }}
      />
           </View> 
        )
    }
}

const style=StyleSheet.create({
    container:{
        flex:1
    }
})
