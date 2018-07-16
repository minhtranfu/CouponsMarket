import React from 'react';
import {
  Keyboard
} from 'react-native';
import {
  RkAvoidKeyboard,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import { scaleVertical } from '../../utils/scale';
import { NavigationActions } from 'react-navigation';

import userApi from '../../api/userApi'

export class Logout extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
    this.logout()
  }

  async logout() {
    const { navigation } = this.props

    await userApi.logout()

    const toHome = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'Login',
        })
      ]
    });
    navigation.dispatch(toHome)
  }

  render() {

    return (
      <RkAvoidKeyboard
        onStartShouldSetResponder={(e) => true}
        onResponderRelease={(e) => Keyboard.dismiss()}
        style={styles.screen}>
      </RkAvoidKeyboard>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.screen.base
  },
  container: {
    paddingHorizontal: 17,
    paddingBottom: scaleVertical(22),
    alignItems: 'center',
    flex: -1
  },
}));
