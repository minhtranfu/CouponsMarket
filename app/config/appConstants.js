import {Platform} from 'react-native';

export class UIConstants {
  static AppbarHeight = Platform.OS === 'ios' ? 44 : 56
  static StatusbarHeight = Platform.OS === 'ios' ? 20 : 0
  static HeaderHeight = UIConstants.AppbarHeight + UIConstants.StatusbarHeight
  static ApiHost = 'http://cpm.hoctot.net' // For online api server
  // static ApiHost = 'http://192.168.1.142:3031' // For local api server
  static GoogleMapKey = 'AIzaSyDSy21bCQCzXV8ZM9IOAAVpqd6-F0icGEs'
}
