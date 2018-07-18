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

export class CouponView extends React.Component {
  static navigationOptions = {
    title: 'Coupon Details',
  };

  constructor(props) {
    super(props);

    this.state = {
      couponId: '',
      isLiked: false,
    }

    const { navigation } = this.props;
    this.coupon = navigation.getParam('coupon', false);
  }

  _renderImage(image) {
    const couponImages = this.coupon.images
    if (!Array.isArray(couponImages) || couponImages.length === 0) {
      return
    }
    const imageUri = couponImages[0].path

    // let contentHeight = scaleModerate(375, 1);
    const width = Dimensions.get('window').width - 40
    const height = width * 9 / 16

    image = (<Image style={[styles.image, { height, width, marginTop: 10 }]}
      source={{ uri: `${UIConstants.ApiHost}${imageUri}` }} />);
    return image;
  }

  like() {
    this.setState({
      isLiked: !this.state.isLiked,
    })
  }

  render() {
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
          <View style={styles.container}>

            {/* Icon like Comment Ava */}
            <View style={[styles.textRow, { alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 50, }]}>
              <RkText style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }} rkType='awesome primary' onPress={() => this.like()}>
                {this.state.isLiked ? FontAwesome.heart : FontAwesome.emptyHeart}
              </RkText>
              <RkText style={{}} rkType='awesome primary' onPress={() => this.props.navigation.navigate('Comments')}>
                {FontAwesome.comment}
              </RkText>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileV3')}>
                  <Avatar img={require('../../data/img/photo32.jpg')}
                    rkType='circle'
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.section}>
              <View style={[styles.row, styles.heading]}>
                <RkText rkType='header6 primary'>{coupon.title}</RkText>
              </View>

              {/* Company */}
              <View style={styles.row}>
                <View style={styles.content}>
                  <View style={styles.contentHeader}>
                    <RkText style={{ color: 'lightgray', }} rkType=''>
                      Company
                    </RkText>
                    <RkText rkType='header5'>
                      {coupon.company}
                    </RkText>
                  </View>
                </View>
              </View>

              {/* Price */}
              <View style={styles.row}>
                <View style={styles.content}>
                  <View style={styles.contentHeader}>
                    <RkText style={{ color: 'lightgray', }} rkType=''>
                      Price:
                    </RkText>
                    <RkText rkType='header5'>
                      {commonUtils.formatMoney(coupon.price)} VND
                  </RkText>
                  </View>
                </View>
              </View>

              {/* Quantity */}
              <View style={styles.row}>
                <View style={styles.content}>
                  <View style={styles.contentHeader}>
                    <RkText style={{ color: 'lightgray', }} rkType=''>
                      Quantity:
                    </RkText>
                    <RkText rkType='header5'>
                      {coupon.quantity}
                    </RkText>
                  </View>
                </View>
              </View>

              {/* Discount */}
              <View style={styles.row}>
                <View style={styles.content}>
                  <View style={styles.contentHeader}>
                    <RkText style={{ color: 'lightgray', }} rkType=''>
                      Discount:
                    </RkText>
                    <RkText rkType='header5'>
                      {commonUtils.formatMoney(coupon.value)}
                    </RkText>
                  </View>
                </View>
              </View>

              {/* Area */}
              <View style={styles.row}>
                <View style={styles.content}>
                  <View style={styles.contentHeader}>
                    <RkText style={{ color: 'lightgray', }} rkType=''>
                      Area:
                    </RkText>
                    <RkText rkType='header5'>
                      {coupon.area}
                    </RkText>
                  </View>
                </View>
              </View>

              {/* Start  time */}
              <View style={styles.row}>
                <View style={styles.content}>
                  <View style={styles.contentHeader}>
                    <RkText style={{ color: 'lightgray', }} rkType=''>
                      Start time:
                    </RkText>
                    <RkText rkType='header5'>
                      {coupon.validTime}
                    </RkText>
                  </View>
                </View>
              </View>

              {/* End time */}
              <View style={styles.row}>
                <View style={styles.content}>
                  <View style={styles.contentHeader}>
                    <RkText style={{ color: 'lightgray', }} rkType=''>
                      End time:
                    </RkText>
                    <RkText rkType='header5'>
                      {coupon.expiredTime}
                    </RkText>
                  </View>
                </View>
              </View>
            </View>

            <RkText>Description:</RkText>
            <RkText>{coupon.description}</RkText>

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
    marginVertical: 25
  },
  heading: {
    paddingBottom: 12.5
  },
  row: {
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
  },
  content: {
    marginLeft: 16,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
}));
