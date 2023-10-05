import React from 'react'

export default function ProgressBar({index,countQuest,point,maxPoints,answer}) {
  return (
    <header className='progress'>
        <progress max={countQuest} value={index + Number(answer !== null)}/>
        <p>
            Question <strong>{index+1}</strong> / {countQuest}
        </p>
        <p>
            <strong>{point}</strong> / {maxPoints}
        </p>
    </header>
  )
}
