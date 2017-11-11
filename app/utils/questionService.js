getQuestions = async () => {
  try {
    const response = await fetch('http://localhost:3000/questions')
    if (response !== null && response.status == 200){
      console.log("!!!!!! get_questions", response)
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

exports.getQuestions = getQuestions
exports.postQuestion = postQuestion
