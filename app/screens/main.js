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

  answerClicked = (answerId) => {
    // this.setState((prevState) => ({
    //   result: prevState.result.push({'question':this.questions[this.state.qIndex]._id,
    //                                 'answer': answerId})
    // }))

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

  // getQuestionAreaForImage = () => {
  //   imageAnswersArr = this.questions[this.state.qIndex].answers.map((answer, i) =>
  //     (<TouchableHighlight
  //       key={i}
  //       onPress={this.answerClicked}
  //       style={styles.imageContainer}>
  //       <Image
  //         style={styles.image}
  //         source={imageService.getImage(answer.content)}
  //       />
  //     </TouchableHighlight>)
  //   )
  //   return (<View style={styles.selectionArea}>
  //             <View style={styles.imageSelectionArea}>
  //               {imageAnswersArr}
  //             </View>
  //           </View>)
  // }
  //
  // getQuestionAreaForText = () => {
  //   textAnswersArr = this.questions[this.state.qIndex].answers.map((answer, i) =>
  //     (<TouchableHighlight
  //       key={i}
  //       onPress={this.answerClicked}
  //       style={[styles.button, {backgroundColor: answer.backgroundColor}]}>
  //       <Text style={styles.buttonText}>{answer.content}</Text>
  //     </TouchableHighlight>)
  //   )
  //
  //   return (<View style={styles.selectionArea}>
  //             {textAnswersArr}
  //           </View>)
  // }

  render() {
    if (!this.state.isLoading) {

      // if (this.questions[this.state.qIndex].question.type == 'text'){
        // QuestionArea = this.getQuestionAreaForText()
      // } else {
      // QuestionArea = this.getQuestionAreaForImage()
      // }
      return (
        <View style={styles.mainContainer}>
          {/* <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              {this.questions[this.state.qIndex].question.content}
            </Text>
          </View> */}
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
