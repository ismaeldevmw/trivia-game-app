import { useState, useEffect } from 'react';

import Questionaire from './components/Questionaire';

const API_URL = 'https://opentdb.com/api.php?amount=10&category=14&difficulty=easy&type=multiple';

function App() {

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const questions = data.results.map((question) => ({
          ...question,
          answers: [
            question.correct_answer,
            ...question.incorrect_answers,
          ].sort(() => Math.random() - 0.5),
        }));

        setQuestions(questions);
      });
  }, []);

  const handleAnswer = (answer) => {
    if(!showAnswers) {
      // prevent double answers
      if(answer === questions[currentIndex].correct_answer) {
        // increase the score
        setScore(score + 1)
      }
    }

    setShowAnswers(true);
  };

  const handleNextQuestion = () => {
    setCurrentIndex(currentIndex + 1);
    setShowAnswers(false);
  }

  return questions.length > 0 ? (
    <div className="bg-white dark:bg-violet-400 grid place-content-center place-items-center w-full h-screen">
      {currentIndex >= questions.length ? (
        <>
          <h1 className='text-2xl text-white font-bold'>
            Quiz Complete! Your  score is: {score}
          </h1>
          <p className='text-base text-white italic'>
            Think you can do better? <a href="/" className='hover:bg-slate-500'>Click here to try again</a> 
          </p>
        </>
      ) : ( 
        <Questionaire 
          data={questions[currentIndex]}
          showAnswers={showAnswers}
          handleNextQuestion={handleNextQuestion}
          handleAnswer={handleAnswer}
        />
      )}
    </div>
  ) : (
    <h2 className="text-2xl text-white font-bold">Loading...</h2>
  );
}

export default App;
