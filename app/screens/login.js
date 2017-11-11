import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Platform,
  Linking,
  AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';

var styles = require('../styles/styles')
const consts = require('../consts')

export default class LoginComponent extends Component {
  state = {
      user: undefined, // user has not logged in yet
    };

  constructor(props) {
    super(props)
  }

  // Set up Linking
  componentDidMount() {
    // Add event listener to handle OAuthLogin:// URLs
    Linking.addEventListener('url', this.handleOpenURL);
    // Launched from an external URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({ url });
      }
    });
  };

  componentWillUnmount() {
    // Remove event listener
    Linking.removeEventListener('url', this.handleOpenURL);
  };

  handleOpenURL = ({ url }) => {

    // Extract stringified user string out of the URL
    let [, tokenUserObj] = url.match(/user=([^#]+)/)
    tokenUserObj = JSON.parse(decodeURI(tokenUserObj))
    AsyncStorage.setItem(consts.TOKEN_KEY, tokenUserObj.token)

    // this.setState({
      // Decode the user string and parse it into JSON
      // user: JSON.parse(decodeURI(user_string))
    // });
    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }
    navigation = this.props.navigation
    navigation.navigate('App')
  };

  // Handle Login with Facebook button tap
  loginWithFacebook = () => this.openURL('http://localhost:3000/auth/facebook');

  // Open URL in a browser
  openURL = (url) => {
    // Use SafariView on iOS
    if (Platform.OS === 'ios') {
      SafariView.show({
        url: url,
        fromBottom: true,
      });
    }
    // Or Linking.openURL on Android
    else {
      Linking.openURL(url);
    }
  };

  // login = () => {
  //     navigation = this.props.navigation
  //     navigation.navigate('App')
  // }

  render() {
    return (
      <View style={styles.loginContainer}>
        <TouchableHighlight
          onPress={this.loginWithFacebook}
          style={[styles.button, {backgroundColor: 'blue'}]}>
          <Text style={styles.buttonText}>Login with FB</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
