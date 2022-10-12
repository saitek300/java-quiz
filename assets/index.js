
var startBtn = document.getElementById("start-btn")
var questionContainer = document.getElementById("question-container")
var questionElement = document.getElementById("question")
var answerButtonsElement = document.getElementById("answer-buttons")

var shuffledQuestions, currentQuestionIndex
var gameStarted = false
var initialTime = 60
var timeLeft = null



//functions

function init () {
    timer.textContent = initialTime
}

function startGame () {

  startBtn.classList.add("hide")
  questionContainer.classList.remove("hide")
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  setNextQuestion()

    if (gameStarted) {
        return
    }
  
    gameStarted = true
    timeLeft = initialTime;
    var gameTime = setInterval(function() {

        if (timeLeft > 0 ) {
            timeLeft--;
            timer.textContent = timeLeft;
        } 
        else{
            console.log("game over");
            gameStarted = false
            clearInterval(gameTime);
        }
    },1000);

}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    var button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
  
}
function resetState() {
 
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  var selectedButton = e.target
  var correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button =>{
  setStatusClass(button, button.dataset.correct)
  
})
  if (shuffledQuestions.length > currentQuestionIndex + 1 ){

  startBtn.innerText = 'restart'
  startBtn.classList.remove('hide')
}
}
function setStatusClass(element,correct) {

  if (correct){
    
    (currentQuestionIndex++, setNextQuestion())
  }
  else {
    correct = false
    timeLeft--
    
  }
}



function gameOver() {
  
}
var questions = [
  { 
    question: 'Commonly used data types DO not include:',
    answers: [
    {text: 'strings', correct: false},
    {text: 'booleans', correct: false},
    {text: 'alerts', correct: true},
    {text: 'numbers', correct: false},
    ]
    
  },

  { 
    question: 'The condition in an if / else statement is enclosed with _____.',
    answers: [
      {text: 'quotes', correct: false},
      {text: 'curly brackets', correct: true},
      {text: 'paranthesis', correct: false},
      {text: 'square brackets', correct: false},
      ]
  },
  { 
    question: 'Arrays in JavaScript can be used to store _____.',
    answers: [
      {text: 'numbers and strings', correct: false},
      {text: 'other arrays', correct: false},
      {text: 'booleans', correct: false},
      {text: 'all of the above', correct: true},
      ]
  },
  { 
    question: 'String values must be enclosed within _____ when being assinged to variables.',
    answers: [
      {text: 'commas', correct: false},
      {text: 'curly brackets', correct: false},
      {text: 'quotes', correct: true},
      {text: 'paranthesis', correct: false},
      ]
  },
  { 
    question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
    answers: [
      {text: 'JavaScript', correct: false},
      {text: 'Terminal/bash', correct: false},
      {text: 'for loops', correct: false},
      {text: 'console.log', correct: true},
      ]
  }

]


init()
startBtn.addEventListener("click", startGame)