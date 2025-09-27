const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];
let apiUrl = '';
const numberOfQuestions = localStorage.getItem('numberOfQuestions');
const category = localStorage.getItem('category');
const difficulty = localStorage.getItem('difficulty');

console.log(`${numberOfQuestions}, ${category}, ${difficulty}`);
if(category === 'any' && difficulty === 'any'){
    apiUrl = `https://opentdb.com/api.php?amount=${numberOfQuestions}`;
    console.log(apiUrl);
}else if(category === 'any'){
    apiUrl = `https://opentdb.com/api.php?amount=${numberOfQuestion}&difficulty=${difficulty}`;
    console.log(2);
}else if(difficulty=== 'any'){
    apiUrl = `https://opentdb.com/api.php?amount=${numberOfQuestion}&category=${category}`;
    console.log(3);
}else{
    apiUrl = `https://opentdb.com/api.php?amount=${numberOfQuestion}&category=${category}&difficulty = ${difficulty}`;
    console.log(4);
}


fetch(apiUrl).then(res =>{
    return res.json();
}).then(loadedQuestions =>{
    questions = loadedQuestions.results.map(loadedQuestion =>{
        const formattedQuestion = {
            question:loadedQuestion.question
        }

        const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random()*3)+1;
        answerChoices.splice(formattedQuestion.answer-1, 0, loadedQuestion.correct_answer);
        answerChoices.forEach((choice, index) =>{
            formattedQuestion["choice"+(index+1)] = choice;
        })

        return formattedQuestion;
    });
    
    startGame();
}).catch(err =>{
    console.error(err);
})

// Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () =>{
    game.classList.remove("hidden");
    loader.classList.add("hidden");
    questionCoutner =0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}


getNewQuestion = () =>{
    if(availableQuestions.length ===0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign("/end.html");
    }
    questionCounter++;
    progressText.innerText = "Question "+questionCounter + "/" +MAX_QUESTIONS;
    // Update the porgress bar
    progressBarFull.style.width = (questionCounter/MAX_QUESTIONS)*100+"%"

    const questionIndex = Math.floor(Math.random()*availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach (choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
}


choices.forEach(choice =>{
    choice.addEventListener("click", e=>{
        if(!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if(classToApply ==="correct"){
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( ()=>{
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();

        }, 1000)

    })
})


incrementScore = num =>{
    score+=num;
    scoreText.innerText = score;
}
