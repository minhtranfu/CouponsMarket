import React from 'react';
import {
  FlatList,
  View,
  ScrollView
} from 'react-native';
import { RkStyleSheet } from 'react-native-ui-kitten';
import couponApi from '../../api/couponApi';
import { Walkthrough } from '../../components/walkthrough';
import { PaginationIndicator } from '../../components';
import CouponCart from '../../components/coupon/couponCard'

export class ListCoupon extends React.Component {
  static navigationOptions = {
    title: 'List Coupon'.toUpperCase()
  };

  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      data: []
    }
  }

  async componentWillMount() {
    const res = await couponApi.getPage(1, 10)
    const data = await res.json()
    this.setState({
      data
    })
  }

  keyExtractor(coupon, index) {
    return coupon.id;
  }

  renderItem(data) {
    const coupon = data.item
    const { navigation } = this.props

    return <CouponCart key={coupon.id} coupon={coupon} navigation={navigation} />
  }

  changeIndex(index) {
    this.setState({ index })
  }

  render() {
    const { data, index } = this.state
    const sliders = data.map(item => {
      return this.renderItem({ item })
    })

    return (
      <ScrollView>
        <FlatList
          data={data}
          renderItem={itemData => this.renderItem(itemData)}
          keyExtractor={(itemData, _index) => this.keyExtractor(itemData, _index)}
          style={styles.container}
        />
        <View style={styles.carousel}>
          <Walkthrough onChanged={(index) => this.changeIndex(index)} style={{ width: '100%', height: 300 }}>
            {sliders}
          </Walkthrough>
          <PaginationIndicator length={data.length} current={index} />
        </View>
      </ScrollView >
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingTop: 8,
  },
  carousel: {
    backgroundColor: theme.colors.screen.scroll,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 14
  }
}));
