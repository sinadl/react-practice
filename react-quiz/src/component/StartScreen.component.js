import React from 'react'

export default function StartScreen({dispatch,countQuest}) {
  return (
    <div className='start'>
        <h2>Welcome to the React Quiz!!</h2>
        <h3>{countQuest} question to test your React mastery</h3>
        <button className='btn btn-ui' onClick={()=>dispatch({type:'dataActive'})}>Let's start</button>
    </div>
  )
}
