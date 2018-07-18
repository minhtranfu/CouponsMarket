import React from 'react';
import {
  View,
  Image,
  Dimensions,
  Keyboard,
  StyleSheet,
  ScrollView,
  TouchableOpacity
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
import { Avatar } from '../../components';
import { GradientButton } from '../../components/gradientButton';
import { scale, scaleModerate, scaleVertical } from '../../utils/scale';
import { UIConstants } from '../../config/appConstants'

export class CouponView extends React.Component {
  static navigationOptions = {
    title: 'Coupon Details',
  };

  constructor(props) {
    super(props);

    this.state = {
      couponId: '',
      isLiked: false,
    }
  }

  _renderImage(image) {
    const { navigation } = this.props;
    const coupon = navigation.getParam('coupon', {});
    const imageUri = coupon.images[0]

    let contentHeight = scaleModerate(375, 1);
    let height = Dimensions.get('window').height - contentHeight;
    let width = Dimensions.get('window').width - 40;

    image = (<Image style={[styles.image, { height, width }]}
      source={{ uri: `${UIConstants.ApiHost}${imageUri}` }} />);
    return image;
  }

  like() {
    this.setState({
      isLiked: !this.state.isLiked,
    })
  }

  render() {
    const { navigation } = this.props;
    console.log(navigation)
    const coupon = navigation.getParam('coupon', false);
    if (!coupon) {
      return (<RkText>Something went wrong!</RkText>)
    }

    const image = this._renderImage();

    return (
      <ScrollView style={styles.root}>
        <RkAvoidKeyboard
          onStartShouldSetResponder={(e) => true}
          onResponderRelease={(e) => Keyboard.dismiss()}
          style={styles.screen}>
          {image}
          <View style={styles.container}>

            {/* Icon like Comment Ava */}
            <View style={[styles.textRow, { alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 50, }]}>
              <RkText style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }} rkType='awesome primary' onPress={() => this.like()}>
                {this.state.isLiked ? FontAwesome.heart : FontAwesome.emptyHeart}
              </RkText>
              <RkText style={{}} rkType='awesome primary' onPress={() => this.props.navigation.navigate('Comments')}>
                {FontAwesome.comment}
              </RkText>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileV3')}>
                  <Avatar img={require('../../data/img/photo32.jpg')}
                    rkType='circle'
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.section}>
              <View style={[styles.row, styles.heading]}>
                <RkText rkType='header6 primary'>CGV Coupon</RkText>
              </View>

              {/* Company */}
              <View style={styles.row}>
                <View style={styles.content}>
                  <View style={styles.contentHeader}>
                    <RkText style={{ color: 'lightgray', }} rkType=''>
                      Company
                    </RkText>
                    <RkText rkType='header5'>
                      CGV Cinema
                  </RkText>
                  </View>
                </View>
              </View>

              {/* Price */}
              <View style={styles.row}>
                <View style={styles.content}>
                  <View style={styles.contentHeader}>
                    <RkText style={{ color: 'lightgray', }} rkType=''>
                      Price:
                    </RkText>
                    <RkText rkType='header5'>
                      200000 VND
                  </RkText>
                  </View>
                </View>
              </View>

              {/* Quantity */}
              <View style={styles.row}>
                <View style={styles.content}>
                  <View style={styles.contentHeader}>
                    <RkText style={{ color: 'lightgray', }} rkType=''>
                      Quantity:
                    </RkText>
                    <RkText rkType='header5'>
                      2
                  </RkText>
                  </View>
                </View>
              </View>

              {/* Discount */}
              <View style={styles.row}>
                <View style={styles.content}>
                  <View style={styles.contentHeader}>
                    <RkText style={{ color: 'lightgray', }} rkType=''>
                      Discount:
                    </RkText>
                    <RkText rkType='header5'>
                      100%
                  </RkText>
                  </View>
                </View>
              </View>

              {/* Area */}
              <View style={styles.row}>
                <View style={styles.content}>
                  <View style={styles.contentHeader}>
                    <RkText style={{ color: 'lightgray', }} rkType=''>
                      Area:
                    </RkText>
                    <RkText rkType='header5'>
                      Ho Chi Minh City
                  </RkText>
                  </View>
                </View>
              </View>

              {/* Start  time */}
              <View style={styles.row}>
                <View style={styles.content}>
                  <View style={styles.contentHeader}>
                    <RkText style={{ color: 'lightgray', }} rkType=''>
                      Start time:
                    </RkText>
                    <RkText rkType='header5'>
                      1/2018
                  </RkText>
                  </View>
                </View>
              </View>

              {/* End time */}
              <View style={styles.row}>
                <View style={styles.content}>
                  <View style={styles.contentHeader}>
                    <RkText style={{ color: 'lightgray', }} rkType=''>
                      End time:
                    </RkText>
                    <RkText rkType='header5'>
                      12/2018
                  </RkText>
                  </View>
                </View>
              </View>
            </View>

            <RkText>Description: <RkText>Use from monday to thusday, before 6PM on friday, saturday, sunday.</RkText> </RkText>

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
    flex: -1
  },
  detailRow: {
    fontSize: 16,
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
    flexDirection: 'row',
  },
  textDanger: {
    color: theme.colors.danger
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  section: {
    marginVertical: 25
  },
  heading: {
    paddingBottom: 12.5
  },
  row: {
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
  },
  content: {
    marginLeft: 16,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
}));
