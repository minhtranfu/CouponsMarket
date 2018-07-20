import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import {
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkTheme,
  RkStyleSheet,
  RkButton
} from 'react-native-ui-kitten';
import { data } from '../../data';
import { Avatar } from '../../components';
import { SocialSetting } from '../../components';
import { FontAwesome } from '../../assets/icons';
import { GradientButton } from '../../components';
import { Dropdown } from 'react-native-material-dropdown';


export class SendReport extends React.Component {
  static navigationOptions = {
    title: 'Send Report'.toUpperCase()
  }

  static data = [
    {
      value: 'Reason1',
    }, {
      value: 'Reason2',
    }, {
      value: 'Reason3',
    }
  ]

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {

    return (
      <View style={styles.root}>

        <Dropdown
          style={{ marginTop: 5, marginLeft: 5, }}
          label='Error'
          data={SendReport.data} />

        <RkTextInput style={styles.textInput} placeholder='Description'
          multiline={true}
          numberOfLines={4}
        />

        <GradientButton
          rkType='large' style={styles.save} text='Submit' />
      </View>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.screen.base,
    paddingHorizontal: 14
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
  },
  textInput: {
    paddingRight: 20,
  },
  save: {
    marginVertical: 9
  },
}));
