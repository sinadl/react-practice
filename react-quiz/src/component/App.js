import { useEffect,useReducer } from 'react';
import './../index.css';
import Header from './Header'
import Loader from './Loader'
import Error from './Error'
import Main from './Main';
import StartScreen from './StartScreen.component';
import Questions from './Questions.component';

const initialState = {
  status: 'loading',
  questions: [],
  index: 0,
  answer: null,
  points:0
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
    default:
      throw new Error('Action unknown')
  }
}

function App() {
  const [{status,questions,index,answer,points}, dispatch] = useReducer(reducer,initialState)
  const countQuest = questions.length
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
        <Questions  
        question={questions[index]}
        dispatch={dispatch}
        answer={answer}
        />}
      </Main>
    </div>
  );
}

export default App;
