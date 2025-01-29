let questions = [];

const requestOptions = {
  method: "GET",
  headers: {
    apikey:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyaWxlb2ZkamtjbXNwdmVibnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyNzk1MDYsImV4cCI6MjA0OTg1NTUwNn0.MZx5Cpcw6aqM7A9Sc8_VC6HWnSKQ0SYkWpTqUAI0-Pg",
  },
};

fetch(
  "https://irileofdjkcmspvebnqq.supabase.co/rest/v1/questions",
  requestOptions
)
  .then((response) => response.json()) // convierte el resultado en un objeto JSON
  .then((result) => {
    questions = result.sort(() => Math.random() - 0.5); // desordena las preguntas
    printQuestion();
    intervalID = setInterval(countdown, 1000);
  })
  .catch((error) => {
    console.log("VA MAL");
    console.error(error);
  });

let currentQuestion = 0;
let isAnswered = false;

// Timer
const totalTimer = 30;
let timer = 30;
let intervalID;

// Resultados
let score = 0;

const title = document.getElementById("question");
const answerBox = document.getElementById("answerBox");
const infoQuestion = document.getElementById("infoQuestion");
const btnNext = document.getElementById("btnNext");
const txtTimer = document.getElementById("txtTimer");
const progressBar = document.getElementById("progressBar");

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

  // El botón de siguiente se des-habilita
  btnNext.disabled = true;

  printInfoQuestion();
}

function checkAnswer(answer, btnId) {
  if (!isAnswered) {
    // Cada vez que se pulse y no ha pulsado antes
    isAnswered = true;

    // El botón de siguiente se habilita
    btnNext.disabled = false;

    const currentCorrectAnswer = questions[currentQuestion].correctAnswer;
    const isCorrect = answer == currentCorrectAnswer;
    if (isCorrect) {
      score += timer;
      localStorage.setItem("score", score);
    }
    console.log("SCORE", score);

    // if else en operador ternario
    const bgColor =
      answer == currentCorrectAnswer ? "bg-green-500" : "bg-red-500";

    // aqui eliminamos el color gris y añadimos el color que toque según respuesta
    document.getElementById(btnId).classList.remove("bg-slate-200");
    document.getElementById(btnId).classList.add(bgColor);
  }
}

function nextQuestion() {
  if (isAnswered) {
    currentQuestion++;

    console.log("currentQuestion");

    // 4 y total de 4 preguntas == true
    if (currentQuestion == questions.length) {
      window.location = "/ranking.html";
    }

    isAnswered = false;
    console.log(currentQuestion);
    printQuestion();

    // Reinicializamos el contador (timer a 30s + 1)
    timer = totalTimer + 1;
    // Arrancamos de nuevo el contador
    intervalID = setInterval(countdown, 1000);
  }
}

function printInfoQuestion() {
  infoQuestion.innerText = `Pregunta ${currentQuestion + 1} de ${
    questions.length
  }`;
}

function countdown() {
  timer -= 1;
  console.log("timer", timer);
  txtTimer.innerText = `${timer}`;

  console.log("Se ha respondido? => ", isAnswered);

  // progressBar.classList.remove("opacity-0");
  // progressBar.classList.add("opacity-100");
  progressBar.classList.replace("opacity-0", "opacity-100");

  const widthPercent = getPercent(timer);
  progressBar.style.width = `${widthPercent}%`;

  if (isAnswered || timer == 0) {
    // Parar
    clearInterval(intervalID);

    // Aunque no haya contestado, decimos que si, para que no pueda marcar ninguna respuesta
    isAnswered = true;
    btnNext.disabled = false;

    if (timer == 0) {
      // alert("Tiempo finalizado");
    }
  }
}

function getPercent(currentTime) {
  return (currentTime * 100) / totalTimer;
  // return ((totalTimer - currentTime) * 100) / totalTimer;
}
