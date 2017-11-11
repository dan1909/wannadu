import React, { Component } from 'react';
import {
  Text,
} from 'react-native';
const userService = require('../utils/userService')

export default class Splash extends Component {

  constructor(props) {
    super(props)
    this.state = {isLoggedIn: false, isLoading: true}
  }

  async componentDidMount() {
    try {
      isLoggedIn = await userService.isLoggedIn()
      if (isLoggedIn) {
        this.setState({isLoggedIn: true})
        this.goToApp()
      } else {
        this.setState({isLoggedIn: false})
        this.goToLogin()
      }
      this.setState({isLoading: false})
    } catch (error) {
      console.log("Splash: catched Error", error)
    }

  }
  
  goToApp = () => {
    navigation = this.props.navigation
    navigation.navigate('App')
  }

  goToLogin = () => {
    navigation = this.props.navigation
    navigation.navigate('Login')
  }

  render() {
    if (this.state.isLoading) {
      return <Text>Loading!!!!!</Text>
    } else {
      return <Text>Going to App/Login</Text>
    }
  }
}
