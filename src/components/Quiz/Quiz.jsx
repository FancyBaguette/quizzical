import {useState, useEffect} from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";
import Question from "../Question/Question.jsx";
import "./Quiz.css"

const Quiz = (props) => {

    const [questionsArray, setQuestionsArray] = useState(null)
    const [isGameFinished, setIsGameFinished] = useState(false)

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5&type=multiple')
            .then(response => response.json())
                .then(data => {
                    const customQuestionObjects = data.results.map(obj => {
                        return {
                            question: decode(obj.question),
                            correctAnswer: obj.correct_answer,
                            // Get an array of all answers in a random order
                            answersArray: [obj.correct_answer, ...obj.incorrect_answers].sort((a,b) => Math.random() - 0.5),
                            isCorrectAnswerSelected: false,
                            selectedAnswer: null,
                            id: nanoid()
                        }
                    })
                    setQuestionsArray(customQuestionObjects)
                })
    },[])

    const getTotalScore = () => {
        return questionsArray.reduce((acc, obj) => {
            if (obj.isCorrectAnswerSelected) {
                return acc + 1
            } else {
                return acc
            }
        },0)
    }

    console.log(questionsArray)

    return (
        <div className="quiz-wrapper">
            <div className="quiz-wrapper__questions">
                {
                    questionsArray && questionsArray.map(question => (
                        <Question
                            questionsArray={questionsArray}
                            setQuestionsArray={setQuestionsArray}
                            isGameFinished={isGameFinished}
                            question={question.question}
                            correctAnswer={question.correctAnswer}
                            answers={question.answersArray}
                            selectedAnswer={question.selectedAnswer}
                            id={question.id}
                            key={question.id}
                        />
                    ))
                }
            </div>
            <div className="quiz-wrapper__results-wrapper">
                {
                    !isGameFinished ?
                    <button 
                        className="results-wrapper__btn" 
                        onClick={() => setIsGameFinished(prevState => !prevState)}
                    >
                        Check answers
                    </button>
                    :
                    <>
                        <p className="results-wrapper__score">
                            You scored {getTotalScore()} / {questionsArray.length} correct answers
                        </p>
                        <button
                            className="results-wrapper__btn"
                            onClick={() => props.setIsGameStarted(prevState => !prevState)}
                        >
                            Play again
                        </button>
                    </>
                }
            </div>
        </div>
    )
}

export default Quiz