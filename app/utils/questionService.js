import { AsyncStorage } from 'react-native'
const consts = require('../consts')

getQuestions = async () => {
  try {
    // const response = await fetch('http://localhost:3000/questions')
    const token = await AsyncStorage.getItem(consts.TOKEN_KEY)
    const response = await fetch('http://localhost:3000/questions', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    })
    if (response !== null && response.status == 200){

      const questions = await response.json() || []
      return questions
    }
  } catch (error) {
    // Error retrieving data
    console.log('Error in getting questions', error)
    return []
  }
}

postQuestion = async () => {
  const response = await fetch('http://localhost:3000/questions', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstParam: 'yourValue',
      secondParam: 'yourOtherValue',
    })
  })
}

postAnswer = async (data) => {
  console.log("!!!!!! postAnswer", data)
  const token = await AsyncStorage.getItem(consts.TOKEN_KEY)
  const response = await fetch('http://localhost:3000/answers', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify(data)
  })
}

exports.getQuestions = getQuestions
exports.postQuestion = postQuestion
exports.postAnswer = postAnswer
