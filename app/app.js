import React from 'react';
import {
  createDrawerNavigator,
  createStackNavigator
} from 'react-navigation';
import { LinearGradient } from 'expo';
import { withRkTheme, RkStyleSheet, RkTheme } from 'react-native-ui-kitten';
import { AppRoutes } from './config/navigation/routesBuilder';
import * as Screens from './screens';
import { bootstrap } from './config/bootstrap';
import track from './config/analytics';
import { data } from './data'
import { AppLoading, Font } from 'expo';
import { View, StatusBar, Platform } from "react-native";

// disable yellow warning box
console.disableYellowBox = true;
bootstrap();
data.populateData();

function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

let SideMenu = withRkTheme(Screens.SideMenu);
const KittenApp = createStackNavigator({
  First: {
    screen: Screens.SplashScreen
  },
  Home: {
    screen: createDrawerNavigator({
      ...AppRoutes,
    },
      {
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
        contentComponent: (props) => <SideMenu {...props} />
      })
  },
  Login: {
    screen: Screens.LoginV1
  },
  SignUp: {
    screen: Screens.SignUp,
  }
}, {
    headerMode: 'none',
  });

export default class App extends React.Component {
  state = {
    loaded: false
  };


  componentWillMount() {
    this._loadAssets();
  }

  _loadAssets = async () => {
    await Font.loadAsync({
      'fontawesome': require('./assets/fonts/fontawesome.ttf'),
      'icomoon': require('./assets/fonts/icomoon.ttf'),
      'ionicons': require('./assets/fonts/ionicons.ttf'),
      'Righteous-Regular': require('./assets/fonts/Righteous-Regular.ttf'),
      'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
      'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
      'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    });
    this.setState({ loaded: true });
  };

  render() {
    if (!this.state.loaded) {
      return <AppLoading />;
    }

    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          animated
          backgroundColor="rgba(0, 0, 0, 0.20)"
          barStyle="light-content"
        />
        <KittenApp
          onNavigationStateChange={(prevState, currentState) => {
            const currentScreen = getCurrentRouteName(currentState);
            const prevScreen = getCurrentRouteName(prevState);

            if (prevScreen !== currentScreen) {
              track(currentScreen);
            }
          }}
        />
      </View>
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    flex: 1,
  }
}));

Expo.registerRootComponent(App);
