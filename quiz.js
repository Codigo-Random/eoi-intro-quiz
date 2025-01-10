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
  questionAnswers.forEach((answer) => {
    answerBox.innerHTML += `<button
            class="bg-slate-200 rounded-lg p-2.5 hover:bg-slate-800 hover:text-white transition-all"
          >
            ${answer}
          </button>`;
  });
}

function nextQuestion() {
  currentQuestion++;
  console.log(currentQuestion);
  printQuestion();
}

printQuestion();
