const questions = [
  {
    id: 1,
    question: "¿Dónde se encuentra el monte Everest?",
    answers: ["Nepal", "China", "India", "Bhutan"],
    correctAnswer: "Nepal",
  },
  {
    id: 2,
    question: "¿A qué provincia pertenece Sierra Nevada?",
    answers: ["Granada", "Almería", "Málaga", "Jaén"],
    correctAnswer: "Granada",
  },
  {
    id: 3,
    question: "¿Cómo se llama el conjunto de montañas más grande de España",
    answers: [
      "Sistema Central",
      "Sistema Ibérico",
      "Sistema Penibético",
      "Sistema Bético",
    ],
    correctAnswer: "Sistema Central",
  },
  {
    id: 4,
    question: "¿Cómo se llama el río más largo de España?",
    answers: ["Ebro", "Duero", "Tajo", "Guadiana"],
    correctAnswer: "Ebro",
  },
];

let currentQuestion = 0;

const title = document.getElementById("question");
const answerBox = document.getElementById("answerBox");
const infoQuestion = document.getElementById("infoQuestion");

function printQuestion() {
  // Pintar el titulo de la pregunta
  title.innerText = questions[currentQuestion].question;

  // De la pregunta actual
  let questionAnswers = questions[currentQuestion].answers;

  // Desordena las respuestas para que no estén siempre en el mismo orden
  questionAnswers.sort(() => Math.random() - 0.5);

  // Antes de pintar las NUEVAS respuestas, se borra el contenido del div
  answerBox.innerHTML = "";

  // Se generan los botones de respuesta
  questionAnswers.forEach((answer, index) => {
    answerBox.innerHTML += `<button
            id="btn${index}"
            onclick="checkAnswer('${answer}', 'btn${index}')"
            class="bg-slate-200 hover:bg-slate-800 hover:text-white rounded-lg p-2.5 transition-all"
          >
            ${answer}
          </button>`;
  });

  printInfoQuestion();
}

function checkAnswer(answer, btnId) {
  const currentCorrectAnswer = questions[currentQuestion].correctAnswer;

  // if else en operador ternario
  const bgColor =
    answer == currentCorrectAnswer ? "bg-green-500" : "bg-red-500";

  // aqui eliminamos el color gris y añadimos el color que toque según respuesta
  document.getElementById(btnId).classList.remove("bg-slate-200");
  document.getElementById(btnId).classList.add(bgColor);
}

function nextQuestion() {
  currentQuestion++;
  console.log(currentQuestion);
  printQuestion();
}

function printInfoQuestion() {
  infoQuestion.innerText = `Pregunta ${currentQuestion + 1} de ${
    questions.length
  }`;
}

printQuestion();
