export default function Progress({
    index,
    numQuestions,
    points,
    numPoints,
    answer,
}) {
    return (
        <header className="progress">
            <progress
                max={numQuestions}
                value={index + Number(answer !== null)}
            />
            <p>
                Question: {index + 1}/{numQuestions}
            </p>
            <p>
                {points}/{numPoints} points
            </p>
        </header>
    )
}
