import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

var styles = require('../styles/styles')

  export default class Result extends Component {

  constructor(props) {
    super(props)
    console.log("DAN Result props", props)

  }

  componentDidMount() {
    const { params } = this.props.navigation.state

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
        <Text>Result</Text>
        <TouchableHighlight
          onPress={this.load_more_questions}
          style={[styles.button, {backgroundColor: 'green'}]}>
          <Text style={styles.buttonText}>Load more</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
