import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  Image,
  Keyboard,
  TouchableHighlight,
  DatePickerAndroid,
  ScrollView,
  Picker
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
import { GradientButton } from '../../components'
import { scale, scaleModerate, scaleVertical } from '../../utils/scale'
import {
  ImagePicker,
  Location, Permissions
} from 'expo'
import { UIConstants } from '../../config/appConstants'
import moment from 'moment'

import couponApi from '../../api/couponApi'

export class CouponCreate extends React.Component {

  // static navigationOptions = ({ navigation }) => {
  //   const createCoupon = () => this.createCoupon()
  //   const renderHeaderRight = () => {
  //     return (
  //       <View>
  //         <GradientButton
  //           onPress={() => createCoupon()}
  //           rkType='large' style={{ marginRight: 16, width: 60, height: 32, fontSize: 6 }} text='ADD' />
  //       </View>
  //     );
  //   };

  //   const renderTitle = () => {
  //     return (
  //       <View style={{ alignItems: 'center' }}><RkText rkType='header5'>{'Create Coupon'.toUpperCase()}</RkText></View>
  //     )
  //   };


  //   // let user = data.getUser(getUserId(navigation));
  //   const headerRight = renderHeaderRight();
  //   const headerTitle = renderTitle();
  //   return (
  //     {
  //       title: 'Create Coupon'.toUpperCase(),
  //       headerRight
  //     });
  // };

  static navigationOptions = {
    title: 'Tạo mã khuyến mãi'.toUpperCase()
  };

  constructor(props) {
    super(props);

    this.state = {
      imageSource: null,
      coupon: {
        title: '',
        company: '',
        description: '',
        type: 'percent',
        value: '',
        price: '',
        validTime: moment().format('DD-MM-YYYY'),
        expiredTime: moment().format('DD-MM-YYYY')
      },
      geoInfo: {
        address: ''
      }
    }

    this.coupon = {}

    RkTheme.setType('RkTextInput', 'rounded', {
      borderWidth: 1.5,
      borderTopWidth: 0.4,
      underlineWidth: 0.8
    })
  }

  async openImagePicker() {

    const { Permissions } = Expo;
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      const { res } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === 'granted') {
        alert('Please grant permission to select image!');
        return;
      }
    }

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

  async _getGeoInfo() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
        location,
      });
    }

    let location = await Location.getCurrentPositionAsync({});

    const { latitude, longitude } = location.coords
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=false&key=${UIConstants.GoogleMapKey}`

    try {
      const res = await fetch(url)
      const data = await res.json()

      if (data.status !== 'OK') {
        alert('Can not find your location!')
        return
      }

      const firstResult = data.results[0]
      let index = firstResult.address_components.length - 2
      const city = firstResult.address_components[index].short_name
      index--
      const district = firstResult.address_components[index].short_name

      const address = firstResult.formatted_address

      this.coupon.address.refs.input._lastNativeText = address

      this.setState({
        geoInfo: {
          city,
          district,
          address
        }
      })

    } catch (error) {
      alert('Load data error, please try again!')
    }
  }

  componentDidMount() {
    this._getGeoInfo()
  }

  render() {
    const { coupon, geoInfo } = this.state

    return (
      <ScrollView>
        <RkAvoidKeyboard
          style={styles.screen}>
          <View style={styles.container}>
            <View style={styles.textLeft}>
              <RkText rkType='primary3' style={styles.textLeft}>Tên mã khuyến mãi<Text style={styles.textRed}>*</Text></RkText>
            </View>
            <RkTextInput style={styles.textInput} rkType='rounded' placeholder=''
              ref={ref => { this.coupon.title = ref }}
            />

            <View style={styles.textLeft}>
              <RkText rkType='primary3' style={styles.textLeft}>Công ty <Text style={styles.textRed}>*</Text></RkText>
            </View>
            <RkTextInput style={styles.textInput} rkType='rounded' placeholder=''
              ref={ref => { this.coupon.company = ref }}
            />

            <View style={styles.textLeft}>
              <RkText rkType='primary3' style={styles.textLeft}>Địa chỉ <Text style={styles.textRed}>*</Text></RkText>
            </View>
            <RkTextInput style={styles.textInput} rkType='rounded' placeholder=''
              defaultValue={geoInfo.address || 'Đang xác định...'}
              ref={ref => { this.coupon.address = ref }}
            />

            <View style={styles.textLeft}>
              <RkText rkType='primary3' style={styles.textLeft}>Giảm giá <Text style={styles.textRed}>*</Text></RkText>
            </View>
            <View style={{
              flex: 1,
              flexDirection: 'row',
            }}>
              <RkTextInput style={[styles.textInput, { flex: 1, alignItems: 'flex-start' }]} rkType='rounded' placeholder='' keyboardType='numeric'
                ref={ref => { this.coupon.value = ref }}
              />
              <Picker
                prompt='Select discount type'
                selectedValue={coupon.type}
                style={{ height: 50, width: 80, flex: 0, alignItems: 'flex-end', justifyContent: 'center' }}
                onValueChange={(itemValue, itemIndex) => this.setState({
                  coupon: {
                    ...coupon,
                    type: itemValue
                  }
                })}>
                <Picker.Item label="%" value="percent" />
                <Picker.Item label="đ" value="credit" />
              </Picker>
            </View>

            <View style={styles.textLeft}>
              <RkText rkType='primary3' style={styles.textLeft}>Giá mã khuyến mãi <Text style={styles.textRed}>*</Text></RkText>
            </View>
            <RkTextInput style={styles.textInput} rkType='rounded' placeholder='' keyboardType='numeric'
              ref={ref => { this.coupon.value = ref }}
            />

            <View style={styles.textLeft}>
              <RkText rkType='primary3' style={styles.textLeft}>Thời gian bắt đầu <Text style={styles.textRed}>*</Text></RkText>
            </View>
            <RkTextInput rkType='rounded' placeholder='Valid date' value={coupon.validTime}
              editable={false} onResponderRelease={(e) => Keyboard.dismiss()} onFocus={Keyboard.dismiss()} onFocus={() => this.openDatePicker('validTime')}
              ref={ref => { this.coupon.validTime = ref }}
            />

            <View style={styles.textLeft}>
              <RkText rkType='primary3' style={styles.textLeft}>Thời gian kết thúc</RkText>
            </View>
            <RkTextInput rkType='rounded' placeholder='Expired date' value={coupon.expiredTime}
              editable={false} onResponderRelease={(e) => Keyboard.dismiss()} onFocus={Keyboard.dismiss()} onFocus={() => this.openDatePicker('expiredTime')}
              ref={ref => { this.coupon.expiredTime = ref }}
            />

            <View style={styles.textLeft}>
              <RkText rkType='primary3' style={styles.textLeft}>Hình ảnh <Text style={styles.textRed}>*</Text></RkText>
            </View>
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
                rkType='large' style={styles.selectImage} text='+ Hình ảnh' colors={['#dcdcdc', '#b5b5b7']} />}

            <View style={styles.textLeft}>
              <RkText rkType='primary3' style={styles.textLeft}>Mô tả <Text style={styles.textRed}>*</Text></RkText>
            </View>
            <RkTextInput style={styles.textInput} placeholder=''
              multiline={true}
              numberOfLines={4}
              ref={ref => { this.coupon.description = ref }}
            />

            <GradientButton
              onPress={() => this.createCoupon()}
              rkType='large' style={styles.save} text='Tạo' />
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
    paddingTop: 14,
    paddingBottom: scaleVertical(22),
    alignItems: 'center',
    flex: -1
  },
  textLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  textRed: {
    color: 'red'
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
