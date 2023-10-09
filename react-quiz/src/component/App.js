import { useEffect,useReducer } from 'react';
import './../index.css';
import Header from './Header'
import Loader from './Loader'
import Error from './Error'
import Main from './Main';
import StartScreen from './StartScreen.component';
import Questions from './Questions.component';
import NextButton from './NextButton.component';
import ProgressBar from './ProgressBar.component';
import FinishScreen from './FinishScreen.component';

const initialState = {
  status: 'loading',
  questions: [],
  index: 0,
  answer: null,
  points:0,
  highScore: 0,
}
function reducer(state,action){
  switch (action.type) {
    case 'dataReceived':
      return{
        ...state,
        questions: action.payLoad,
        status: 'ready'
      }
    case 'dataFailed':
      return{
        ...state,
        status: 'error'
      }
    case 'dataActive':
      return{
        ...state,
        status: 'active'
      }
    case 'newAnswer':
      const question = state.questions.at(state.index)
      return{
        ...state,
        answer: action.payLoad,
        points: action.payLoad === question.correctOption ? 
        state.points + Number(question.points): state.points
      }
    case 'nextQuestion':
      return{
        ...state,
        index: state.index + 1,
        answer: null
      }
    case 'finished':
      return{
        ...state,
        status: 'finished',
        highScore: state.points < state.highScore? state.highScore : state.points
      }
    case 'restart':
      return{
        ...initialState,
        questions: state.questions,
        status: 'ready',
        highScore: state.highScore
      }
    default:
      throw new Error('Action unknown')
  }
}

function App() {
  const [{status,questions,index,answer,points,highScore}, dispatch] = useReducer(reducer,initialState)
  const countQuest = questions.length
  const maxPoints = questions.reduce((prev,cur)=>prev+cur.points,0)
  useEffect(() => {
     fetch('http://localhost:8000/questions')
     .then(res=>res.json())
     .then(data=>dispatch({type:'dataReceived',payLoad:data}))
     .catch(error=>dispatch({type:'dataFailed'}))
  }, [])
  return (
    <div className="app">
      <Header/>
      <Main>
        {status === 'loading' && <Loader/>}
        {status === 'error' && <Error/> }
        {status === 'ready' && <StartScreen countQuest={countQuest} dispatch={dispatch}/>}
        {status === 'active' && 
        (<>
        <ProgressBar 
        countQuest={countQuest} 
        index={index}
        point={points}
        maxPoints={maxPoints}
        answer={answer}
        />
        <Questions  
        question={questions[index]}
        dispatch={dispatch}
        answer={answer}
        />
        <NextButton
        answer={answer}
        dispatch={dispatch} 
        index={index}
        countQuest={countQuest}
        />
        </>)}
        {status === 'finished' &&
        <FinishScreen 
        highScore={highScore} 
        points={points} 
        maxPoints={maxPoints} 
        dispatch={dispatch}
        />}
      </Main>
    </div>
  );
}

export default App;
