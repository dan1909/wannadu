import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';

const styles = require('../styles/styles')
const imageService = require('../images/imageService')

export default class Answer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  onClick = () => {
    this.props.onPress(this.props.answer._id)
  }

  getQuestionAreaForImage = () => {
    const imageAnswer =
      (<TouchableHighlight
        key={this.props.answer._id}
        onPress={this.onClick}
        style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={imageService.getImage(this.props.answer.content)}
        />
      </TouchableHighlight>)

      return (<View style={styles.selectionArea}>
                <View style={styles.imageSelectionArea}>
                  {imageAnswer}
                </View>
              </View>)
  }

  getQuestionAreaForText = () => {
    const textAnswer =
      (<TouchableHighlight
        key={this.props.answer._id}
        onPress={this.onClick}
        style={[styles.button, {backgroundColor: 'green'}]}>
        <Text style={styles.buttonText}>{this.props.answer.content}</Text>
      </TouchableHighlight>)

      return (<View style={styles.selectionArea}>
                {textAnswer}
              </View>)
  }

  render() {
    if (this.props.answer.type == 'IMAGE') {
      return (this.getQuestionAreaForImage())
    }

    if (this.props.answer.type == 'TEXT') {
      return (this.getQuestionAreaForText())
    }
    return (
      <View>
        <Text>NO ANSWER...</Text>
      </View>
    )
  }

}
