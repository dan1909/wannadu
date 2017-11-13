import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';
import Answer from '../components/answerComponent'

const imageService = require('../images/imageService')
const styles = require('../styles/styles')
const questionService = require('../utils/questionService')

export default class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {'qIndex': 0, 'isLoading': true, 'result': []}
    this.questions = []
  }

  async componentDidMount() {
    const questions = await questionService.getQuestions()
    this.questions = questions
    this.setState({ isLoading: false })
  }

  answerClicked = async (answerId) => {
    const currentQuestionId = this.questions[this.state.qIndex].question._id
    const data = {
      'question':currentQuestionId,
      'answer': answerId
    }
    // Update user result array with question and answer, and update data in DB
    this.setState((prevState) => {result: prevState.result.push(data)})
    questionService.postAnswer(data)

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
      this.props.navigation.navigate('Result', 'result')
    }
  }

  render() {
    if (!this.state.isLoading) {

      return (
        <View style={styles.mainContainer}>
          {this.questions[this.state.qIndex].answers.map((prop, key) => {
              return (<Answer key={key} answer={prop} onPress={this.answerClicked}></Answer>)
          })}
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
