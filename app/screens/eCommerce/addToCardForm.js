import React from 'react';
import {
  View,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {
  RkText,
  RkTextInput,
  RkStyleSheet,
  RkAvoidKeyboard
} from 'react-native-ui-kitten';
import {GradientButton} from '../../components/';
import {PasswordTextInput} from '../../components/passwordTextInput';
import {DatePicker} from '../../components/picker/datePicker';
import {CardInput} from '../../components/cardInput';
import {scale} from '../../utils/scale';
import { FontAwesome } from '../../assets/icons';

export class AddToCardForm extends React.Component {
  static navigationOptions = {
    title: 'Thêm thẻ mới'.toUpperCase()
  };

  constructor(props) {
    super(props);

    const currentTime = new Date()

    this.state = {
      cardNumber: '',
      nameOnCard: '',
      cardCode: '',
      expireYear: currentTime.getFullYear() + 3,
      expireMonth: currentTime.getMonth() + 1,
      pickerVisible: false,
    };
  }

  handlePickedDate(date) {
    console.log(date);
    this.setState({expireMonth: date.month.key, expireYear: date.year});
    this.hidePicker()
  }

  hidePicker() {
    this.setState({pickerVisible: false});
  }

  render() {
    return (
      <RkAvoidKeyboard
        style={styles.screen}
        onStartShouldSetResponder={(e) => true}
        onResponderRelease={(e) => Keyboard.dismiss()}>
        <View style={[styles.formContent]}>
          <View>
            <View>
              <View style={[styles.textRow]}>
                <RkText rkType='subtitle'>Số thẻ</RkText>
              </View>
              <CardInput/>
            </View>

            <View style={[styles.content]}>
              <View style={[styles.textRow]}>
                <RkText rkType='subtitle'>Ngày hết hạn</RkText>
              </View>
              <View style={[styles.expireDateBlock]}>
                <DatePicker
                  onConfirm={(date) => this.handlePickedDate(date)}
                  onCancel={() => this.hidePicker()}
                  selectedYear={this.state.expireYear}
                  selectedMonth={this.state.expireMonth}
                  visible={this.state.pickerVisible}
                  customDateParts={[DatePicker.DatePart.YEAR, DatePicker.DatePart.MONTH]}/>
                <View style={[styles.expireDateInput, styles.balloon]}>
                  <TouchableOpacity onPress={() => this.setState({pickerVisible: true})}>
                    <RkText rkType='small' style={styles.expireDateInnerInput}>
                      {this.state.expireMonth}
                    </RkText>
                  </TouchableOpacity>
                </View>
                <View style={[styles.expireDateDelimiter]}/>
                <View style={[styles.expireDateInput, styles.balloon]}>
                  <TouchableOpacity onPress={() => this.setState({pickerVisible: true})}>
                    <RkText rkType='small' style={styles.expireDateInnerInput}>
                      {this.state.expireYear}
                    </RkText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={[styles.content]}>
              <View style={[styles.textRow]}>
                <RkText rkType='subtitle'>Tên trên thẻ</RkText>
              </View>
              <RkTextInput rkType='rounded'
                           onChangeText={(nameOnCard) => this.setState({nameOnCard})}
                           value={this.state.nameOnCard}/>
            </View>

            <View style={[styles.content]}>
              <View style={[styles.textRow]}>
                <RkText rkType='subtitle'>Mã thẻ</RkText>
              </View>
              <PasswordTextInput maxLength={3}
                                 keyboardType='numeric'
                                 onChangeText={(cardCode) => this.setState({cardCode})}
                                 value={this.state.cardCode}/>
            </View>
          </View>
          <RkText rkType='primary3'>
            <RkText rkType='awesome' style={{color: '#f64e59'}}>{FontAwesome.infoCircle}</RkText> Chúng tôi hợp tác với tổ chức thẻ VISA, nhằm đảm bảo thông tin thẻ Tín dụng/Ghi nợ của bạn được an toàn. CouponsMarket không có quyền truy cập vào bất cứ thông tin nào.
          </RkText>
          <View>
            <GradientButton rkType='large' text='THÊM MỚI' onPress={() => {
              this.props.navigation.goBack()
            }}/>
          </View>
        </View>
      </RkAvoidKeyboard>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  screen: {
    padding: 15,
    flex: 1,
    // backgroundColor: theme.colors.screen.base,
    backgroundColor: '#fff',
  },
  content: {
    marginTop: 10
  },
  formContent: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    flex: 1
  },
  textRow: {
    marginLeft: 20
  },
  expireDateBlock: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  expireDateInput: {
    flex: 0.48,
    marginVertical: 10,
  },
  expireDateInnerInput: {
    textAlign: 'center'
  },
  expireDateDelimiter: {
    flex: 0.04
  },
  balloon: {
    maxWidth: scale(250),
    padding: 10,
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: theme.colors.border.solid,
  },
}));
