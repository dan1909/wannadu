import { AsyncStorage } from 'react-native'
const consts = require('../consts')

isLoggedIn = async () => {
  try {
    const token = await AsyncStorage.getItem(consts.TOKEN_KEY)
    const response = await fetch('http://localhost:3000/user', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    })

    // If we got status ok(200) and the user, that means the user has a valid
    // token. we will set the user is the state and return isLoggedIn true
    const user = await response.json() || null
    if (response !== null && response.status == 200 && user != null) {
      // TODO: setState of user
      return true
    } else {
      return false
    }
  } catch (error) {
    // Error retrieving data
    console.log("userService:: isLoggedIn: Error", error)
    return false
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

exports.isLoggedIn = isLoggedIn
exports.postQuestion = postQuestion
