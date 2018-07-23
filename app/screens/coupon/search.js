import React from 'react'
import {
  FlatList,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { RkStyleSheet, RkText, RkTextInput, RkButton } from 'react-native-ui-kitten';
import couponApi from '../../api/couponApi';
import categoryApi from '../../api/categoryApi';
import { CouponCard, RkSwitch, GradientButton } from '../../components'
import { FontAwesome } from '../../assets/icons'
import { UIConstants } from '../../config/appConstants'
import loadingGif from '../../assets/images/loading.gif'

export class Search extends React.Component {
  static navigationOptions = {
    title: 'Search'.toUpperCase()
  }

  constructor(props) {
    super(props)

    this.state = {
      isShowForm: true,
      categories: [],
      result: null,
      filters: {
        categorieIds: [],
        nearBy: true
      }
    }
  }

  componentDidMount() {
    this.loadCategories()
  }

  async loadCategories() {
    const categories = await categoryApi.getAll()

    this.setState({
      categories
    })
  }

  selectCategory(id) {
    const { filters } = this.state
    const { categorieIds } = filters

    if (categorieIds.includes(id)) {
      const index = categorieIds.indexOf(id)
      categorieIds.splice(index, 1)
    } else {
      categorieIds.push(id)
    }

    this.setState({
      filters: {
        ...filters,
        categorieIds
      }
    })
  }

  renderCategories() {
    const { categories, filters } = this.state
    const { categorieIds } = filters

    const items = categories.map((category, index) => {
      const isSelected = categorieIds.includes(category.id)
      const borderColor = isSelected ? 'orange' : '#fff'
      const borderBottomWidth = isSelected ? 5 : 0

      return (
        <View key={index}>
          <RkButton rkType='tile'
            style={{ height: 90, width: 90, borderWidth: 0, borderColor, borderBottomWidth }}
            key={index}
            onPress={() => {
              this.selectCategory(category.id)
            }}>
            <Image source={{ uri: `${UIConstants.ApiHost}${category.image}` }} style={styles.icon} />
            <RkText rkType='small primary3' style={{ fontSize: 12 }}>{category.name}</RkText>
          </RkButton>
        </View>
      )
    })

    return (
      <ScrollView
        horizontal
        style={{
          paddingVertical: 8,
          borderWidth: 0
        }}
      >
        {items}
      </ScrollView>
    )
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
    const { isShowForm } = this.state

    return (
      <View key='searchButton' style={{
        position: 'absolute',
        top: -37,
        right: 5,
        zIndex: 9999999
      }}>
        <TouchableOpacity
          onPress={() => this.toggleSearchForm()}
          style={{
            paddingHorizontal: 20
          }}
        >
          <RkText rkType='awesome' style={{ color: '#ffffff' }}>
            {isShowForm ? FontAwesome.times : FontAwesome.search}
          </RkText>
        </TouchableOpacity>
      </View>
    )
  }

  toggleSearchForm() {
    this.setState({
      isShowForm: !this.state.isShowForm
    })
  }

  async search() {
    const { filters } = this.state

    const keyword = this.keywordInput.refs.input._lastNativeText
    if (keyword && keyword.trim() !== '') {
      filters.keyword = keyword
    }

    const res = await couponApi.search(filters)
    const result = await res.json()
    if (!Array.isArray(result)) {
      alert('Can not load data. Please try again!')
      return
    }

    this.setState({
      isShowForm: false,
      result
    })
  }

  rednerSearchForm() {
    const { filters } = this.state

    return (
      <View style={styles.searchForm}>
        <RkText rkType='primary3'>Tìm kiếm</RkText>
        <RkTextInput rkType='rounded' ref={ref => this.keywordInput = ref} />
        <RkText rkType='primary3'>Danh mục</RkText>
        {this.renderCategories()}
        <View style={{ flex: 0, flexDirection: 'row' }}>
          <RkText rkType='primary3' style={{ flex: 1, alignItems: 'flex-start' }}>Vị trí</RkText>
          <View style={{ flex: 0, flexDirection: 'row', alignItems: 'flex-end' }}>
            <RkSwitch
              value={filters.nearBy}
              name="Gần đây"
              style={{ height: 10 }}
              onValueChange={(nearBy) => this.setState({ filters: { ...filters, nearBy } })} />
            <RkText rkType='primary3' style={{ marginBottom: 6 }}>Tìm quanh đây?</RkText>
          </View>
        </View>
        <GradientButton
          onPress={() => this.search()}
          rkType='medium' style={{ marginTop: 6 }} text='Tìm' />
      </View >
    )
  }

  renderListResult() {
    const { result } = this.state

    if (result === null) {
      return (
        <View style={{ flex: 1, flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
          <Image source={loadingGif} style={{ width: 100, height: 100, }} />
        </View>
      )
    } else if (result.length === 0) {
      return (
        <View style={{ flex: 1, flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
          <RkText rkType='primary3'>Không có dữ liệu!</RkText>
        </View>
      )
    }

    console.log(result)

    return (
      <View style={styles.container}>
        <FlatList
          data={result}
          shouldItemUpdate={(props, nextProps) => {
            return props.item !== nextProps.item
          }}
          renderItem={itemData => this.renderItem(itemData)}
          keyExtractor={(itemData, _index) => this.keyExtractor(itemData, _index)}
          style={{flex: 1}}
        />
      </View>
    )
  }

  render() {

    const { isShowForm } = this.state
    const result = []
    result.push(this.renderSearchButton())

    result.push(
      <View key='main' style={{flex: 1, flexDirection: 'column'}}>
        {isShowForm && this.rednerSearchForm()}
        {this.renderListResult()}
      </View>
    )

    return result
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
    padding: 14,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItemsL: 'flex-end',
    backgroundColor: theme.colors.screen.scroll,
    paddingTop: 8,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10
  },
  switch: {
    marginVertical: 14
  },
}));
