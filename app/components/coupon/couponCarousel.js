import React from 'react';
import {
  View,
  Image
} from 'react-native';
import { RkStyleSheet, RkText, RkButton } from 'react-native-ui-kitten';
import { PaginationIndicator, Walkthrough } from '../';
import { FontAwesome } from '../../assets/icons'
import CouponCard from './couponCard'
import loadingGif from '../../assets/images/loading.gif'

import couponApi from '../../api/couponApi';

export class CouponCarousel extends React.Component {

  constructor(props) {
    super(props)

    const { savedState } = props

    if (savedState) {
      this.state = savedState
    } else {
      this.state = {
        index: 0,
        data: []
      }
    }
  }

  componentWillUnmount() {
    const { saveState } = this.props

    if (saveState) {
      saveState(this.state)
    }
  }

  componentDidMount() {
    if (this.state.data.length === 0) {
      this.loadData();
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

  renderItem(data) {
    const coupon = data.item
    const { navigation } = this.props

    return <CouponCard key={coupon.id} coupon={coupon} navigation={navigation} />
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

  changeIndex(index) {
    this.setState({ index })
  }

  render() {
    const { index, data } = this.state
    const sliders = this.renderSliders()
    const { style } = this.props

    if (data.length === 0) {
      return (
        <View style={{ flex: 1, flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
          <Image source={loadingGif} style={{ width: 100, height: 100 }} />
        </View>
      )
    }

    return (
      <View style={style}>
        <View>
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
      </View>
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
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
