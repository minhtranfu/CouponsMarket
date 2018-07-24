import React from 'react'
import {
  FlatList,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { RkStyleSheet, RkText, RkButton } from 'react-native-ui-kitten';
import couponApi from '../../api/couponApi'
import { CouponCard } from '../../components'

import loadingGif from '../../assets/images/loading.gif'
import shieldPng from '../../assets/images/shield.png'
import { FontAwesome } from '../../assets/icons'

export class PaymentMethod extends React.Component {
  static navigationOptions = {
    title: 'Phương thức thanh toán'
  }

  constructor(props) {
    super(props)

    const { navigation } = props
    this.coupon = navigation.getParam('coupon', false);
    console.log(this.coupon)
  }

  render() {
    const { navigation } = this.props

    return (
      <View style={styles.root}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cards', { coupon: this.coupon })}
        >
          <View style={styles.method}>
            <RkText rkType='awesome'>
              <Text style={styles.methodIcon}>{FontAwesome.creditCard}</Text> Thẻ thanh toán quốc tế
          </RkText>
          </View>
        </TouchableOpacity>
        <View style={styles.method}>
          <RkText rkType='awesome'>
            <Text style={styles.methodIcon}>{FontAwesome.creditCardAlt}</Text> Internet Banking
          </RkText>
        </View>
        <View style={styles.method}>
          <RkText rkType='awesome'>
            <Text style={[styles.methodIcon, { marginHorizontal: 30 }]}>{FontAwesome.bolt}</Text> Thẻ cào
          </RkText>
        </View>

        <View style={styles.protectedNoti}>
          <Image source={shieldPng} style={{ width: 120, height: 120 }} />
          <RkText rkType='primary3' style={styles.protectedMessage}>Thanh toán an toàn được chứng nhận bởi tổ chức VISA, tổ chức thanh toán quốc tế GlobalSign</RkText>
        </View>
      </View>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
    flex: 1,
  },
  method: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
  },
  methodIcon: {
    color: 'orange',
  },
  protectedNoti: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 45,
    marginHorizontal: 30
  },
  protectedMessage: {
    textAlign: 'center',
    marginTop: 20,
  },
}))
