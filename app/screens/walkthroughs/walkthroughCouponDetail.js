import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions
} from 'react-native';
import {
  RkText,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';

export class WalkthroughCouponDetail extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {width} = Dimensions.get('window');
    let image = RkTheme.current.name === 'light'
      ? <Image style={{flex: 1, width: '100%', height: 70,}} source={require('../../assets/images/Prototype_CouponDetail.jpg')}/>
      : <Image style={{flex: 1, width: '100%', height: 70,}} source={require('../../assets/images/Prototype_CouponDetail.jpg')}/>;

    return (
      <View style={styles.screen}>
        {image}
        <RkText rkType='header2' style={styles.text}>Chi tiết mã khuyến mãi</RkText>
      </View>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  screen: {
    backgroundColor: theme.colors.screen.base,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  text: {
    textAlign: 'center',
    marginTop: 20,
    marginHorizontal: 30
  }
}));