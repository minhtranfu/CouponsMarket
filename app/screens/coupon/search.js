import React from 'react'
import {
  FlatList,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { RkStyleSheet, RkText, RkTextInput } from 'react-native-ui-kitten';
import couponApi from '../../api/couponApi';
import { CouponCard } from '../../components'
import { FontAwesome } from '../../assets/icons'
import loadingGif from '../../assets/images/loading.gif'

export class Search extends React.Component {
  static navigationOptions = {
    title: 'Search'.toUpperCase()
  }

  constructor(props) {
    super(props)

    this.state = {
      result: []
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

  renderSearchButton() {
    return (
      <View key='searchButton' style={{
        position: 'absolute',
        top: -37,
        right: 5,
        zIndex: 9999999
      }}>
        <TouchableOpacity
          onPress={() => alert('Search')}
          style={{
            paddingHorizontal: 20
          }}
        >
          <RkText rkType='awesome' style={{ color: '#ffffff' }}>
            {FontAwesome.search}
          </RkText>
        </TouchableOpacity>
      </View>
    )
  }

  rednerSearchForm() {
    return (
      <View style={styles.searchForm}>
        <RkText rkType='primary3'>Search</RkText>
        <RkTextInput rkType='rounded' />
        <RkText rkType='primary3'>Category filter</RkText>
        <View><RkText>List Categories here</RkText></View>
        <RkText rkType='primary3'>Area filters</RkText>
        <View><RkText>List Categories here</RkText></View>
      </View>
    )
  }

  renderListResult() {
    const { result } = this.state

    if (result.length === 0) {
      return (
        <View style={{ flex: 1, flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
          <Image source={loadingGif} style={{ width: 100, height: 100 }} />
        </View>
      )
    }

    return (
      <FlatList
        data={result}
        shouldItemUpdate={(props, nextProps) => {
          return props.item !== nextProps.item
        }}
        renderItem={itemData => this.renderItem(itemData)}
        keyExtractor={(itemData, _index) => this.keyExtractor(itemData, _index)}
        style={styles.container}
        onEndReached={() => alert('End reached')}
        onEndThreshold={0}
      />
    )
  }

  render() {

    return (
      [
        this.renderSearchButton(),
        (
          <View key='main'>
            {this.rednerSearchForm()}
            {this.renderListResult()}
          </View>
        )
      ]
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  mainContainer: {
    marginBottom: 50,
    flex: 1,
    flexDirection: 'column',
  },
  searchForm: {
    flex: 0,
    alignItems: 'flex-start',
    paddingHorizontal: 14
  },
  container: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: theme.colors.screen.scroll,
    paddingTop: 8,
  },
}));
