import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';

const styles = require('../styles/styles')

export default class Profile extends Component {
  static navigationOptions = {
    tabBarLabel: 'profile',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../images/profile_image.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };
  constructor(props) {
    super(props)
  }

  logout = () => {
    navigation = this.props.navigation
    navigation.navigate('Login')
  }

  render() {
    return (
      <View style={styles.loginContainer}>
        <TouchableHighlight
          onPress={this.logout}
          style={[styles.button, {backgroundColor: 'blue'}]}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
