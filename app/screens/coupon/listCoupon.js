import React from 'react';
import {
  FlatList,
  View,
  ScrollView
} from 'react-native';
import { RkStyleSheet, RkText, RkButton } from 'react-native-ui-kitten';
import couponApi from '../../api/couponApi';
import { Walkthrough } from '../../components/walkthrough';
import { PaginationIndicator } from '../../components';
import CouponCart from '../../components/coupon/couponCard'
import { ListCouponBottomBar } from '../../components'
import { FontAwesome } from '../../assets/icons'
import { GradientButton } from '../../components'

export class ListCoupon extends React.Component {

  static navigationOptions = {
    title: 'List Coupon'.toUpperCase(),
  };

  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      data: []
    }
  }

  handleTabChanged(id) {
    alert(id)
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

  render() {
    const { data, index } = this.state
    const sliders = data.map(item => {
      return this.renderItem({ item })
    })

    return (
      [<ScrollView key='list-coupon' style={styles.mainContainer}>
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
      </ScrollView>,
      <View key='bottom-bar' style={{
        height: 50,
        backgroundColor: 'orange',
        position: 'absolute',
        flex: 1,
        bottom: 0,
        left: 0,
        right: 0
      }}>
        <ListCouponBottomBar index={0} onTabChanged={id => this.handleTabChanged(id)} />
      </View>
      ]
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
    fontFamily: 'fontawesome',
    fontSize: 12,
    height: 30
  },
  buttonContent: {
    fontFamily: 'fontawesome',
    fontSize: 12,
  }
}));
