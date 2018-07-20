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
  };

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  // render() {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //         <Select
  //           width={250}
  //           ref="SELECT1"
  //           optionListRef={this._getOptionList.bind(this)}
  //           defaultValue="Select a Province in Canada ..."
  //           onSelect={this._canada.bind(this)}>
  //           <Option>Alberta</Option>
  //           <Option>British Columbia</Option>
  //           <Option>Manitoba</Option>
  //           <Option>New Brunswick</Option>
  //           <Option>Newfoundland and Labrador</Option>
  //           <Option>Northwest Territories</Option>
  //           <Option>Nova Scotia</Option>
  //           <Option>Nunavut</Option>
  //           <Option>Ontario</Option>
  //           <Option>Prince Edward Island</Option>
  //           <Option>Quebec</Option>
  //           <Option>Saskatchewan</Option>
  //           <Option>Yukon</Option>
  //         </Select>

  //         <RkText>Selected provicne of Canada: {this.state.canada}</RkText>

  //         <OptionList ref="OPTIONLIST"/>
  //     </View>
  //   );
  // }
  render() {
    let data = [{
      value: 'Reason1',
    }, {
      value: 'Reason2',
    }, {
      value: 'Reason3',
    }];

    return (
      <View style={styles.root}>

        <Dropdown
          style={{marginTop: 5, marginLeft: 5,}}
          label='Error'
          data={data} />

          <RkTextInput style={styles.textInput} placeholder='Description'
              multiline={true}
              numberOfLines={4}
            />

          <GradientButton
              //onPress={() => this.createCoupon()}
              rkType='large' style={styles.save} text='Submit' />
      </View>
    );
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
  },
  textInput: {
    paddingRight: 20,
    fontSize: 14
  },
  save: {
    marginVertical: 9
  },
}));