import React from 'react'
import Options from './Options.component'

export default function Questions({question,dispatch,answer}) {
  return (
    <div>
        <h4>{question.question}</h4>
        <Options 
        question={question}
        dispatch={dispatch}
        answer={answer}
        />
    </div>
  )
}
