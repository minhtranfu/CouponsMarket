import React from 'react';
import {
    FlatList,
    Image,
    View,
    TouchableOpacity
} from 'react-native';
import {
    RkText,
    RkCard,
    RkStyleSheet
} from 'react-native-ui-kitten';
import { FontAwesome } from '../../assets/icons';
import { SocialBar } from '../../components';
import { data } from '../../data';
let moment = require('moment');

export class ListCoupon extends React.Component {
    static navigationOptions = {
        title: 'List Coupon'.toUpperCase()
    };

    constructor(props) {
        super(props);

        this.state = {
            isLiked: false,
        }
        this.data = data.getArticles();
        this.renderItem = this._renderItem.bind(this);
    }

    _keyExtractor(post, index) {
        return post.id;
    }

    like() {
        this.setState({
            isLiked: !this.state.isLiked,
        })
    }

    _renderItem(info) {
        return (
            <TouchableOpacity
                delayPressIn={70}
                activeOpacity={0.8}
                onPress={() => this.props.navigation.navigate('CouponView')}>
                <RkCard rkType='imgBlock' style={styles.card}>
                    <Image rkCardImg source={{ uri: 'https://cf.shopee.vn/file/eeca8f01a851a50c99ff019a9ebdaa95' }} />

                    <View rkCardImgOverlay rkCardContent style={styles.overlay}>
                        <RkText rkType='header4 inverseColor'>CGV Coupon</RkText>
                        <RkText style={styles.time}
                            rkType='secondary2 inverseColor'>200000 VND</RkText>
                        <Image source={{ uri: '../../img/photo32.jpg' }} />
                    </View>
                    <View style={{paddingVertical: 15,}}>
                        <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 50, }}>
                            <RkText rkType='awesome primary' onPress={() => this.like()}>
                                {this.state.isLiked ? FontAwesome.heart : FontAwesome.emptyHeart}
                            </RkText>
                            <RkText style={{ marginLeft: 30, }} rkType='awesome primary' onPress={() => this.props.navigation.navigate('Comments')}>
                                {FontAwesome.comment}
                            </RkText>
                        </View>
                    </View >
                </RkCard>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <FlatList
                data={this.data}
                renderItem={this.renderItem}
                keyExtractor={this._keyExtractor}
                style={styles.container} />

        )
    }
}

let styles = RkStyleSheet.create(theme => ({
    container: {
        backgroundColor: theme.colors.screen.scroll,
        paddingVertical: 8,
        paddingHorizontal: 14
    },
    card: {
        marginVertical: 8,
    },
    time: {
        marginTop: 5
    }
}));