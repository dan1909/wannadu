import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';

const styles = require('../styles/styles')

export default class Settings extends Component {
  static navigationOptions = {
    tabBarLabel: 'settings',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../images/settings_image.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
        <Text>Settings page!!</Text>
      </View>
    )
  }

}
