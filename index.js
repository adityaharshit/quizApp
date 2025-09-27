const numberOfQuestions = document.getElementById('numberOfQuestions');
const category = document.getElementById('category');
const difficulty = document.getElementById('difficulty');

numberOfQuestions.addEventListener('keyup', () =>{
    // console.log(numberOfQuestions.value);
    if(numberOfQuestions.value>0){
        document.getElementById('play').disabled = false;
    }else{
        document.getElementById('play').disabled = true;
    }
})

startGame = (e) =>{
    e.stopPropagation();
    e.preventDefault();
    if(numberOfQuestions.value < 1 || numberOfQuestions.value > 20) {
        alert("Please enter a number between 1 and 20");
        return;
    }
    localStorage.setItem('numberOfQuestions', numberOfQuestions.value);
    localStorage.setItem('category', category.value);
    localStorage.setItem('difficulty', difficulty.value);
    window.location.href = 'game.html';
}