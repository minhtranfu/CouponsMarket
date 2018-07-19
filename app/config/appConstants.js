import {Platform} from 'react-native';

export class UIConstants {
  static AppbarHeight = Platform.OS === 'ios' ? 44 : 56
  static StatusbarHeight = Platform.OS === 'ios' ? 20 : 0
  static HeaderHeight = UIConstants.AppbarHeight + UIConstants.StatusbarHeight
  static ApiHost = 'http://cpm.hoctot.net'
  static GoogleMapKey = 'AIzaSyDSy21bCQCzXV8ZM9IOAAVpqd6-F0icGEs'
}
