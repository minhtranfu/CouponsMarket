import React from 'react'
import {
  FlatList,
  View,
  Image
} from 'react-native';
import { RkStyleSheet, RkText, RkButton } from 'react-native-ui-kitten';
import couponApi from '../../../api/couponApi';
import { CouponCard } from '../../../components'
import loadingGif from '../../../assets/images/loading.gif'

export class NewFeed extends React.Component {
  constructor(props) {
    super(props)

    const { savedState } = props

    if (savedState) {
      this.state = savedState
    } else {
      this.state = {
        data: []
      }
    }
  }

  componentDidMount() {
    if (this.state.data.length === 0) {
      this.loadData();
    }
  }

  componentWillUnmount() {
    const { saveState } = this.props

    if (saveState) {
      saveState(this.state)
    }
  }

  async loadData() {
    const { saveState } = this.props

    const res = await couponApi.getPage(1, 10)
    const data = await res.json()
    if (!Array.isArray(data)) {
      alert('Can not load data. Please notify the app owner!')
      return
    }

    if (saveState) {
      saveState({
        ...this.state,
        data
      })
    }

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

    return <CouponCard key={coupon.id} coupon={coupon} navigation={navigation} />
  }

  render() {
    const { data } = this.state

    if (data.length === 0) {
      return (
        <View style={{ flex: 1, flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
          <Image source={loadingGif} style={{ width: 100, height: 100 }} />
        </View>
      )
    }

    return (
      <View>
        <FlatList
          data={data}
          renderItem={itemData => this.renderItem(itemData)}
          keyExtractor={(itemData, _index) => this.keyExtractor(itemData, _index)}
          style={styles.container}
          // onEndReached={() => alert('End reached')}
          // onEndThreshold={500}
        />
      </View>
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  mainContainer: {
    marginBottom: 50,
  },
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingTop: 8,
  },
}));
