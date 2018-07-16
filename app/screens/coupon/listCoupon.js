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
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import { FontAwesome } from '../../assets/icons';
import { data } from '../../data';
import couponApi from '../../api/couponApi';
import { UIConstants } from '../../config/appConstants'

export class ListCoupon extends React.Component {
  static navigationOptions = {
    title: 'List Coupon'.toUpperCase()
  };

  constructor(props) {
    super(props);

    this.state = {
      isLiked: false,
      data: []
    }
    // this.data = data.getArticles();
    this.renderItem = this._renderItem.bind(this);
  }

  _keyExtractor(coupon, index) {
    return coupon.id;
  }

  like() {
    this.setState({
      isLiked: !this.state.isLiked,
    })
  }

  async componentWillMount() {
    const res = await couponApi.getPage(1, 10)
    const data = await res.json()
    this.setState({
      data
    })
  }

  _renderItem(data) {
    const coupon = data.item
    const image = coupon.images[0]
    console.log(coupon)

    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        onPress={() => this.props.navigation.navigate('CouponView')}>
        <RkCard rkType='imgBlock' style={styles.card}>
          <Image rkCardImg source={{ uri: `${UIConstants.ApiHost}${image.path}` }} style={{height: 180}} />
          <View rkCardImgOverlay rkCardContent style={styles.overlay}>
            <RkText rkType='header4 inverseColor'>{coupon.title}</RkText>
            <RkText style={styles.time}
              rkType='secondary2 inverseColor'>{coupon.value + ''} đ - {coupon.price + ''} đ</RkText>
            <Image source={{ uri: '../../img/photo32.jpg' }} />
          </View>
          <View style={{ paddingVertical: 15, }}>
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
    const { data } = this.state

    return (
      <FlatList
        data={data}
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
