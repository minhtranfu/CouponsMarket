import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Image,
  Keyboard,
  TouchableHighlight,
  DatePickerAndroid,
  ScrollView
} from 'react-native'
import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten'
import { FontAwesome } from '../../assets/icons'
import { GradientButton } from '../../components/gradientButton'
import { scale, scaleModerate, scaleVertical } from '../../utils/scale'
import {
  ImagePicker
} from 'expo'
import moment from 'moment'

import couponApi from '../../api/couponApi'

export class CouponCreate extends React.Component {

  async createCoupon() {
    const { imageSource, coupon } = this.state;

    const data = new FormData();
    Object.keys(this.coupon).forEach(key => {
      const value = this.coupon[key].refs.input._lastNativeText
      data.append(key, value)
    })
    data.append('image', {
      uri: imageSource,
      type: 'image/jpeg',
      name: 'couponPhoto',
    });

    const result = await couponApi.createCoupon(data)
    console.log(result)
  }

  static navigationOptions = ({ navigation }) => {
    const createCoupon = () => this.createCoupon()
    const renderHeaderRight = () => {
      return (
        <View>
          <GradientButton
            onPress={() => createCoupon()}
            rkType='large' style={{ marginRight: 16, width: 60, height: 32, fontSize: 6 }} text='ADD' />
        </View>
      );
    };

    const renderTitle = () => {
      return (
        <View style={{ alignItems: 'center' }}><RkText rkType='header5'>{'Create Coupon'.toUpperCase()}</RkText></View>
      )
    };


    // let user = data.getUser(getUserId(navigation));
    const headerRight = renderHeaderRight();
    const headerTitle = renderTitle();
    return (
      {
        headerTitle,
        headerRight
      });
  };

  constructor(props) {
    super(props);

    this.state = {
      imageSource: null,
      coupon: {
        title: '',
        company: '',
        description: '',
        value: '',
        price: '',
        validTime: moment().format('DD-MM-YYYY'),
        expiredTime: moment().format('DD-MM-YYYY')
      }
    }

    this.coupon = {}
  }

  async openImagePicker() {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ imageSource: result.uri });
    }
  }

  async openDatePicker(name) {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({
          coupon: {
            ...this.state.coupon,
            [name]: moment(new Date(year, month, day)).format('DD-MM-YYYY')
          }
        })
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  }

  render() {
    const { coupon } = this.state

    return (
      <ScrollView>
        <RkAvoidKeyboard
          style={styles.screen}>
          <View style={styles.container}>
            <RkTextInput style={styles.textInput} rkType='rounded' placeholder='Title'
              ref={ref => { this.coupon.title = ref }}
            />
            <RkTextInput style={styles.textInput} rkType='rounded' placeholder='Company'
              ref={ref => { this.coupon.company = ref }}
            />
            <RkTextInput style={styles.textInput} rkType='rounded' placeholder='Value' keyboardType='numeric'
              ref={ref => { this.coupon.value = ref }}
            />
            <RkTextInput style={styles.textInput} rkType='rounded' placeholder='Price' keyboardType='numeric'
              ref={ref => { this.coupon.value = ref }}
            />
            <RkText style={styles.textLeft} rkType='primary3'>Valid date</RkText>
            <RkTextInput rkType='rounded' placeholder='Valid date' value={coupon.validTime}
              editable={false} onResponderRelease={(e) => Keyboard.dismiss()} onFocus={Keyboard.dismiss()} onFocus={() => this.openDatePicker('validTime')}
              ref={ref => { this.coupon.validTime = ref }}
            />
            <RkTextInput rkType='rounded' placeholder='Expired date' value={coupon.expiredTime}
              editable={false} onResponderRelease={(e) => Keyboard.dismiss()} onFocus={Keyboard.dismiss()} onFocus={() => this.openDatePicker('expiredTime')}
              ref={ref => { this.coupon.expiredTime = ref }}
            />
            <RkText style={styles.textLeft} rkType='primary3'>Hình ảnh coupon</RkText>
            {this.state.imageSource &&
              <TouchableHighlight>
                <View style={{ width: 320, height: 180 }}>
                  <View style={{ position: 'absolute', left: 0, top: 0 }}>
                    <Image
                      onPress
                      source={{ uri: this.state.imageSource }} style={{ width: 320, height: 180, zIndex: 1 }} />
                  </View>
                  <View style={{ position: 'absolute', right: 10, top: 10, width: 50, height: 60, zIndex: 3 }}>
                    <GradientButton
                      onPress={() => this.openImagePicker()}
                      rkType='large' text={FontAwesome.pencil} textStyle={{ fontSize: 35 }} />
                  </View>
                </View>
              </TouchableHighlight>
            }
            {!this.state.imageSource &&
              <GradientButton
                onPress={() => this.openImagePicker()}
                rkType='large' style={styles.selectImage} text='+ Select image' colors={['#dcdcdc', '#b5b5b7']} />}

            <RkTextInput style={styles.textInput} placeholder='Description'
              multiline={true}
              numberOfLines={4}
              ref={ref => { this.coupon.description = ref }}
            />

            <GradientButton
              onPress={() => this.createCoupon()}
              rkType='large' style={styles.save} text='Submit' />
          </View>
        </RkAvoidKeyboard>
      </ScrollView>
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
  textLeft: {
    textAlign: 'left',
    width: '100%'
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
  selectImage: {
    marginVertical: 9,
    height: 180,
    color: 'rgba(0,0,0,.87)'
  },
  textRow: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textDanger: {
    color: theme.colors.danger
  },
  textInput: {
    paddingRight: 20,
    fontSize: 14
  }
}));

CouponCreate.propTypes = {
  navigation: PropTypes.object.isRequired
};
