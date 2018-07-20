import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet
} from 'react-native';
import {
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkTheme,
  RkStyleSheet
} from 'react-native-ui-kitten';
import { data } from '../../data';
import { Avatar } from '../../components';
import { SocialSetting } from '../../components';
import { FontAwesome } from '../../assets/icons';
import { GradientButton } from '../../components';

export class SettingApp extends React.Component {
  static navigationOptions = {
    title: 'App Settings'.toUpperCase()
  };

  constructor(props) {
    super(props);
    this.user = data.getUser();

    this.state = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      country: this.user.country,
      phone: this.user.phone,
      password: this.user.password,
      newPassword: this.user.newPassword,
      confirmPassword: this.user.confirmPassword,
      twitter: true,
      google: false,
      facebook: false
    }
  }

  render() {
    return (
      <ScrollView style={styles.root}>
        <RkAvoidKeyboard>
          <View style={styles.section}>
            <View style={[styles.row, styles.heading]}>
              <RkText rkType='primary header6'>Settings</RkText>
            </View>
            <View style={styles.row}>
              <SocialSetting name='Location' icon={FontAwesome.location} tintColor={RkTheme.current.colors.twitter} />
            </View>
            <View style={styles.row}>
              <SocialSetting name='Notification' icon={FontAwesome.notification} tintColor={RkTheme.current.colors.twitter} />
            </View>
          </View>
          {/* <GradientButton rkType='large' style={styles.button} text='SAVE'/> */}
        </RkAvoidKeyboard>
      </ScrollView>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  header: {
    backgroundColor: theme.colors.screen.neutral,
    paddingVertical: 25
  },
  section: {
    marginVertical: 25
  },
  heading: {
    paddingBottom: 12.5
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: 'center'
  },
  button: {
    marginHorizontal: 16,
    marginBottom: 32
  }
}));