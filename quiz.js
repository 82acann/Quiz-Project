const questions = [
  {
    question: "When two fair coins are flipped simultaneously, what is the probability of getting at least one head?",
    answers: [
      { text: "5/6", correct: false },
      { text: "25/91", correct: false },
      { text: "3/4", correct: true },
      { text: "1/4", correct: false }
    ]
  },
  {
    question: "A fair six-sided die is rolled once. What is the probability of rolling a number that is even OR greater than 4?",
    answers: [
      { text: "1/3", correct: false },
      { text: "2/3", correct: true },
      { text: "25/64", correct: false },
      { text: "11/13", correct: false }
    ]
  },
  {
    question: "A bag has 3 white marbles and 5 black marbles. You draw two marbles one after another without replacement. What is the probability that both marbles are black?",
    answers: [
      { text: "5/14", correct: true },
      { text: "14/5", correct: false },
      { text: "15/12", correct: false },
      { text: "1/4", correct: false }
    ]
  }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  const questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  // Highlight the right answer and disable all buttons
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  } else {
    startQuiz();
  }
});

// Initialize the app
startQuiz();
