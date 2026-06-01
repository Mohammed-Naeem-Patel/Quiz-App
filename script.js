const questions=[
    {
        question:"Which HTML tag is used to create a hyperlink?",
        answers:[
            { text:"&lt;link&gt;", correct:false},
            { text:"&lt;href&gt;", correct:false},
            { text:"&lt;a&gt;", correct:true},
            { text:"&lt;hyperlink&gt;", correct:false},
        ]
    },
    {
        question:"Which CSS property is used to control the space between an element's content and its border?",
        answers:[
            { text:"margin", correct:false},
            { text:"padding", correct:true},
            { text:"spacing", correct:false},
            { text:"border-width", correct:false},
        ]
    },
    {
        question:"In JavaScript, which keyword is used to declare a variable that cannot be reassigned?",
        answers:[
            { text:"var", correct:false},
            { text:"let", correct:false},
            { text:"static", correct:false},
            { text:"const", correct:true},
        ]
    },
    {
        question:"What does the === operator check in JavaScript?",
        answers:[
            { text:"Only value equality", correct:false},
            { text:"Only type equality", correct:false},
            { text:"Boht value and type equality", correct:true},
            { text:"Assignment of a value", correct:false},
        ]
    },
    {
        question:"Which organization defines the official Web Standards?",
        answers:[
            { text:"Microsoft Corporation", correct:false},
            { text:"World Wide Web Consortium (W3C)", correct:true},
            { text:"Apple Inc", correct:false},
            { text:"Google Inc", correct:false},
        ]
    }
];

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex + 1;
    questionElement.innerHTML=questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }

        button.disabled = true;
    });

    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML=`Your Score ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});
startQuiz();