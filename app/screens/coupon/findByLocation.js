import React from "react";
import { StyleSheet, Text, View, ScrollView, FlatList, Image } from "react-native";
import { MapView, Location, Permissions } from "expo";
import { RkText, RkStyleSheet } from 'react-native-ui-kitten'
import couponApi from '../../api/couponApi'
import CouponCart from '../../components/coupon/couponCard'
import loadingGif from '../../assets/images/loading.gif'
import marker from '../../assets/images/marker.png'

export default class FindByLocation extends React.Component {

  constructor(props) {
    super(props)

    const { savedState } = props
    if (savedState) {
      this.state = savedState
    } else {
      this.state = {
        data: [],
        mapRegion: { latitude: 10.853711, longitude: 106.628424, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
        locationResult: null,
        location: { coords: { latitude: 10.853711, longitude: 106.628424 } }
      }
    }
  }

  componentDidMount() {
    if (this.state.locationResult === null) {
      this._getLocationAsync();
    }
  }

  componentWillUnmount() {
    const { saveState } = this.props

    if (saveState) {
      saveState(this.state)
    }
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  }

  _getLocationAsync = async () => {

    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      alert('Permission to access location was denied')
      return
    }

    let location = await Location.getCurrentPositionAsync({});

    const newState = {
      locationResult: JSON.stringify(location),
      location,
      mapRegion: {
        ...this.state.mapRegion,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }
    }

    if (this.props.saveState) {
      this.props.saveState(newState)
    }

    this.setState(newState, () => {
      this.loadNearByCoupons()
    });
  }

  async loadNearByCoupons() {
    const { location } = this.state
    const res = await couponApi.getNearByCoupons({
      ...location.coords,
      radius: 10000,
    })

    if (res) {
      const data = await res.json();
      if (Array.isArray(data)) {
        this.setState({
          data
        })
      }
    }
  }

  keyExtractor(coupon, index) {
    return coupon.id;
  }

  renderItem(data) {
    const coupon = data.item
    const { navigation } = this.props

    return <CouponCart key={coupon.id} coupon={coupon} navigation={navigation} />
  }

  renderListCoupon() {
    const { data } = this.state

    if (data.length === 0) {
      return (
        <View style={{ flex: 1, flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
          <Image source={loadingGif} style={{ width: 100, height: 100 }} />
        </View>
      )
    }

    return (
      <FlatList
        data={data}
        renderItem={itemData => this.renderItem(itemData)}
        keyExtractor={(itemData, _index) => this.keyExtractor(itemData, _index)}
        style={styles.container}
      />
    )
  }

  renderMarkers() {
    const { data } = this.state

    return data.map((coupon, index) => {
      return (
        <MapView.Marker
          key={index}
          coordinate={{
            longitude: coupon.longitude,
            latitude: coupon.latitude
          }}
          title={coupon.title}
          description={coupon.description}
        />
      )
    })
  }

  render() {
    const { mapRegion, location } = this.state

    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <MapView
          style={{ alignSelf: 'stretch', height: 200, flex: 0 }}
          region={mapRegion}
          onRegionChange={this._handleMapRegionChange}
        >
          <MapView.Marker
            coordinate={location.coords}
            title="My Marker"
            description="Some description"
          >
            <Image source={marker} style={{ width: 30, height: 20 }} />
          </MapView.Marker>
          {this.renderMarkers()}
        </MapView>
        <ScrollView style={{ flex: 1 }}>
          {this.renderListCoupon()}
        </ScrollView>
      </View>
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingTop: 8,
  },
}));
