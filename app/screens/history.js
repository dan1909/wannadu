import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';

const styles = require('../styles/styles')

export default class History extends Component {
  static navigationOptions = {
    tabBarLabel: 'history',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../images/history_image.png')}
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
        <Text>History page!!</Text>
      </View>
    )
  }
}
