import React from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import {
  RkStyleSheet,
  RkText,
  RkCard,
} from 'react-native-ui-kitten';
import { Avatar } from '../../components';
import { Gallery } from '../../components';
import { GradientButton } from '../../components';
import { data } from '../../data';
import formatNumber from '../../utils/textUtils';
import couponApi from '../../api/couponApi';
import { FontAwesome } from '../../assets/icons';
import { UIConstants } from '../../config/appConstants'
import CommonUtils from '../../utils/common'

export class Profile extends React.Component {
  static navigationOptions = {
    title: 'User Profile'.toUpperCase()
  };

  constructor(props) {
    super(props);
    this.user = data.getUser();

    this.state = {
      isLiked: false,
      data: []
    }

    this.render = this._render.bind(this);
  }

  _keyExtractor(coupon, index) {
    return coupon.id;
  }

  like() {
    this.setState({
      isLiked: !this.state.isLiked,
    })
  }

  async componentWillMount() {
    const res = await couponApi.getPage(1, 10)
    const data = await res.json()
    this.setState({
      data
    })
  }

  render(data) {
    let name = `${this.user.firstName} ${this.user.lastName}`;
    let images = this.user.images;

    const coupon = data.item
    const image = coupon.images[0]

    return (
      <ScrollView style={styles.root}>
        <View style={[styles.header, styles.bordered]}>
          <Avatar img={this.user.photo} rkType='big' />
          <RkText rkType='header2'>{name}</RkText>
          <GradientButton style={styles.button} text='FOLLOW' />
        </View>

        <View style={styles.userInfo}>
          <View style={styles.section}>
            <RkText rkType='header3' style={styles.space}>{this.user.postCount}</RkText>
            <RkText rkType='secondary1 hintColor'>Posts</RkText>
          </View>
          <View style={styles.section}>
            <RkText rkType='header3' style={styles.space}>{formatNumber(this.user.followersCount)}</RkText>
            <RkText rkType='secondary1 hintColor'>Followers</RkText>
          </View>
          <View style={styles.section}>
            <RkText rkType='header3' style={styles.space}>{this.user.followingCount}</RkText>
            <RkText rkType='secondary1 hintColor'>Following</RkText>
          </View>
        </View>
        {/* <Gallery items={images}/> */}
        <TouchableOpacity
          delayPressIn={70}
          activeOpacity={0.8}
          onPress={() => this.props.navigation.navigate('CouponView')}>
          <RkCard rkType='imgBlock' style={styles.card}>
            <Image rkCardImg source={{ uri: `${UIConstants.ApiHost}${image.path}` }} style={{ height: 180 }} />
            <View rkCardImgOverlay rkCardContent style={styles.overlay}>
              <RkText rkType='header4 inverseColor'>{coupon.title}</RkText>
              <RkText style={styles.time}
                rkType='secondary2 inverseColor'>{CommonUtils.formatMoney(coupon.value)} đ - {CommonUtils.formatMoney(coupon.price)} đ</RkText>
            </View>
            {/* Icon like Comment Ava */}
            <View style={{ alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 50, flexDirection: 'row', }}>
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
                    style={{ width: 50, height: 50, }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </RkCard>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  header: {
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 17
  },
  userInfo: {
    flexDirection: 'row',
    paddingVertical: 18,
  },
  bordered: {
    borderBottomWidth: 1,
    borderColor: theme.colors.border.base
  },
  section: {
    flex: 1,
    alignItems: 'center'
  },
  space: {
    marginBottom: 3
  },
  separator: {
    backgroundColor: theme.colors.border.base,
    alignSelf: 'center',
    flexDirection: 'row',
    flex: 0,
    width: 1,
    height: 42
  },
  buttons: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  button: {
    marginTop: 18,
    alignSelf: 'center',
    width: 140
  },

}));