import React from 'react';
import {
  View,
  Image,
  Dimensions,
  Keyboard,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import { FontAwesome } from '../../assets/icons';
import { Avatar } from '../../components';
import { GradientButton } from '../../components/gradientButton';
import { scale, scaleModerate, scaleVertical } from '../../utils/scale';
import commonUtils from '../../utils/common'
import { UIConstants } from '../../config/appConstants'
import Communications from 'react-native-communications'

export class CouponView extends React.Component {
  static navigationOptions = {
    title: 'Thông tin chi tiết',
  };

  constructor(props) {
    super(props);

    const { navigation } = this.props;
    this.coupon = navigation.getParam('coupon', false);
    const isLiked = !!this.coupon.isFollowing.id || false

    this.state = {
      isLiked,
    }
  }

  _renderImage() {
    const couponImages = this.coupon.images
    if (!Array.isArray(couponImages) || couponImages.length === 0) {
      return
    }
    const imageUri = couponImages[0].path

    // let contentHeight = scaleModerate(375, 1);
    const width = Dimensions.get('window').width - 40
    const height = width * 9 / 16

    image = (
      <View>
        <Image style={[styles.image, { height, width, marginTop: 10 }]}
          source={{ uri: `${UIConstants.ApiHost}${imageUri}` }} />
        <TouchableOpacity style={{
          flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: 50,
          position: 'absolute',
          bottom: 10,
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
        }} onPress={() => this.follow()}>
          <RkText rkType='awesome primary'>
            {this.state.isLiked ? FontAwesome.heart : FontAwesome.emptyHeart}
          </RkText>
        </TouchableOpacity>
      </View>
    );
    return image;
  }

  like() {
    this.setState({
      isLiked: !this.state.isLiked,
    })
  }

  render() {
    const { navigation } = this.props
    const coupon = this.coupon
    if (!coupon) {
      return (<RkText>Something went wrong!</RkText>)
    }

    const image = this._renderImage();

    return (
      <ScrollView style={styles.root}>
        <RkAvoidKeyboard
          onStartShouldSetResponder={(e) => true}
          onResponderRelease={(e) => Keyboard.dismiss()}
          style={styles.screen}>
          {image}
          <View style={[styles.row, styles.heading]}>
            <RkText rkType='header4 primary' style={{ flex: 1, flexDirection: 'row' }}>{coupon.title}</RkText>
          </View>
          <View style={styles.container}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'flex-start' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ flex: 1, flexDirection: 'row' }}>
                  <Avatar img={require('../../data/img/photo32.jpg')}
                    rkType='circle'
                  />
                  <RkText rkType='primary3' style={{ marginLeft: 5 }}>{coupon.user.fullName}</RkText>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'flex-end', }}>
                <RkButton rkType='outline small' style={styles.actionButton}
                  contentStyle={{ fontFamily: 'fontawesome' }}
                  onPress={() => Communications.phonecall('01268115769', false)}>
                  {FontAwesome.phone}
                </RkButton>
                <RkButton rkType='outline small' style={styles.actionButton}
                  contentStyle={{ fontFamily: 'fontawesome' }}
                  onPress={() => Communications.text('01268115769', `Chào bạn, mình quan tâm đến phiếu giảm giá ${coupon.title} trên Coupons Market`)}>
                  {FontAwesome.commentingO}
                </RkButton>
              </View>
            </View>

            {/* Icon like Comment Ava */}
            {/* <View style={[styles.textRow, { alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 50, }]}>
              <RkText style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }} rkType='awesome primary' onPress={() => this.like()}>
                {this.state.isLiked ? FontAwesome.heart : FontAwesome.emptyHeart}
              </RkText>
              <RkText style={{}} rkType='awesome primary' onPress={() => this.props.navigation.navigate('Comments')}>
                {FontAwesome.commentsO}
              </RkText>
            </View> */}
            {!!coupon.isECoupon &&
              <GradientButton rkType='small' style={{ marginHorizontal: 48, marginTop: 10 }} text='MUA NGAY'
                onPress={() => navigation.navigate('PaymentMethod', { coupon })}
              />
            }

            <View style={styles.section}>
              {/* Company */}
              <View style={styles.contentHeader}>
                <RkText style={styles.infoName} rkType='header6'>
                  Công ty:
                </RkText>
                <RkText rkType='header6'>
                  {coupon.company.name}
                </RkText>
              </View>

              {/* Discount */}
              <View style={styles.contentHeader}>
                <RkText style={styles.infoName} rkType='header6'>
                  Giảm giá:
                </RkText>
                <RkText rkType='header6 warningColor'>
                  {coupon.value === 0 ? 'Free 100%' : (commonUtils.formatMoney(coupon.value) + (coupon.isCredit ? ' đ' : ' %'))}
                </RkText>
              </View>

              {/* Price */}
              <View style={styles.contentHeader}>
                <RkText style={styles.infoName} rkType='header6'>
                  Giá bán:
                </RkText>
                <RkText rkType='header6 primary'>
                  {coupon.price === 0 ? 'Free' : commonUtils.formatMoney(coupon.price) + ' đ'}
                </RkText>
              </View>

              {/* Quantity */}
              {coupon.quantity &&
                <View style={styles.contentHeader}>
                  <RkText style={styles.infoName} rkType='header6'>
                    Số lượng:
                  </RkText>
                  <RkText rkType='header6'>
                    {coupon.quantity}
                  </RkText>
                </View>
              }

              {/* Area */}
              {/* <View style={styles.contentHeader}>
                <RkText style={styles.infoName} rkType='header6'>
                  Address:
                </RkText>
                <RkText rkType='header6'>
                  {coupon.address}
                </RkText>
              </View> */}

              {/* Start  time */}
              <View style={styles.contentHeader}>
                <RkText style={styles.infoName} rkType='header6'>
                  Áp dụng từ:
                </RkText>
                <RkText rkType='header6'>
                  {coupon.validTime}
                </RkText>
              </View>

              {/* End time */}
              {coupon.expiredTime &&
                <View style={styles.contentHeader}>
                  <RkText style={styles.infoName} rkType='header6'>
                    Hết hạn:
                  </RkText>
                  <RkText rkType='header6'>
                    {coupon.expiredTime}
                  </RkText>
                </View>
              }

            </View>

            <RkText rkType='header6 awesome'>{FontAwesome.location}  Địa chỉ:</RkText>
            <RkText rkType='primary3' style={{ marginBottom: 10, marginLeft: 10 }}>{coupon.address}</RkText>

            <RkText rkType='header6 awesome'>{FontAwesome.infoCircle} Mô tả:</RkText>
            <RkText rkType='primary3' style={{ marginBottom: 10, marginLeft: 10 }}>{coupon.description}</RkText>

          </View>
        </RkAvoidKeyboard>
      </ScrollView>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.screen.base
  },
  image: {
    resizeMode: 'cover',
    marginBottom: scaleVertical(10),
  },
  container: {
    paddingHorizontal: 17,
    paddingBottom: scaleVertical(22),
    flex: -1
  },
  detailRow: {
    fontSize: 16,
  },
  footer: {
    justifyContent: 'flex-end',
    flex: 1
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: scaleVertical(24)
  },
  button: {
    marginHorizontal: 14
  },
  save: {
    marginVertical: 9
  },
  textRow: {
    flexDirection: 'row',
  },
  textDanger: {
    color: theme.colors.danger
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  section: {
    marginVertical: 10
  },
  infoName: {
    color: '#868686'
  },
  heading: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 18,
    marginBottom: 10,
    paddingBottom: 8,
    paddingLeft: 10
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    padding: 0,
    marginHorizontal: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
  },
  actionButton: {
    width: 35,
    height: 35,
    borderRadius: 35,
    marginHorizontal: 10
  },
}));
