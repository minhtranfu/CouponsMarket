import React from 'react';
import {
  View,
  Image,
  Clipboard,
  ToastAndroid,
} from 'react-native'
import {
  RkText,
  RkButton,
  RkStyleSheet,
} from 'react-native-ui-kitten'
import { NavigationActions, StackActions } from 'react-navigation';
import commonUtils from '../../utils/common'
import { GradientButton } from '../../components'
import Communications from 'react-native-communications'

import piggyBankPng from '../../assets/images/piggy-bank.png'

export class BuySuccess extends React.Component {
  static navigationOptions = {
    title: 'Mua thành công'.toUpperCase()
  }

  constructor(props) {
    super(props)

    const { navigation } = props
    this.coupon = navigation.getParam('coupon', {})
  }

  copyCode() {
    Clipboard.setString(this.coupon.coupon)
    ToastAndroid.showWithGravity(
      'Mã đã được sao chép!',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  }

  navigateToHome() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'HomeMain' })
      ]
    });
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    const { navigation } = this.props

    const message = this.coupon.isCredit ?
      `Chúc mừng, bạn vừa tiết kiệm được ${commonUtils.formatMoney(this.coupon.value - this.coupon.price)}đ với mã khuyến mãi bên dưới!`
      : `Chúc mừng, bạn sẽ tiết kiệm được ${this.coupon.value}% chi phí với mã khuyến mãi bên dưới!`

    return (
      <View style={styles.root}>
        <Image source={piggyBankPng} style={styles.piggyBank} />
        <RkText rkType='primary3' style={styles.message}>{message}</RkText>
        <RkText rkType='primary1' style={styles.couponCode}>{this.coupon.coupon}</RkText>
        <RkButton rkType='small success outline'
          onPress={() => this.copyCode()}
        >COPY</RkButton>
        {!!this.coupon.applyAt &&
          <RkText
            rkType='primary3 info' style={styles.weblink}
            onPress={() => Communications.web(this.coupon.applyAt)}
          >
            Đi đến tran sử dụng mã khuyến mãi
          </RkText>
        }
        <GradientButton rkType='large' style={styles.homeButton} text='TIẾP TỤC TIẾT KIỆM'
          onPress={() => this.navigateToHome()}
        />
      </View>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  piggyBank: {
    width: 128,
    height: 128,
    marginTop: 40,
    marginBottom: 10,
  },
  message: {
    textAlign: 'center'
  },
  couponCode: {
    marginVertical: 25,
    fontSize: 30,
    color: '#f64e59',
  },
  homeButton: {
    marginTop: 50
  },
  weblink: {
    textDecorationLine: 'underline',
    marginTop: 30
    // color: '#19bfe5'
  }
}))
