const startBtn = document.getElementById('start-btn');
const instructionBtn = document.getElementById('instruction-btn');
const backBtn = document.getElementById('back-btn');
const restartBtn = document.getElementById('restart-btn');
const nextBtn = document.getElementById('next-btn');
const welcomeContainer = document.getElementById('welcome-container');
const instructionContainer = document.getElementById('instruction-container');
const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const questionNumberElement = document.getElementById('question-number');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const timeLeftElement = document.getElementById('time-left');

let currentQuestionIndex, currentScore, timeLeft, timer;

const questions = [
    {
        question: 'What does HTML stand for?',
        answers: [
            { text: 'HyperText Markup Language', correct: true },
            { text: 'Hyperlinks and Text Markup Language', correct: false },
            { text: 'Home Tool Markup Language', correct: false },
            { text: 'Hyper Tool Markup Language', correct: false }
        ]
    },
    {
        question: 'Who is making the Web standards?',
        answers: [
            { text: 'Mozilla', correct: false },
            { text: 'Microsoft', correct: false },
            { text: 'The World Wide Web Consortium', correct: true },
            { text: 'Google', correct: false }
        ]
    },
    {
        question: 'What does CSS stand for?',
        answers: [
            { text: 'Cascading Style Sheets', correct: true },
            { text: 'Creative Style System', correct: false },
            { text: 'Computer Style Sheets', correct: false },
            { text: 'Creative Sheet Styles', correct: false }
        ]
    },
    {
        question: 'Which programming language is used for adding interactivity to web pages?',
        answers: [
            { text: 'HTML', correct: false },
            { text: 'JavaScript', correct: true },
            { text: 'CSS', correct: false },
            { text: 'SQL', correct: false }
        ]
    },
    {
        question: 'What is the purpose of a media query in CSS?',
        answers: [
            { text: 'To apply styles based on the device characteristics', correct: true },
            { text: 'To include multimedia content like images and videos', correct: false },
            { text: 'To create animations and transitions', correct: false },
            { text: 'To optimize SEO', correct: false }
        ]
    },
    {
        question: 'Which tag is used to define a hyperlink in HTML?',
        answers: [
            { text: '<a>', correct: true },
            { text: '<link>', correct: false },
            { text: '<href>', correct: false },
            { text: '<url>', correct: false }
        ]
    },
    {
        question: 'What is the correct way to include an external JavaScript file in HTML?',
        answers: [
            { text: '<script src="script.js"></script>', correct: true },
            { text: '<js src="script.js"></js>', correct: false },
            { text: '<javascript src="script.js"></javascript>', correct: false },
            { text: '<src script="script.js"></src>', correct: false }
        ]
    },
    {
        question: 'Which CSS property is used to change the text color of an element?',
        answers: [
            { text: 'background-color', correct: false },
            { text: 'color', correct: true },
            { text: 'font-size', correct: false },
            { text: 'text-color', correct: false }
        ]
    },
    {
        question: 'What is a responsive web design?',
        answers: [
            { text: 'A design that responds to user interactions', correct: false },
            { text: 'A design that adapts to different screen sizes and devices', correct: true },
            { text: 'A design with rich multimedia content', correct: false },
            { text: 'A design that is easy to navigate', correct: false }
        ]
    },
    {
        question: 'What is the purpose of the alt attribute in an img tag?',
        answers: [
            { text: 'To specify the image source', correct: false },
            { text: 'To provide alternative text for screen readers and if the image fails to load', correct: true },
            { text: 'To set the alignment of the image', correct: false },
            { text: 'To add a caption to the image', correct: false }
        ]
    }
];

startBtn.addEventListener('click', startQuiz);
instructionBtn.addEventListener('click', showInstructions);
backBtn.addEventListener('click', showWelcome);
restartBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showNextQuestion();
    } else {
        showResult();
    }
});

function showInstructions() {
    welcomeContainer.classList.add('hide');
    instructionContainer.classList.remove('hide');
}

function showWelcome() {
    instructionContainer.classList.add('hide');
    welcomeContainer.classList.remove('hide');
}

function startQuiz() {
    welcomeContainer.classList.add('hide');
    instructionContainer.classList.add('hide');
    resultContainer.classList.add('hide');
    quizContainer.classList.remove('hide');
    currentQuestionIndex = 0;
    currentScore = 0;
    showNextQuestion();
}

function showNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
    startTimer();
}

function showQuestion(question) {
    questionNumberElement.innerText = `Question ${currentQuestionIndex + 1}`;
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
    nextBtn.classList.add('hide');
}

function resetState() {
    clearStatusClass(document.body);
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    questionContainer.classList.remove('hide');
}

function startTimer() {
    timeLeft = 30;
    timeLeftElement.innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timeLeftElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextBtn.classList.remove('hide');
        }
    }, 1000);
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        currentScore++;
    }
    clearInterval(timer);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    nextBtn.classList.remove('hide');
}

function showResult() {
    quizContainer.classList.add('hide');
    resultContainer.classList.remove('hide');
    scoreElement.innerText = `Your score is ${currentScore} out of ${questions.length}`;
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}


