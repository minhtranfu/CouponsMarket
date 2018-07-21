import React from 'react';
import {
  View,
  Image,
  Keyboard,
  Text
} from 'react-native';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkStyleSheet,
  RkTheme,
  RkAvoidKeyboard
} from 'react-native-ui-kitten';
import { GradientButton } from '../../components/';
import { scale, scaleModerate, scaleVertical } from '../../utils/scale';
import { NavigationActions, StackActions } from 'react-navigation';

import userApi from '../../api/userApi'

export class SignUp extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      error: ''
    }

    this.user = {}

  }

  async signup() {
    const { navigation } = this.props

    const data = {}
    let isValid = true
    Object.keys(this.user).forEach(key => {
      const value = this.user[key].refs.input._lastNativeText

      if (!value || value.trim() === '') {
        isValid = false
      }

      data[key] = value
    })

    if (!isValid) {
      this.setState({ error: 'You must fill all field to sign up!' })
      return
    }

    const dataResult = await userApi.signup(data)

    if (dataResult) {
      const toHome = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'HomeMain'
          })
        ]
      })
      navigation.dispatch(toHome)
    } else {
      this.setState({
        error: dataResult.message
      })
    }
  }

  render() {
    let renderIcon = () => {
      if (RkTheme.current.name === 'light')
        return <Image style={styles.image} source={require('../../assets/images/logo_coupon.png')} />;
      return <Image style={styles.image} source={require('../../assets/images/logoDark.png')} />
    };
    return (
      <RkAvoidKeyboard
        style={styles.screen}
        onStartShouldSetResponder={(e) => true}
        onResponderRelease={(e) => Keyboard.dismiss()}>
        <View style={{ alignItems: 'center' }}>
          {renderIcon()}
          <RkText rkType='h1'>Registration</RkText>
        </View>
        <View style={styles.content}>
          <Text>{this.state.error}</Text>
          <View>
            <RkTextInput rkType='rounded' placeholder='Email' ref={ref => { this.user.email = ref }} />
            <RkTextInput rkType='rounded' placeholder='Phone' ref={ref => { this.user.phone = ref }} />
            <RkTextInput rkType='rounded' placeholder='Full Name' ref={ref => { this.user.fullName = ref }} />
            <RkTextInput rkType='rounded' placeholder='Username' ref={ref => { this.user.username = ref }} />
            <RkTextInput rkType='rounded' placeholder='Password' ref={ref => { this.user.password = ref }} secureTextEntry={true} />
            <RkTextInput rkType='rounded' placeholder='Confirm Password' secureTextEntry={true} />
            <GradientButton style={styles.save} rkType='large' text='SIGN UP' onPress={() => {
              this.signup()
            }} />
          </View>
          <View style={styles.footer}>
            <View style={styles.textRow}>
              <RkText rkType='primary3'>Already have an account?</RkText>
              <RkButton rkType='clear' >
                <RkText rkType='header6' onPress={() => this.props.navigation.navigate('Login')}> Sign in now </RkText>
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
    padding: 16,
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: theme.colors.screen.base
  },
  image: {
    marginBottom: 10,
    height: scaleVertical(77),
    resizeMode: 'contain'
  },
  content: {
    justifyContent: 'space-between'
  },
  save: {
    marginVertical: 20
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: 24,
    marginHorizontal: 24,
    justifyContent: 'space-around'
  },
  footer: {
    justifyContent: 'flex-end'
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
}));
