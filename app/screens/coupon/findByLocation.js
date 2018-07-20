import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MapView, Location, Permissions } from "expo";
import { UIConstants } from '../../config/appConstants'
import { RkText } from 'react-native-ui-kitten'

export default class FindByLocation extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
      locationResult: null,
      location: { coords: { latitude: 37.78825, longitude: -122.4324 } },
      geoInfo: {
        city: '',
        district: '',
        address: ''
      }
    }
  }

  componentDidMount() {
    this._getLocationAsync();
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  }

  async _getGeoInfo() {
    const { latitude, longitude } = this.state.location.coords
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=false&key=${UIConstants.GoogleMapKey}`
    // https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=10.8526792,106.6262704&radius=10000&type=restaurant&keyword=nh%C3%A0%20h%C3%A0ng&key=AIzaSyBKQHa7HTH-ZOLTVsOlblwRRudzP52pfys

    alert('Loading location')
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

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
        location,
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      locationResult: JSON.stringify(location),
      location,
      mapRegion: {
        ...this.state.mapRegion,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }
    }, () => this._getGeoInfo());
  }

  render() {
    const { geoInfo } = this.state

    return (
      <View>
        <Text>Map view</Text>

        <View>
          <RkText>City: {geoInfo.city}</RkText>
          <RkText>District: {geoInfo.district}</RkText>
          <RkText>Full address: {geoInfo.address}</RkText>
        </View>

        <MapView
          style={{ alignSelf: 'stretch', height: 200 }}
          region={this.state.mapRegion}
          onRegionChange={this._handleMapRegionChange}
        >
          <MapView.Marker
            coordinate={this.state.location.coords}
            title="My Marker"
            description="Some description"
          />
        </MapView>
      </View>
    );
  }
}
