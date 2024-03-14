export default function FinishScreen({
    points,
    maxPossiblePoints,
    highscore,
    dispatch,
}) {
    const percentage = (points / maxPossiblePoints) * 100

    let emoji
    if (percentage === 100) emoji = '🏅'
    if (percentage >= 80 && percentage < 100) emoji = '👏'
    if (percentage >= 50 && percentage < 80) emoji = '😜'
    if (percentage >= 0 && percentage < 50) emoji = '🤔'
    if (percentage === 0) emoji = '💩'

    return (
        <>
            <div className="result">
                <span>{emoji}</span> You scored {points} out of{' '}
                {maxPossiblePoints} ({Math.ceil(percentage)}%)
            </div>
            <div className="highscore">(Highscore: {highscore} points)</div>
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: 'restart' })}
            >
                Restart Quiz
            </button>
        </>
    )
}
