import React from 'react'
import {
  FlatList,
  View,
  Image
} from 'react-native';
import { RkStyleSheet, RkText, RkButton } from 'react-native-ui-kitten';
import { Walkthrough } from '../../../components/walkthrough';
import { PaginationIndicator } from '../../../components';
import couponApi from '../../../api/couponApi';
import CouponCart from '../../../components/coupon/couponCard'
import { FontAwesome } from '../../../assets/icons'
import loadingGif from '../../../assets/images/loading.gif'

export class NewFeed extends React.Component {
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

    if (data.length === 0) {
      return (
        <View style={{flex: 1, flexDirection: 'column', alignContent: 'center', alignItems: 'center'}}>
          <Image source={loadingGif} style={{width: 100, height: 100}}/>
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
