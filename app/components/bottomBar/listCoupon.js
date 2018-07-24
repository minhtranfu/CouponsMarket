import React from 'react'
import { View } from 'react-native';
import { FontAwesome } from '../../assets/icons';
import { RkText, RkTheme, RkTabView } from 'react-native-ui-kitten';

export class ListCouponBottomBar extends React.Component {
  constructor(props) {
    super(props)
    this.setStyle()
  }

  renderTab(isSelected, title, iconNormal, iconSelected) {

    const backgroundColor = isSelected ? '#ff524c' : 'white'
    const color = !isSelected ? 'black' : 'white'
    const icon = isSelected ? iconSelected : iconNormal
    const iconColor = isSelected ? '#fff' : '#ff524c'

    return <View
      style={{
        backgroundColor,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0,
        height: 50
      }}>
      <RkText rkType='awesome' style={{ color: iconColor, fontSize: 12 }}>{icon}</RkText>
      <RkText style={{ color, marginLeft: 5, fontSize: 12 }}>{title}</RkText>
    </View>
  }

  setStyle() {
    RkTheme.setType('RkTabView', 'dark', {
      backgroundColor: 'white',
      color: 'white',
      borderWidth: 0,
      borderColor: 'white',
      borderTopWidth: 0.5,
      headerContainer: {
        height: 50
      },
      container: {
        backgroundColor: '#ff9147',
        borderColor: '#ff524c',
      }
    });

    RkTheme.setType('RkTabView', 'darkSelected', {
    });
  }

  render() {

    const { index, onTabChanged } = this.props

    return (
      <RkTabView index={index} rkType='dark' onTabChanged={onTabChanged}>
        <RkTabView.Tab title={selected => this.renderTab(selected, 'MỚI', FontAwesome.rss, FontAwesome.rssSquare)} />
        {/* <RkTabView.Tab title={selected => this.renderTab(selected, 'Hot', FontAwesome.fire, FontAwesome.freeCodeCamp)} /> */}
        <RkTabView.Tab title={selected => this.renderTab(selected, 'GẦN ĐÂY', FontAwesome.mapMarker, FontAwesome.streetView)} />
      </RkTabView>
    )
  }
}

export default ListCouponBottomBar
