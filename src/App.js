import { useEffect, useReducer } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Loader from './components/Loader'
import Error from './components/Error'
import StartScreen from './components/StartScreen'
import Question from './components/Question'
import NextButton from './components/NextButton'
import Progress from './components/Progress'
import FinishScreen from './components/FinishScreen'

const initialState = {
    questions: [],
    // 'loading', 'error', 'ready', 'active', 'finished'
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
}

function reducer(state, action) {
    switch (action.type) {
        case 'dataReceived':
            return { ...state, status: 'ready', questions: action.payload }
        case 'dataFailed':
            return { ...state, status: 'error' }
        case 'start':
            return { ...state, status: 'active' }
        case 'finish':
            return {
                ...state,
                status: 'finish',
                highscore:
                    state.highscore < state.points
                        ? state.points
                        : state.highscore,
            }
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
        case 'nextQuestion':
            return { ...state, index: state.index + 1, answer: null }
        case 'restart':
            // return {
            //     ...state,
            //     status: 'active',
            //     index: 0,
            //     answer: null,
            //     points: 0,
            // }
            return {
                ...initialState,
                questions: state.questions,
                highscore: state.highscore,
                status: 'ready',
            }
        default:
            throw new Error('Action unknown')
    }
}

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { questions, status, index, answer, points, highscore } = state
    const numQuestions = questions.length

    const numPoints = questions.reduce(
        (acc, question) => acc + question.points,
        0
    )

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
                    <>
                        <Progress
                            index={index}
                            numQuestions={numQuestions}
                            points={points}
                            numPoints={numPoints}
                            answer={answer}
                        />
                        <Question
                            question={questions[index]}
                            dispatch={dispatch}
                            answer={answer}
                        />
                        <NextButton
                            dispatch={dispatch}
                            answer={answer}
                            index={index}
                            numQuestions={numQuestions}
                        />
                    </>
                )}
                {status === 'finish' && (
                    <FinishScreen
                        points={points}
                        maxPossiblePoints={numPoints}
                        highscore={highscore}
                        dispatch={dispatch}
                    />
                )}
            </Main>
        </div>
    )
}
