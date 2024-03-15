import { useEffect } from 'react'

export default function Timer({ secondsRemaining, dispatch }) {
    const min = Math.floor(secondsRemaining / 60)
    const seconds = secondsRemaining % 60

    useEffect(() => {
        const timerId = setInterval(() => {
            dispatch({ type: 'tick' })
        }, 1000)
        return () => clearInterval(timerId)
    }, [dispatch])

    return (
        <div className="timer">
            {min < 10 ? `0${min}` : min}:
            {seconds < 10 ? `0${seconds}` : seconds}
            {/* {min < 10 && 0}
            {min}:{seconds < 10 && 0}
            {seconds} */}
        </div>
    )
}
