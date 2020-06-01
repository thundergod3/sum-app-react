import React from "react";

const QuizOption = ({ result, checkResult }) => {
	return (
		<div className="fields animated zoomIn" onClick={checkResult}>
			<div className="field-block">{result}</div>
		</div>
	);
};

export default QuizOption;
