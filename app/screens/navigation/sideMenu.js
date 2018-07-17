import React from 'react';
import {
  TouchableHighlight,
  View,
  ScrollView,
  Image,
  Platform,
  StyleSheet,
  StatusBar
} from 'react-native';
import { LinearGradient } from 'expo';
import { NavigationActions } from 'react-navigation';
import {
  RkStyleSheet,
  RkText,
  RkTheme
} from 'react-native-ui-kitten';
import { MainRoutes } from '../../config/navigation/routes';
import { FontAwesome } from '../../assets/icons';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';

export class SideMenu extends React.Component {

  constructor(props) {
    super(props);
    this._navigateAction = this._navigate.bind(this);
  }

  _navigate(route) {
    let resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: route.id })
      ]
    });
    this.props.navigation.dispatch(resetAction)
  }

  _renderIcon() {
    if (RkTheme.current.name === 'light')
      return <Image style={styles.icon} source={require('../../assets/images/smallLogo.png')} />;
    return <Image style={styles.icon} source={require('../../assets/images/smallLogoDark.png')} />

  }

  render() {
    let menu = MainRoutes.map((route, index) => {
      return (
        <TouchableHighlight
          style={styles.container}
          key={route.id}
          underlayColor={RkTheme.current.colors.button.underlay}
          activeOpacity={1}
          onPress={() => this._navigateAction(route)}>
          <View style={styles.content}>
            <View style={styles.content}>
              <RkText style={styles.icon}
                rkType='moon primary xlarge'>{route.icon}</RkText>
              <RkText>{route.title}</RkText>
            </View>
            <RkText rkType='awesome secondaryColor small'>{FontAwesome.chevronRight}</RkText>
          </View>
        </TouchableHighlight>
      )
    });

    return (
      <View style={styles.root}>
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <LinearGradient colors={RkTheme.current.colors.gradients.base}
            start={{ x: 0.0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[styles.gradient, styles.container, styles.content, styles.header]}>
            {this._renderIcon()}
            <RkText rkType='logo'>Coupons Market</RkText>
          </LinearGradient>
          {menu}
        </ScrollView>
      </View>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  container: {
    height: 55,
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base
  },
  header: {
    height: 80
  },
  root: {
    backgroundColor: theme.colors.screen.base
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: 13,
  },
  gradient: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
  },
}));
