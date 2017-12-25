import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

var styles = require('../styles/styles')

  export default class Suggestion extends Component {

  constructor(props) {
    super(props)
    this.state = {suggestionContent: ''}

  }

  componentDidMount() {
    const { params } = this.props.navigation.state
    console.log("!!!! params", params)
    this.setState({suggestionContent: params.content})
  }

  getResults = (results_obj) => {
    Object.keys(results_obj)
  }

  load_more_questions = () => {
    navigation = this.props.navigation
    navigation.navigate('Main')
  }

  render() {
    return (
      <View style={styles.resultContainer}>
        <Text>{this.state.suggestionContent}</Text>
        <TouchableHighlight
          onPress={this.load_more_questions}
          style={[styles.button, {backgroundColor: 'green'}]}>
          <Text style={styles.buttonText}>Load more</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
