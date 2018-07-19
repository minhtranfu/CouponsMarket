import React from 'react'
import {
  FlatList,
  View,
} from 'react-native';
import { RkStyleSheet, RkText, RkButton } from 'react-native-ui-kitten';
import { Walkthrough } from '../../../components/walkthrough';
import { PaginationIndicator } from '../../../components';
import couponApi from '../../../api/couponApi';
import CouponCart from '../../../components/coupon/couponCard'
import { FontAwesome } from '../../../assets/icons'

export class NewFeed extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      index: 0,
      data: []
    }
  }

  componentWillMount() {
    this.loadData()
  }

  async loadData() {
    const res = await couponApi.getPage(1, 10)
    const data = await res.json()
    if (!Array.isArray(data)) {
      alert('Can not load data. Please check your connection or notify the app owner!')
      return
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

    return <CouponCart key={coupon.id} coupon={coupon} navigation={navigation} />
  }

  changeIndex(index) {
    this.setState({ index })
  }

  renderSliders() {
    const { data } = this.state

    if (!Array.isArray(this.sliders) || this.sliders.length === 0) {
      this.sliders = data.map(item => {
        return this.renderItem({ item })
      })
    }

    return this.sliders
  }

  render() {
    const { index, data } = this.state
    const sliders = this.renderSliders()

    return (
      <View>
        <FlatList
          data={data}
          renderItem={itemData => this.renderItem(itemData)}
          keyExtractor={(itemData, _index) => this.keyExtractor(itemData, _index)}
          style={styles.container}
        />
        <View style={styles.sectionHeader}>
          <RkText rkType='primary header6' style={styles.title}>
            {('Category Name').toUpperCase()}
          </RkText>
          <View style={styles.viewMore}>
            <RkButton rkType='warning outline small' style={styles.viewMoreButton} contentStyle={styles.buttonContent}>
              MORE {FontAwesome.chevronRight}
            </RkButton>
          </View>
        </View>
        <View style={styles.carousel}>
          <Walkthrough onChanged={(index) => this.changeIndex(index)} style={{ width: '100%', height: 300 }}>
            {sliders}
          </Walkthrough>
          <PaginationIndicator length={data.length} current={index} />
        </View>
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
  carousel: {
    backgroundColor: theme.colors.screen.scroll,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 14
  },
  sectionHeader: {
    paddingRight: 10,
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  viewMore: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 30,
    marginTop: 7,
  },
  viewMoreButton: {
    height: 30
  },
  buttonContent: {
    fontFamily: 'fontawesome',
    fontSize: 12,
  }
}));
