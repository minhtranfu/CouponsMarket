import React from 'react'
import {
  FlatList,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { RkStyleSheet, RkText, RkButton } from 'react-native-ui-kitten';
import couponApi from '../../api/couponApi';
import { CouponCard } from '../../components'
import { FontAwesome } from '../../assets/icons'
import loadingGif from '../../assets/images/loading.gif'

export class Category extends React.Component {
  static navigationOptions = ({ navigation }) => {

    const categoryName = navigation.getParam('name', false);

    return {
      headerTitle: <View style={{ alignItems: 'center' }}><RkText rkType='header5' style={{ color: '#ffffff' }}>{categoryName.toUpperCase()}</RkText></View>,
      headerRight: (
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Search')}
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
  }

  constructor(props) {
    super(props)

    this.state = {
      data: null
    }
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const { saveState, navigation } = this.props
    const categoryId = navigation.getParam('id')

    const res = await couponApi.getCouponsByCategory({
      page: 1,
      pageSize: 10,
      categoryId
    })

    const data = await res.json()
    console.log(data)

    if (!Array.isArray(data)) {
      alert('Can not load data. Please notify the app owner!')
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

    return <CouponCard key={coupon.id} coupon={coupon} navigation={navigation} />
  }

  render() {
    const { data } = this.state

    if (data === 0) {
      return (
        <View style={{ flex: 1, flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
          <Image source={loadingGif} style={{ width: 100, height: 100 }} />
        </View>
      )
    } else if (data.length === 0) {
      return (
        <View style={{ flex: 1, flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
          <RkText rkType='primary3' style={{flex: 1, alignItems: 'center'}}>Không có dữ liệu!</RkText>
        </View>
      )
    }

    return (
      <View>
        <FlatList
          data={data}
          shouldItemUpdate={(props, nextProps) => {
            return props.item !== nextProps.item
          }}
          renderItem={itemData => this.renderItem(itemData)}
          keyExtractor={(itemData, _index) => this.keyExtractor(itemData, _index)}
          style={styles.container}
          onEndReached={() => alert('End reached')}
          onEndThreshold={0}
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
