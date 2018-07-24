import React from 'react';
import {
  FlatList,
  Image,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {
  RkText,
  RkCard,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import { FontAwesome } from '../../assets/icons';
import { Avatar } from '../../components';
import { data } from '../../data';
import couponApi from '../../api/couponApi';
import { UIConstants } from '../../config/appConstants'
import CommonUtils from '../../utils/common'
import { Gallery } from '../../components';
import { GradientButton } from '../../components';
import formatNumber from '../../utils/textUtils';

export class Profile extends React.Component {
  static navigationOptions = {
    title: 'Thông tin cá nhân'.toUpperCase()
  };

  constructor(props) {
    super(props);

    this.user = {
      fullName: 'Minh Trần',
      postCount: 20,
      followersCount: 0,
      followingCount: 0
    };
    this.state = {
      isLiked: false,
      data: []
    }
    // this.data = data.getArticles();
    this.renderItem = this._renderItem.bind(this);
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
    const res = await couponApi.getCouponsByUser(1, 30)
    const data = await res.json()
    this.setState({
      data
    })
  }

  _renderItem(data) {
    const coupon = data.item
    const image = coupon.images[0]

    return (
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
              {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileV3')}>
                <Avatar img={require('../../data/img/photo32.jpg')}
                  rkType='circle'
                  style={{ width: 50, height: 50, }}
                />
              </TouchableOpacity> */}
              <RkText style={{width: 30, height: 30, alignItems: 'center', marginTop: 10,}} rkType='awesome primary' onPress={() => this.props.navigation.navigate('')}>
                {FontAwesome.horizontalEllipsis}
              </RkText>

            </View>
          </View>
        </RkCard>
      </TouchableOpacity>
    )
  }

  render() {
    const { data } = this.state
    let name = `${this.user.fullName}`;
    return (
      <ScrollView style={styles.root}>
        <View style={[styles.header, styles.bordered]}>
          <Avatar img={require('../../data/img/avatars/Image8.png')} rkType='big' />
          <RkText rkType='header2'>{name}</RkText>
          {/* <GradientButton style={styles.button} text='Theo dõi' /> */}
        </View>

        <View style={styles.userInfo}>
          <View style={styles.section}>
            <RkText rkType='header3' style={styles.space}>{this.user.postCount}</RkText>
            <RkText rkType='secondary1 hintColor'>Bài đăng</RkText>
          </View>
          <View style={styles.section}>
            <RkText rkType='header3' style={styles.space}>{formatNumber(this.user.followersCount)}</RkText>
            <RkText rkType='secondary1 hintColor'>Người theo dõi</RkText>
          </View>
          <View style={styles.section}>
            <RkText rkType='header3' style={styles.space}>{this.user.followingCount}</RkText>
            <RkText rkType='secondary1 hintColor'>theo dõi</RkText>
          </View>
        </View>
        {/* <Gallery items={images}/> */}
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={this._keyExtractor}
          style={styles.container} />
      </ScrollView>


    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 14
  },
  card: {
    marginBottom: 16
  },
  time: {
    marginTop: 5
  },
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
