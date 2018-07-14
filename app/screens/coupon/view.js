import React from 'react';
import {
  View,
  Image,
  Dimensions,
  Keyboard,
  StyleSheet,
  ScrollView,
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

import userApi from '../../api/userApi'

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
    let contentHeight = scaleModerate(375, 1);
    let height = Dimensions.get('window').height - contentHeight;
    let width = Dimensions.get('window').width - 40;

    image = (<Image style={[styles.image, { height, width }]}
      source={{ uri: 'https://cf.shopee.vn/file/eeca8f01a851a50c99ff019a9ebdaa95' }} />);
    return image;
  }

  like() {
    this.setState({
      isLiked: !this.state.isLiked,
    })
  }

  render() {
    const image = this._renderImage();
    const error = this.state.error ? <View style={[styles.textRow, styles.textDanger]}><RkText rkType='primary3'>{this.state.error}</RkText></View> : null

    return (
      <ScrollView style={styles.root}>
        <RkAvoidKeyboard
          onStartShouldSetResponder={(e) => true}
          onResponderRelease={(e) => Keyboard.dismiss()}
          style={styles.screen}>
          {image}
          <View style={styles.container}>
            <RkText style={styles.marginBottom10} rkType='awesome primary' onPress={() => this.like()}>
              {this.state.isLiked ? FontAwesome.heart : FontAwesome.emptyHeart}
            </RkText>
            <View style={styles.section}>
              <View style={[styles.row, styles.heading]}>
                <RkText rkType='header6 primary'>CGV Coupon</RkText>
              </View>
              <View style={styles.row}>
                <RkTextInput label='Company:'
                  value='CGV'
                  rkType='right clear'
                  editable={false} />
              </View>
              <View style={styles.row}>
                <RkTextInput label='Quantity:'
                  value='2'
                  rkType='right clear'
                  editable={false} />
              </View>
              <View style={styles.row}>
                <RkTextInput label='Discount:'
                  value='100%'
                  rkType='right clear'
                  editable={false} />
              </View>
              <View style={styles.row}>
                <RkTextInput label='Area:'
                  value='Ho Chi Minh City'
                  rkType='right clear'
                  editable={false} />
              </View>
              <View style={styles.row}>
                <RkTextInput label='Start time:'
                  value='1/2018'
                  rkType='right clear'
                  editable={false} />
              </View>
              <View style={styles.row}>
                <RkTextInput label='End time:'
                  value='12/2018'
                  rkType='right clear'
                  editable={false} />
              </View>
            </View>
            <RkText>Description: <RkText>Use from monday to thusday, before 6PM on friday, saturday, sunday.</RkText> </RkText>


            {/* <View style={styles.footer}>
            <View style={styles.textRow}>
              <RkText rkType='primary3'>Don’t have an account?</RkText>
              <RkButton rkType='clear'>
                <RkText rkType='header6' onPress={() => this.props.navigation.navigate('SignUp')}> Sign up
                  now </RkText>
              </RkButton>
            </View>
          </View> */}
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
  starButton: {
    backgroundColor: '#ffffff',
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
  marginBottom10: {
    marginBottom: 10,
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
}));
