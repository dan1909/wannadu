import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  Button,
  Image,
} from 'react-native';
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation'

import Suggestion from './screens/suggestion'
import Main from './screens/main'
import Login from './screens/login'
import Settings from './screens/settings'
import History from './screens/history'
import Profile from './screens/profile'
import Splash from './screens/splash'

const styles = require('./styles/styles')

// login stack
const LoginStack = StackNavigator({
  loginScreen: { screen: Login },
}, {
  headerMode: 'none',
  mode: 'modal',
})

// Main stack - the actual questions and Suggestion
const MainStack = StackNavigator({
  Main: {screen: Main},
  Suggestion: {screen: Suggestion}
}, {
  headerMode: 'none',
  mode: 'modal',
  navigationOptions: {
    tabBarLabel: 'main',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('./images/main_image.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  }
})

//
const AppTabs = TabNavigator({
  Main: { screen: MainStack },
  History: { screen: History },
  Settings: { screen: Settings },
  Profile: { screen: Profile },
}, {
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#e91e63',
    }
})

export const RootStack = StackNavigator({
  Splash: {screen: Splash},
  Login: {screen: Login},
  App: { screen: AppTabs },
}, {
  headerMode: 'none',
})
