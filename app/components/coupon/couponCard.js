import React from 'react'
import {
  Image,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import PropTypes from 'prop-types'
import {
  RkText,
  RkCard,
  RkStyleSheet
} from 'react-native-ui-kitten';
import { UIConstants } from '../../config/appConstants'
import { FontAwesome } from '../../assets/icons';
import { Avatar } from '../../components';
import CommonUtils from '../../utils/common'

export class CouponCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLiked: false
    }
  }

  like() {
    const { isLiked } = this.state

    this.setState({
      isLiked: !isLiked,
    })
  }

  render() {
    const { coupon, navigation } = this.props
    const image = coupon.images[0]
    const commentCount = coupon.comments.length + ''
    let discounted = ''
    if (coupon.price == 0) {
      discounted = 'Free'
    } else {
      discounted = Math.floor((coupon.value - coupon.price) / coupon.value * 100)
      discounted = `-${discounted}%`
    }

    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('CouponView', { coupon })}>
        <RkCard rkType='imgBlock' style={styles.card}>
          <Image rkCardImg source={{ uri: `${UIConstants.ApiHost}${image.path}` }} style={{ height: 180 }} />

          <View rkCardImgOverlay rkCardContent style={styles.overlay}>
            <View style={{ flex: 0, alignSelf: 'flex-start' }}>
              <Avatar img={{ uri: `${UIConstants.ApiHost}${coupon.company.logo}` }}
                rkType='circle'
                style={{ width: 50, height: 50, paddingTop: 8, }}
              />
            </View>
            <View style={{ flex: 1, alignSelf: 'flex-end' }}>
              <RkText rkType='primary2 inverseColor' style={{ marginTop: 0, paddingTop: 0 }} numberOfLines={1}>{coupon.title}</RkText>
              <RkText style={styles.time} rkType='secondary2 inverseColor'>
                <Text style={{ width: 35, height: 35, borderWidth: 1, borderRadius: 30, backgroundColor: '#f64e59' }}> {discounted} </Text> <Text style={styles.oldText}>{CommonUtils.formatMoney(coupon.value)} đ</Text> <Text style={styles.textPrimary}>{CommonUtils.formatMoney(coupon.price)} đ</Text>
              </RkText>
            </View>
          </View>

          <TouchableOpacity style={{
            flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: 50,
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: 30,
            paddingHorizontal: 12,
            paddingVertical: 0,
            borderTopEndRadius: 20,
            borderBottomEndRadius: 20,
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderColor: '#f64e59',
            borderWidth: 0.5,
            borderLeftWidth: 0,
            }} onPress={() => this.like()}>
            <RkText rkType='awesome primary'>
              {this.state.isLiked ? FontAwesome.heart : FontAwesome.emptyHeart}
            </RkText>
          </TouchableOpacity>

          {/* <View style={{ alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 50, flexDirection: 'row', }}>
            <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: 50 }} onPress={() => this.like()}>
              <RkText rkType='awesome primary'>
                {this.state.isLiked ? FontAwesome.heart : FontAwesome.emptyHeart}
              </RkText>
            </TouchableOpacity>

            <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50 }} onPress={() => navigation.navigate('Comments')}>
              <RkText rkType='awesome primary'>
                {FontAwesome.comment} {commentCount}
              </RkText>
            </TouchableOpacity>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Avatar img={require('../../data/img/photo32.jpg')}
                  rkType='circle'
                  style={{ width: 50, height: 50, }}
                />
              </TouchableOpacity>
            </View>

          </View> */}
        </RkCard>
      </TouchableOpacity>
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 14
  },
  card: {
    marginBottom: 16,
    marginHorizontal: 10,
  },
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingTop: 0,
    paddingHorizontal: 5,
  },
  time: {
    marginTop: 5
  },
  oldText: {
    textDecorationLine: 'line-through',
    fontSize: 11
  },
  textPrimary: {
    fontWeight: 'bold',
  }
}));


CouponCard.props = {
  coupon: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
}

export default CouponCard