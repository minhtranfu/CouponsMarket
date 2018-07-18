import React from 'react'
import {
  Image,
  View,
  TouchableOpacity
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

class CouponCard extends React.Component {
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
    const { coupon } = this.props
    const image = coupon.images[0]

    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        onPress={() => this.props.navigation.navigate('CouponView', { coupon })}>
        <RkCard rkType='imgBlock' style={styles.card}>
          <Image rkCardImg source={{ uri: `${UIConstants.ApiHost}${image.path}` }} style={{ height: 180 }} />

          <View rkCardImgOverlay rkCardContent style={styles.overlay}>
            <RkText rkType='header4 inverseColor'>{coupon.title}</RkText>
            <RkText style={styles.time} rkType='secondary2 inverseColor'>
              {CommonUtils.formatMoney(coupon.value)} đ - {CommonUtils.formatMoney(coupon.price)} đ
            </RkText>
          </View>

          <View style={{ alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 50, flexDirection: 'row', }}>
            <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: 50 }} onPress={() => this.like()}>
              <RkText rkType='awesome primary'>
                {this.state.isLiked ? FontAwesome.heart : FontAwesome.emptyHeart}
              </RkText>
            </TouchableOpacity>

            <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50 }} onPress={() => this.props.navigation.navigate('Comments')}>
              <RkText style={{}} rkType='awesome primary'>
                {FontAwesome.comment}
              </RkText>
            </TouchableOpacity>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileV3')}>
                <Avatar img={require('../../data/img/photo32.jpg')}
                  rkType='circle'
                  style={{ width: 50, height: 50, }}
                />
              </TouchableOpacity>
            </View>

          </View>
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
    marginHorizontal: 10
  },
  time: {
    marginTop: 5
  }
}));


CouponCard.props = {
  coupon: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
}

export default CouponCard
