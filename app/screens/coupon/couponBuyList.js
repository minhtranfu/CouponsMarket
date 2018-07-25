import React from 'react';
import {
  FlatList,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { RkStyleSheet, RkText } from 'react-native-ui-kitten';
import { ListCouponBottomBar, CouponCarousel } from '../../components'
import { FontAwesome } from '../../assets/icons'
import { NewFeed } from './list/feed'
import FindByLocation from './findByLocation'

export class CouponBuyList extends React.Component {

  static navigationOptions = ({ navigation }) => {

    return {
      headerTitle: <View style={{ alignItems: 'center' }}><RkText rkType='header5' style={{ color: '#ffffff' }}>{'Đã mua'.toUpperCase()}</RkText></View>,
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
    super(props);

    this.state = {
      index: 0,
      data: [],
      savedState: {}
    }
  }

  handleTabChanged(id) {
    this.setState({ index: id })
  }

  changeIndex(index) {
    this.setState({ index })
  }

  saveState(name, state) {
    this.setState({
      savedState: {
        ...this.state.savedState,
        [name]: state
      }
    })
  }

  renderTabContents() {
    const { navigation } = this.props
    const { savedState } = this.state
    const tabs = []

    tabs.push(
      <NewFeed navigation={navigation}
        saveState={state => this.saveState('Buyed', state)}
        savedState={savedState.NewFeed}
      />
    )

    // tabs.push(
    //   <CouponCarousel
    //     style={{ flex: 1 }}
    //     navigation={navigation}
    //     saveState={state => this.saveState('CouponCarousel', state)}
    //     savedState={savedState.CouponCarousel}
    //   />
    // )

    // tabs.push(
    //   <FindByLocation
    //     navigation={navigation}
    //     style={{
    //       flex: 1,
    //     }}
    //     saveState={state => this.saveState('FindByLocation', state)}
    //     savedState={savedState.FindByLocation}
    //   />
    // )

    return tabs
  }

  render() {
    const { index } = this.state
    const tabs = this.renderTabContents()

    return (
      [<View key='list-coupon' style={styles.mainContainer}>
        {tabs[index]}
      </View>,
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
    flex: 1,
    marginBottom: 50,
  },
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingTop: 8,
  },
}));
