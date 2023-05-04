import classNames from "classnames";
import './Question.css'

const Question = (props) => {

    const handleAnswerSelect = (id, selectedAnswer) => {
        props.setQuestionsArray(prevQuestions => {
            return prevQuestions.map(question => {
                if (question.id === id) {
                    const isCorrectAnswerSelected = props.correctAnswer === selectedAnswer
                    return {...question, selectedAnswer, isCorrectAnswerSelected}
                } else {
                    return question
                }
            })
        })
    }
    
    return (
        <div className="question">
            <p className="question__content">{props.question}</p>
            <div className="question__answers-wrapper">
                {
                    props.answers.map((answer, idx) => (
                        <label 
                            htmlFor={answer} 
                            key={idx}
                            className={classNames(
                                'question__answer-label',
                                {'question__answer-label--selected': !props.isGameFinished && answer === props.selectedAnswer},
                                {'question__answer-label--correct': props.isGameFinished && answer === props.correctAnswer},
                                {'question__answer-label--incorrect': props.isGameFinished && answer !== props.correctAnswer},
                                {'question__answer-label--unselected': props.isGameFinished && answer !== props.correctAnswer && answer !== props.selectedAnswer}
                            )}
                        >
                            {answer}
                            <input
                                className="question__answer-radio-btn"
                                type="radio"
                                name={props.id}
                                id={answer}
                                disabled={props.isGameFinished}
                                onChange={() => handleAnswerSelect(props.id, answer)}
                            />
                        </label>
                    ))
                }
            </div>
        </div>
    )
}

export default Question