import React from 'react';
import {
  FlatList,
  View,
  ScrollView
} from 'react-native';
import { RkStyleSheet, RkText, RkButton } from 'react-native-ui-kitten';
import CouponCart from '../../components/coupon/couponCard'
import { ListCouponBottomBar } from '../../components'
import { NewFeed } from './list/feed'
import FindByLocation from './findByLocation'

export class ListCoupon extends React.Component {

  static navigationOptions = {
    title: 'List Coupon'.toUpperCase(),
  };

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
        saveState={(state) => this.saveState('NewFeed', state)}
        savedState={savedState.NewFeed}
      />
    )

    tabs.push(
      <View>
        <RkText>
          This is hot coupon tab
        </RkText>
      </View>
    )

    tabs.push(
      <FindByLocation navigation={navigation} style={{
        flex: 1,
      }}
      saveState={(state) => this.saveState('FindByLocation', state)}
      savedState={savedState.FindByLocation}
      />
    )

    return tabs
  }

  render() {
    const { index } = this.state
    const tabs = this.renderTabContents()

    return (
      [<ScrollView key='list-coupon' style={styles.mainContainer}>
        {tabs[index]}
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
}));
