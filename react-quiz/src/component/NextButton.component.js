import React from 'react'

export default function NextButton({answer,dispatch,index,countQuest}) {
if (answer === null)return null

if (index < countQuest - 1){
    return (
        <button
        className='btn btn-ui'
        onClick={()=>dispatch({type:'nextQuestion'})}
        >
            Next
        </button>    
    )
}
if(index === countQuest - 1){
    return (
        <button
        className='btn btn-ui'
        onClick={()=>dispatch({type:'finished'})}
        >
            Finish
        </button>    
    )
}
}
