import React from 'react';
import {
  View,
  Image,
  Dimensions,
  Keyboard
} from 'react-native';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import { FontAwesome } from '../../assets/icons';
import { GradientButton } from '../../components/gradientButton';
import { scale, scaleModerate, scaleVertical } from '../../utils/scale';
import { NavigationActions, StackActions } from 'react-navigation';

import userApi from '../../api/userApi'

export class LoginV1 extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      error: '',
    }
  }

  _renderImage(image) {
    let contentHeight = scaleModerate(375, 1);
    let height = Dimensions.get('window').height - contentHeight;
    let width = Dimensions.get('window').width;

    if (RkTheme.current.name === 'light')
      image = (<Image style={[styles.image, { height, width }]}
        source={require('../../assets/images/splashCoupon.png')} />);
    else
      image = (<Image style={[styles.image, { height, width }]}
        source={require('../../assets/images/backgroundLoginV1DarkTheme.png')} />);
    return image;
  }

  async login() {
    const { navigation } = this.props

    const username = this.inputUsername.refs.input._lastNativeText
    const password = this.inputPassword.refs.input._lastNativeText

    if (!username || username.trim() === '' || !password || password.trim() === '') {
      this.setState({
        error: 'Please enter username and password!'
      })
      return
    }

    const token = await userApi.login(username, password)

    if (token) {
      const toHome = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'Home'
          })
        ]
      });
      navigation.dispatch(toHome)
    } else {
      this.setState({
        error: 'Wrong username or password!'
      })
    }
  }



  render() {
    const image = this._renderImage();
    const error = this.state.error ? <View style={[styles.textRow, styles.textDanger]}><RkText rkType='primary3'>{this.state.error}</RkText></View> : null

    return (
      <RkAvoidKeyboard
        onStartShouldSetResponder={(e) => true}
        onResponderRelease={(e) => Keyboard.dismiss()}
        style={styles.screen}>
        {image}
        <View style={styles.container}>
          <View style={styles.buttons}>
            <RkButton style={styles.button} rkType='social'>
              <RkText rkType='awesome hero accentColor'>{FontAwesome.twitter}</RkText>
            </RkButton>
            <RkButton style={styles.button} rkType='social'>
              <RkText rkType='awesome hero accentColor'>{FontAwesome.google}</RkText>
            </RkButton>
            <RkButton style={styles.button} rkType='social'>
              <RkText rkType='awesome hero accentColor'>{FontAwesome.facebook}</RkText>
            </RkButton>
          </View>
          {error}
          <RkTextInput rkType='rounded' placeholder='Username' ref={(ref) => { this.inputUsername = ref }} />
          <RkTextInput rkType='rounded' placeholder='Password' ref={(ref) => { this.inputPassword = ref }} secureTextEntry={true} />
          <GradientButton
            onPress={() => this.login()}
            rkType='large' style={styles.save} text='LOGIN' />
          <View style={styles.footer}>
            <View style={styles.textRow}>
              <RkText rkType='primary3'>Don’t have an account?</RkText>
              <RkButton rkType='clear'>
                <RkText rkType='header6' onPress={() => this.props.navigation.navigate('SignUp')}> Sign up
                  now </RkText>
              </RkButton>
            </View>
          </View>
        </View>
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
  image: {
    resizeMode: 'cover',
    marginBottom: scaleVertical(10),
  },
  container: {
    paddingHorizontal: 17,
    paddingBottom: scaleVertical(22),
    alignItems: 'center',
    flex: -1
  },
  footer: {
    justifyContent: 'flex-end',
    flex: 1
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: scaleVertical(24)
  },
  button: {
    marginHorizontal: 14
  },
  save: {
    marginVertical: 9
  },
  textRow: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textDanger: {
    color: theme.colors.danger
  }
}));
