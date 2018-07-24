import React from 'react'
import {
  FlatList,
  View,
  Image
} from 'react-native';
import { RkStyleSheet, RkText, RkButton } from 'react-native-ui-kitten';
import couponApi from '../../api/couponApi';
import { CouponCard } from '../../components'
import loadingGif from '../../assets/images/loading.gif'
import { FontAwesome } from '../../assets/icons'

export class PaymentMethod extends React.Component {
  render() {
    <View style={styles.root}>
      <View style={styles.method}>
        <RkText rkType='awesome'>
          {FontAwesome.creditCard} Thẻ thanh toán quốc tế
        </RkText>
      </View>
      <View style={styles.method}>
        <RkText rkType='awesome'>
          {FontAwesome.creditCardAlt} Internet Banking/ATM nội địa
        </RkText>
      </View>
      <View style={styles.method}>
        <RkText rkType='awesome'>
          {FontAwesome.bolt} Thẻ cào
        </RkText>
      </View>
    </View>
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  method: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
  },
}))
