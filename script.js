const vocabulary = [
{ english: "zero", spanish: ["cero"] },
{ english: "one", spanish: ["uno"] },
{ english: "two", spanish: ["dos"] },
{ english: "three", spanish: ["tres"] },
{ english: "four", spanish: ["cuatro"] },
{ english: "five", spanish: ["cinco"] },
{ english: "six", spanish: ["seis"] },
{ english: "seven", spanish: ["siete"] },
{ english: "eight", spanish: ["ocho"] },
{ english: "nine", spanish: ["nueve"] },
{ english: "ten", spanish: ["diez"] },

{ english: "red", spanish: ["rojo"] },
{ english: "blue", spanish: ["azul"] },
{ english: "green", spanish: ["verde"] },
{ english: "yellow", spanish: ["amarillo"] },
{ english: "black", spanish: ["negro"] },
{ english: "white", spanish: ["blanco"] },
{ english: "grey", spanish: ["gris"] },

{ english: "door", spanish: ["puerta"] },
{ english: "window", spanish: ["ventana"] },
{ english: "bed", spanish: ["cama"] },
{ english: "table", spanish: ["mesa"] },
{ english: "chair", spanish: ["silla"] },
{ english: "kitchen", spanish: ["cocina"] },
{ english: "bathroom", spanish: ["baño"] },

{ english: "street", spanish: ["calle"] },
{ english: "square", spanish: ["plaza"] },
{ english: "park", spanish: ["parque"] },
{ english: "supermarket", spanish: ["supermercado"] },
{ english: "station", spanish: ["estación"] },
{ english: "bank", spanish: ["banco"] },
{ english: "hospital", spanish: ["hospital"] },
{ english: "school", spanish: ["escuela"] },
{ english: "restaurant", spanish: ["restaurante"] },
  { english: "bus", spanish: ["autobús"] },
  { english: "never", spanish: ["nunca"] },
  { english: "always", spanish: ["siempre"] },
  { english: "week", spanish: ["semana"] },
  { english: "year", spanish: ["año"] },
   { english: "weekend", spanish: ["fin de semana"] },
   { english: "month", spanish: ["mes"] },
   { english: "Monday", spanish: ["lunes"] },
   { english: "Tuesday", spanish: ["martes"] },
   { english: "Wednesday", spanish: ["miércoles"] },
   { english: "Thursday", spanish: ["jueves"] },
   { english: "Friday", spanish: ["viernes"] },
     { english: "Saturday", spanish: ["sábado"] },
   { english: "Sunday", spanish: ["domingo"] },
   { english: "morning", spanish: ["mañana"] },
   { english: "want", spanish: ["querer"] },
   { english: "sandwich", spanish: ["bocadillo"] },
  { english: "cheese", spanish: ["queso"] },
   { english: "red wine", spanish: ["vino tinto"] },
   { english: "crab", spanish: ["cangrejo"] },

{ english: "eat", spanish: ["comer"] },
{ english: "drink", spanish: ["beber"] },
{ english: "live", spanish: ["vivir"] },
{ english: "work", spanish: ["trabajar"] },
{ english: "study", spanish: ["estudiar"] },
{ english: "read", spanish: ["leer"] },
{ english: "write", spanish: ["escribir"] },
{ english: "speak", spanish: ["hablar"] },
{ english: "listen", spanish: ["escuchar"] },
{ english: "look", spanish: ["mirar"] },
  { english: "can", spanish: ["poder"] },
    { english: "travel", spanish: ["viajar"] },
      { english: "clean", spanish: ["limpiar"] },
      { english: "paint", spanish: ["pintar"] },

{ english: "and", spanish: ["y"] },
{ english: "but", spanish: ["pero"] },
{ english: "because", spanish: ["porque"] },
{ english: "who", spanish: ["quién"] },
{ english: "what", spanish: ["qué"] },
{ english: "where", spanish: ["dónde"] },
{ english: "when", spanish: ["cuándo"] },
{ english: "how", spanish: ["cómo"] },
{ english: "with", spanish: ["con"] },
{ english: "without", spanish: ["sin"] },

{ english: "time", spanish: ["tiempo"] },
{ english: "day", spanish: ["día"] },
{ english: "night", spanish: ["noche"] },
{ english: "house", spanish: ["casa"] },
{ english: "family", spanish: ["familia"] },
{ english: "friend", spanish: ["amigo"] },
{ english: "problem", spanish: ["problema"] },
{ english: "thing", spanish: ["cosa"] },
{ english: "job", spanish: ["trabajo"] },
{ english: "money", spanish: ["dinero"] },
{ english: "hour", spanish: ["hora"] },

{ english: "man", spanish: ["hombre"] },
{ english: "woman", spanish: ["mujer"] },
{ english: "boy", spanish: ["chico"] },
{ english: "girl", spanish: ["chica"] },
{ english: "teacher", spanish: ["profesor"] },
{ english: "student", spanish: ["estudiante"] },
{ english: "doctor", spanish: ["médico"] },
{ english: "police", spanish: ["policía"] },
{ english: "waiter", spanish: ["camarero"] },

{ english: "cinema", spanish: ["cine"] },
{ english: "shop", spanish: ["tienda"] },
{ english: "airport", spanish: ["aeropuerto"] },
{ english: "library", spanish: ["biblioteca"] },
{ english: "museum", spanish: ["museo"] }
];


let currentWord;
let attempts;
let correctCount = 0;
let errorCount = 0;

const englishWord = document.getElementById("english-word");
const answerInput = document.getElementById("answer-input");
const checkBtn = document.getElementById("check-btn");
const showBtn = document.getElementById("show-btn");
const nextBtn = document.getElementById("next-btn");
const feedback = document.getElementById("feedback");
const correctAnswer = document.getElementById("correct-answer");

const correctCountDisplay = document.getElementById("correct-count");
const errorCountDisplay = document.getElementById("error-count");
const accuracyDisplay = document.getElementById("accuracy");

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ñ/g, "n")
    .trim();
}

function newWord() {
  const randomIndex = Math.floor(Math.random() * vocabulary.length);
  currentWord = vocabulary[randomIndex];
  englishWord.textContent = currentWord.english;
  answerInput.value = "";
  feedback.textContent = "";
  correctAnswer.textContent = "";
  attempts = 3;
  showBtn.disabled = true;
  nextBtn.disabled = true;
  checkBtn.disabled = false;
}

function updateStats() {
  const totalAttempts = correctCount + errorCount;
  const accuracy = totalAttempts === 0 ? 0 : Math.round((correctCount / totalAttempts) * 100);
  correctCountDisplay.textContent = correctCount;
  errorCountDisplay.textContent = errorCount;
  accuracyDisplay.textContent = `${accuracy}%`;
}

function checkAnswer() {
  const userAnswer = normalizeText(answerInput.value);
  const validAnswers = currentWord.spanish.map(normalizeText);

  if (validAnswers.includes(userAnswer)) {
    feedback.textContent = "✅ Correct!";
    correctCount++;
    updateStats();
    checkBtn.disabled = true;
    nextBtn.disabled = false;
  } else {
    attempts--;
    if (attempts > 0) {
      feedback.textContent = `❌ Try again. Attempts left: ${attempts}`;
    } else {
      feedback.textContent = "❌ No attempts left.";
      showBtn.disabled = false;
      checkBtn.disabled = true;
      errorCount++;
      updateStats();
    }
  }
}

function showAnswer() {
  correctAnswer.textContent = `The correct answer was: ${currentWord.spanish[0]}`;
  showBtn.disabled = true;
  nextBtn.disabled = false;
}

checkBtn.addEventListener("click", checkAnswer);
showBtn.addEventListener("click", showAnswer);
nextBtn.addEventListener("click", newWord);

// Initialize game
newWord();
updateStats();
