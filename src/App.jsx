import {useState} from "react";
import Quiz from "./components/Quiz/Quiz.jsx";
import "./App.css"

const App = () => {

    const [isGameStarted, setIsGameStarted] = useState(false);

    return (
        <div className="app-container">
            {
                isGameStarted ? <Quiz setIsGameStarted={setIsGameStarted}/> :
                <div className="hero-wrapper">
                    <h1 className="hero-wrapper__app-title">Quizzical</h1>
                    <p className="hero-wrapper__app-description">Take on a quiz with 5 random questions!</p>
                    <button 
                        className="hero-wrapper__start-btn"
                        onClick={() => setIsGameStarted(prevState => !prevState)}
                    >
                        Start game
                    </button>
                </div>
            }
        </div>
    )
}

export default App