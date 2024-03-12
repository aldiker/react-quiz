export default function Options({ question, dispatch, answer }) {
    const hasAnswer = answer !== null

    return (
        <div className="options">
            {question.options.map((option, idx) => (
                <button
                    className={`btn btn-option ${
                        idx === answer ? 'answer' : ''
                    } ${
                        hasAnswer
                            ? idx === question.correctOption
                                ? 'correct'
                                : 'wrong'
                            : ''
                    }`}
                    key={idx}
                    disabled={hasAnswer}
                    onClick={() =>
                        dispatch({ type: 'newAnswer', payload: idx })
                    }
                >
                    {option}
                </button>
            ))}
        </div>
    )
}
