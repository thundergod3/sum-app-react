import React, { useState, useEffect } from "react";
import QuizOption from "../quizOption/QuizOption";

const Quiz = () => {
	const [state, setState] = useState({});

	useEffect(() => {
		playGame();
	}, []);

	const randomNumber = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	const generateRandomOption = (sum) => {
		let resultsArray = [];
		let randomNumberArray = [];

		while (randomNumberArray.length <= 3) {
			let renderRandomNumber = randomNumber(1, 19);
			if (randomNumberArray.indexOf(renderRandomNumber) > -1) continue;
			randomNumberArray.push(renderRandomNumber);
		}

		for (let i = 0; i < 3; i++) {
			let addSubtract = randomNumber(0, 1);
			let result = sum;

			if (addSubtract === 1) {
				// add the number to the result
				result += randomNumberArray[i];
				resultsArray.push(result);
			} else {
				// subtract the number from result
				result -= randomNumberArray[i];
				resultsArray.push(result);
			}
		}

		return resultsArray;
	};

	const playGame = () => {
		let field1 = randomNumber(20, 50);
		let field2 = randomNumber(20, 50);
		let result = field1 + field2;
		let correct = false;
		let gameOver = false;

		let resultsArray = generateRandomOption(result);
		resultsArray.push(result);

		resultsArray.sort(function (a, b) {
			return 0.5 - Math.random();
		});

		if (state.gameOver) {
			console.log("hello");
			setState((preState) => {
				return {
					...preState,
					resultsArray,
					field1,
					field2,
					answer: result,
					correct,
					gameOver,
					classname: "hide",
				};
			});
		} else {
			setState((preState) => {
				return {
					...preState,
					resultsArray,
					field1,
					field2,
					answer: result,
					correct,
					gameOver,
					classname: "hide",
				};
			});
		}
	};

	const checkResult = (result) => {
		if (state.answer === result)
			setState((preState) => {
				return {
					...preState,
					correct: true,
					gameOver: true,
					classname: "correct animated zoomInDown",
				};
			});
		else
			setState((preState) => {
				return {
					...preState,
					correct: false,
					gameOver: true,
					classname: "wrong animated zoomInDown",
				};
			});
	};

	const renderOptions = () => (
		<div className="options">
			{state.resultsArray &&
				state.resultsArray.map((result, index) => (
					<QuizOption key={index} result={result} checkResult={() => checkResult(result)} />
				))}
		</div>
	);

	const renderMessage = () => {
		if (state.correct) return <h3>Good Job! Hit the button below to Play Again</h3>;
		else return <h3>Ohhh ohhh! Hit the button below to Play Again</h3>;
	};

	const play = () => {
		setState((preState) => {
			return {
				...preState,
				correct: false,
				gameOver: false,
			};
		});
		playGame();
	};

	return (
		<div className="quiz">
			<div className="quiz-content">
				<p className="question">
					What is sum of <span className="text-info">{state.field1}</span> and{" "}
					<span className="text-info">{state.field2}</span> ?
				</p>
				{Object.keys(state).length !== 0 && renderOptions()}
				{state.gameOver && <div className={`after ${state.classname}`}>{renderMessage()}</div>}
				<div className="play-again" onClick={() => play()}>
					<a className="button">Play again</a>
				</div>
			</div>
		</div>
	);
};

export default Quiz;
