 // main quiz content and operations ///////////////////////////////////////////

//////////////declaring variables for sounds////////////

var soundCorrect = new Audio("https://github.com/sifwolf1991/coding-quiz/raw/main/Assets/sound-correct.mp3?raw=true");
var soundIncorrect = new Audio("https://github.com/sifwolf1991/coding-quiz/raw/main/Assets/sound-incorrect.mp3?raw=true");

 //variable for storing the questions//

var questions = [
{ 
    prompt: `What does the !== operator do?`, 
    options: [ 
        "It checks whether two objects are not equal by value and type", 
        "It checks whether two objects are not equal by value, but not type", 
        "It checks whether two objects are equal by value and type", 
        "It checks whether two objects are equal by value, but not type", 
    ], 
    answer: "It checks whether two objects are not equal by value and type", 
}, 
/////////////////////////////////////////////////////////
{ 
    prompt: `What does <span> do?`, 
    options: [ 
        "It alters the spacing of a div element", 
        "It creates a line break", 
        "It targets the styling of a part of text", 
        "It changes a block layout to inline", 
    ], 
    answer: "It targets the styling of a part of text", 
}, 
/////////////////////////////////////////////////////////
{ 
    prompt: `Which symbol refers to the universal selector?`, 
    options: [
        ".", 
        "#", 
        "*", 
        "::"
    ], 
    answer: "*", 
}, 
/////////////////////////////////////////////////////////
{ 
    prompt: `What is the outermost box in the CSS box model?`, 
    options: [ 
        "Padding", 
        "Content", 
        "Border", 
        "Margin", 
    ], 
    answer: "Margin", 
}, 
/////////////////////////////////////////////////////////
{ 
    prompt: `What does API stand for?`, 
    options: [ 
        "Automated Project Information", 
        "Advanced Procedural Instruction", 
        "Algorithmic Processing Infrastructure", 
        "Application Programming Interface", 
    ], 
    answer: "Application Programming Interface", 
}, 
/////////////////////////////////////////////////////////
{ 
    prompt: `How do you make a comment in a HTML file?`, 
    options: [ 
        "// comment here //", 
        "<!--comment here-->", 
        "##comment here##", 
        "/*comment here*/", 
    ], 
    answer: "<!--comment here-->", 
}, 
/////////////////////////////////////////////////////////
{ 
    prompt: `Which is not a kind of for loop?`, 
    options: [ 
        "while", 
        "do-while", 
        "only", 
        "foreach", 
    ], 
    answer: "only", 
}, 
/////////////////////////////////////////////////////////
{ 
    prompt: `How do you make a function in Javascript?`, 
    options: [ 
        "func= addFunction()", 
        "function::addFunction()", 
        "function.addFunction()", 
        "function addFunction()", 
    ], 
    answer: "function addFunction()", 
}, 
/////////////////////////////////////////////////////////
{ 
    prompt: `Which attribute do you use to link CSS styling to a HTML document?`, 
    options: [ 
        "<rel link=>", 
        "<link css=>", 
        "<link src=>", 
        "<link rel=>", 
    ], 
    answer: "<link rel=>", 
}, 
/////////////////////////////////////////////////////////
{ 
    prompt: `What does the <head> section of a html page refer to?`, 
    options: [ 
        "The page headings", 
        "Metadata", 
        "The page border", 
        "The page header", 
    ], 
    answer: "Metadata", 
}, 
]; 
////////////////////////////////////////////////////////////////////

// Get HTML Elements 

let questionsEl = document.querySelector( 
    "#questions"
); 
let timerEl = document.querySelector("#timer"); 
let choicesEl = document.querySelector("#options"); 
let submitBtn = document.querySelector( 
"#submit-score"
); 
let startBtn = document.querySelector("#start"); 
let nameEl = document.querySelector("#name"); 
let feedbackEl = document.querySelector( 
"#feedback"
); 
let reStartBtn = document.querySelector("#restart"); 

// Quiz default state, timer size depends on how many questions
let currentQuestionIndex = 0; 
let time = questions.length * 12; 
let timerId; 

// a function for quiz start and setting timer to deincrement

function quizStart() { 
timerId = setInterval( 
    clockTick, 
    1000 
); 
// bring up quiz, hide opening screen
timerEl.textContent = time; 
let landingScreenEl = 
    document.getElementById( 
        "start-screen"
    ); 
landingScreenEl.setAttribute( 
    "class", 
    "hide"
); 
questionsEl.removeAttribute( 
    "class"
); 
getQuestion(); 
} 

// Answers and create list with buttons 
function getQuestion() { 
let currentQuestion = questions[currentQuestionIndex]; 
let promptEl = document.getElementById( 
        "question-words"
    ); 
promptEl.textContent = currentQuestion.prompt; 
choicesEl.innerHTML = ""; 
currentQuestion.options.forEach( 
    function (choice, i) { 
        let choiceBtn = 
            document.createElement( 
                "button"
            ); 
        choiceBtn.setAttribute( 
            "value", 
            choice 
        ); 
        choiceBtn.textContent = 
            i + 1 + ". " + choice; 
        choiceBtn.onclick = 
            questionClick; 
        choicesEl.appendChild( 
            choiceBtn 
        ); 
    } 
); 
} 

// IF ANSWER IS RIGHT OR WRONG////////////////////////////////////////
// Function to check for wrong answer
// If true (answer is wrong), timer will deduct 10 seconds
// Message will trigger saying answer is wrong
// otherwise the answer will be considered correct, and correct message will appear in green
// and correct answer sound will play, timer will be unaffected

function questionClick() { 
if ( 
    this.value !== questions[currentQuestionIndex] .answer 
) { 
    //deduct 10 seconds from timer if answer is wrong
    time -= 10; 
    if (time < 0) { 
        time = 0; 
    } 
///messages which trigger on right and wrong answers
    timerEl.textContent = time; 
    feedbackEl.textContent = `Incorrect! The correct answer was  
    ${questions[currentQuestionIndex].answer}.`; 
    feedbackEl.style.color = "blue"; 
// if answer is wrong, buzzer sound will play/////////////////////
        soundIncorrect.play();
} else { 
    feedbackEl.textContent = 
        "That is correct!"; 
    feedbackEl.style.color = 
        "green"; 
/////////// if answer was not wrong, correct answer sound will play
        soundCorrect.play();
} 
feedbackEl.setAttribute( 
    "class", 
    "feedback"
); 
setTimeout(function () { 
    feedbackEl.setAttribute( 
        "class", 
        "feedback hide"
    ); 
}, 2000); 
//conditional; process will run through all the questions until all questions have been presented
// and then the quiz will end. If the quiz has not ended and the questions have not been exhausted, quiz will keep running
currentQuestionIndex++; 
if ( 
    currentQuestionIndex === 
    questions.length 
) { 
    quizEnd(); 
} else { 
    getQuestion(); 
} 
} 

// function to end quiz
// Stops timer and shows final score 
// retrieves final score from html elements

function quizEnd() { 
clearInterval(timerId); 
let endScreenEl = document.getElementById( 
        "quiz-end"
    ); 
endScreenEl.removeAttribute( 
    "class"
); 
let finalScoreEl = document.getElementById( 
        "score-final"
    ); 
finalScoreEl.textContent = time; questionsEl.setAttribute( 
    "class", 
    "hide"
); 
} 

// conditional on time deincrementing, if time lapses, quiz will end

function clockTick() { 
time--; 
timerEl.textContent = time; 
if (time <= 0) { 
    quizEnd(); 
} 
} 

// User's name and score is saved in local storage, whitespace in name is 'trimmed'
// if name space is filled with content, this will be saved/retrieved from local storage


function saveHighscore() { 
let name = nameEl.value.trim(); 
if (name !== "") { 
    let highscores = JSON.parse( window.localStorage.getItem( 
                "highscores"
            ) 
        ) || []; 
    let newScore = { 
        score: time, name: name, 
    }; 
    highscores.push(newScore); window.localStorage.setItem( 
        "highscores", JSON.stringify(highscores) 
    ); 
    alert( 
        "Your Score has been saved onto the highscore list"
    ); 
} 
} 

// Save users' score after pressing enter 

function checkForEnter(event) { 
if (event.key === "Enter") { 
    saveHighscore(); 
    alert( 
        "Your Score has been saved onto the highscore list"
    ); 
} 
} 
nameEl.onkeyup = checkForEnter; 

// Save users' score after clicking submit 

submitBtn.onclick = saveHighscore; 

// Start quiz after clicking start quiz 

startBtn.onclick = quizStart;
