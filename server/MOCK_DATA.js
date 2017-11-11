
const mock_data =
  [
    {
      'question': {'text': 'Hungry?', 'type': 'text'}, // change to const
      'answers': [{'content': 'Yes', 'backgroundColor': '#44c767', 'tag': 'food', 'score': 10},
                  {'content': 'Maybe', 'backgroundColor': 'yellow', 'tag': 'food', 'score': 5},
                  {'content': 'No', 'backgroundColor': 'red', 'tag': 'food', 'score': 0},
                ]
    },
    {
      'question': {'text': 'Bored?', 'type': 'text'}, // change to const
      'answers': [{'content': 'Yes', 'backgroundColor': '#44c767', 'tag': 'movie', 'score': 10},
                  {'content': 'Maybe', 'backgroundColor': 'yellow','tag': 'movie', 'score': 5},
                  {'content': 'No', 'backgroundColor': 'red', 'tag': 'movie', 'score': 0},
                ]
    },
    {
      'question': {'text': 'Katie or Rihana?', 'type': 'image'}, // change to const
      'answers': [{'content': 'katie_perry', 'sub_text': 'Katie', 'tag': 'food', 'score': 10},
                  {'content': 'rihana', 'sub_text': 'Rihana', 'tag': 'Bar', 'score': 10}]
    }
  ]


module.exports = mock_data
