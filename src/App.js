import { useEffect, useReducer } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Loader from './components/Loader'
import Error from './components/Error'
import StartScreen from './components/StartScreen'

const initialState = {
    questions: [],
    // 'loading', 'error', 'ready', 'active', 'finished'
    status: 'loading',
}

function reducer(state, action) {
    switch (action.type) {
        case 'dataReceived':
            return { ...state, status: 'ready', questions: action.payload }
        case 'dataFailed':
            return { ...state, status: 'error' }
        default:
            throw new Error('Action unknown')
    }
}

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { questions, status } = state
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

    return (
        <div className="app">
            <Header />
            <Main>
                {status === 'loading' && <Loader />}
                {status === 'error' && <Error />}
                {status === 'ready' && (
                    <StartScreen numQuestions={numQuestions} />
                )}
            </Main>
        </div>
    )
}
