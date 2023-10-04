import React from 'react'

export default function Options({question,dispatch,answer}) {
    const isAnswer = answer !== null;
    console.log(question)
  return (
    <div>
        <div className='options'>
            {question.options.map((item,index)=>(
                <button className={`btn btn-option ${index === answer? 'answer':''}
                ${isAnswer? index === question.correctOption? 'correct':'wrong':''}
                `}
                 key={item}
                 disabled={isAnswer?true:''}
                 onClick={()=>dispatch({type:'newAnswer',payLoad:index})}
                 >{item}</button>
            ))}
        </div>
    </div>
  )
}
