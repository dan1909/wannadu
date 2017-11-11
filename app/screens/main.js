import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Button,
} from 'react-native';

const imageService = require('../images/imageService')
const styles = require('../styles/styles')
const questionService = require('../utils/questionService')

export default class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {'qIndex': 0, 'isLoading': true}
    this.questions = []
  }

  componentDidMount() {
    questionService.getQuestions().then((questions) => {
      this.questions = questions
      this.setState({ isLoading: false })
    })
  }

  answerClicked = () => {
    this.advanceIndex()
  }

  postQuestion = () => {
    questionService.postQuestion()
  }

  advanceIndex = () => {
    if (this.state.qIndex + 1 < this.questions.length) {
      this.setState((prevState) => ({
        qIndex: prevState.qIndex + 1
      }))
    } else {
      console.log ("!!!!!", this.props)
      this.props.navigation.navigate('Result', 'result')
    }

  }

  getQuestionAreaForImage = () => {
    imageAnswersArr = this.questions[this.state.qIndex].answers.map((answer, i) =>
      (<TouchableHighlight
        key={i}
        onPress={this.answerClicked}
        style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={imageService.getImage(answer.content)}
        />
      </TouchableHighlight>)
    )
    return (<View style={styles.selectionArea}>
              <View style={styles.imageSelectionArea}>
                {imageAnswersArr}
              </View>
            </View>)
  }

  getQuestionAreaForText = () => {
    textAnswersArr = this.questions[this.state.qIndex].answers.map((answer, i) =>
      (<TouchableHighlight
        key={i}
        onPress={this.answerClicked}
        style={[styles.button, {backgroundColor: answer.backgroundColor}]}>
        <Text style={styles.buttonText}>{answer.content}</Text>
      </TouchableHighlight>)
    )

    return (<View style={styles.selectionArea}>
              {textAnswersArr}
            </View>)
  }

  render() {
    if (!this.state.isLoading) {

      // if (this.questions[this.state.qIndex].question.type == 'text'){
        // QuestionArea = this.getQuestionAreaForText()
      // } else {
      QuestionArea = this.getQuestionAreaForImage()
      // }
      return (
        <View style={styles.mainContainer}>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              {this.questions[this.state.qIndex].question.content}
            </Text>
          </View>
            {QuestionArea}
            <TouchableHighlight
              onPress={this.postQuestion}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableHighlight>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }
}
