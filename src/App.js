import { useEffect, useReducer } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Loader from './components/Loader'
import Error from './components/Error'
import StartScreen from './components/StartScreen'
import Question from './components/Question'

const initialState = {
    questions: [],
    // 'loading', 'error', 'ready', 'active', 'finished'
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
}

function reducer(state, action) {
    switch (action.type) {
        case 'dataReceived':
            return { ...state, status: 'ready', questions: action.payload }
        case 'dataFailed':
            return { ...state, status: 'error' }
        case 'start':
            return { ...state, status: 'active' }
        case 'newAnswer':
            const question = state.questions.at(state.index)
            return {
                ...state,
                answer: action.payload,
                points:
                    action.payload === question.correctOption
                        ? state.points + question.points
                        : state.points,
            }
        default:
            throw new Error('Action unknown')
    }
}

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { questions, status, index, answer } = state
    const numQuestions = questions.length

    useEffect(() => {
        fetch('http://localhost:8000/questions')
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                dispatch({ type: 'dataReceived', payload: data })
            })
            .catch((err) => {
                console.log('Error')
                dispatch({ type: 'dataFailed' })
            })
    }, [])

    function handleStart() {
        dispatch({ type: 'start' })
    }

    return (
        <div className="app">
            <Header />
            <Main>
                {status === 'loading' && <Loader />}
                {status === 'error' && <Error />}
                {status === 'ready' && (
                    <StartScreen
                        numQuestions={numQuestions}
                        onStart={handleStart}
                    />
                )}
                {status === 'active' && (
                    <Question
                        question={questions[index]}
                        dispatch={dispatch}
                        answer={answer}
                    />
                )}
            </Main>
        </div>
    )
}
