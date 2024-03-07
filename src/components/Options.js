export default function Options({ question }) {
	return (
		<div className="options">
			{question.options.map((option, idx) => (
				<button className="btn btn-option" key={idx}>
					{option}
				</button>
			))}
		</div>
	)
}
