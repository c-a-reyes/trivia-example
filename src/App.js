import React, {useState, useEffect} from 'react';
import {Button} from "@material-ui/core"
import {Paper} from "@material-ui/core"


const he = require("he");


function App() {
  const [questions, setQuestions] = useState([]);



  
  

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then((res) => 
      res.json())
      .then(response => {
        console.log(response);
        setQuestions(response.results);
      });
  }, [])
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      
    }}> 
    <h1>Trivia Q's</h1> 

    {questions.map(question => (
    <Question question= {question}/>
    ))}
  
    </div>
  );
}




const Question = ({question}) => {
  const[answered, setAnswered] = useState(false);


  const decodedQuestion = he.decode(question.question);
  const decodedCorrectAnswer = he.decode(question.correct_answer);

  const decodedIncorrectAnswers = question.incorrect_answers.map(answer => he.decode(answer));

  const allAnswers = [decodedCorrectAnswer, ...decodedIncorrectAnswers];
  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      const randIndex = Math.floor(Math.random() * allAnswers.length);
      const secondRandIndex = Math.floor(Math.random() * allAnswers.length);
  
      const temp = allAnswers[randIndex];
      allAnswers[randIndex] = allAnswers[secondRandIndex];
      allAnswers[secondRandIndex] = temp;
    };
  })


  const HandleClick = (answer) => {
    setAnswered(true);
  }


  return (
    <Paper 
    style={{
      textAlign: "center",
      border: "1px solid black",
      maxWidth: "40vw",
      padding: "10px",
      margin: "20px",
      }}
      >
      <h1>{decodedQuestion}</h1>
      <ul>
        {allAnswers.map((answer) => {
          if (answered) {
            return (
              <Button 
                variant = "contained" 
                style={{ margin: "5px", backgroundColor: answer === decodedCorrectAnswer ? "#52cc49" : "#ff5959"}} 
                onClick={() => HandleClick(answer)}
              >
                {answer}
              </Button>
            );
          }
        
          return (
            <Button 
              variant = "contained" 
              color = "default"
              style={{ margin: "5px"}} 
              onClick={() => HandleClick(answer)}
            >
              {answer}
            </Button>
          );
        })}
      </ul>
    </Paper>
  )}
export default App;
// const promiseFunction = async () => {};
// // used in more specific situations where it will most likely only be used once
//   promiseFunction().then(res => console.log(res))
//  // wrote out as a function, can be used multiple times and called whenever you want
//   async function func() {
//     const data = await promiseFunction();
//     console.log(data);

//   }
// // written in arrow syntax
//   const func2 = async () => {
//     const data = await promiseFunction();
//   };