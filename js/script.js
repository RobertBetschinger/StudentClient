//const socket = io("https://peer-instructions-server.herokuapp.com");
const socket = io('http://localhost:5000')
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

//import io from 'socket.io-client';
console.log(socket);

const name = prompt("What is your name?");
//const name = "Lecteur"
appendMessage("You: ", "joined", true);
socket.emit("New User", name, true);

//Socket Part
socket.on("chat-message", (data) => {
  appendMessage(`${data.name}: `, `${data.message}`, false);
});

socket.on("Person joined", (name) => {
  appendMessage(`${name}: `, `Connected`, false);
});

socket.on("Person Disconnected", (name) => {
  appendMessage(`${name}: `, `Disconnected`, false);
});

socket.on("NewQuestion", (question) => {
  showNewQuestion(true);
  changeQuestion(
    question.ques,
    question.antwort1,
    question.antwort2,
    question.antwort3,
    question.antwort4
  );
  showStatistics(false);
});

socket.on("showStatistics", (question,data) => {
  console.log("Statistics arrived");
  adddata(data)
  changeLabels(question)
  showStatistics(true);
});


socket.on("newPhase", (message) => {
  console.log("New Phase");
  if (message == "Lecteuring") {
    Fragenblock.style.visibility = "hidden";
  }
  changePhase(message);
});

//Chat
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage("You: ", message, true);
  socket.emit("send-chat-message", message);
  messageInput.value = "";
  $("#message-input").data("emojioneArea").setText("");
});

function appendMessage(name, message, position) {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = name;
  var html = [
    '<p class="text-ChatMessage"><span class="text-chatName">' +
      name +
      "</span>" +
      message +
      "</p>",
  ].join("\n");
  messageElement.innerHTML = html;
  if (position) {
    messageElement.classList.add("OuterMessageLeft");
  } else {
    messageElement.classList.add("OuterMessageRight");
  }

  messageContainer.append(messageElement);
}

//Functions Part
const btnAnswerQuestion = document.getElementById("btnSendAnswer");
const PlaceholderFrage = document.getElementById("PlaceholderFrage");
const PlaceholderAntwort1 = document.getElementById("PlaceholderAntwort1");
const PlaceholderAntwort2 = document.getElementById("PlaceholderAntwort2");
const PlaceholderAntwort3 = document.getElementById("PlaceholderAntwort3");
const PlaceholderAntwort4 = document.getElementById("PlaceholderAntwort4");
const ÜberschriftFrage = document.getElementById("ÜberschriftFrage");
const Fragenblock = document.getElementById("Fragenblock");
const Frageausgewählt = document.getElementById("Frageausgewählt");
const CurrentPhase = document.getElementById("CurrentPhase");
//Phase Part

function changePhase(message) {
  CurrentPhase.innerHTML = message;
}

//Question Part
function changeQuestion(questiion, antwort1, antwort2, antwort3, antwort4) {
  PlaceholderFrage.innerHTML = questiion;
  PlaceholderAntwort1.innerHTML = antwort1;
  PlaceholderAntwort2.innerHTML = antwort2;
  PlaceholderAntwort3.innerHTML = antwort3;
  PlaceholderAntwort4.innerHTML = antwort4;
}

function showNewQuestion(show) {
  if (show) {
    ÜberschriftFrage.innerHTML = "Pls answer the question";
    Fragenblock.style.visibility = "visible";
    btnAnswerQuestion.disabled = false;
    Frageausgewählt.innerHTML = "";
    unmarkAllAnswers();
  }
}

function unmarkAllAnswers() {
  PlaceholderAntwort4.style.backgroundColor = "";
  PlaceholderAntwort3.style.backgroundColor = "";
  PlaceholderAntwort2.style.backgroundColor = "";
  PlaceholderAntwort1.style.backgroundColor = "";
}

function markSelectedAnswer(radioValueSelected) {
  ÜberschriftFrage.innerHTML = "Soon you can answer an other question";
  Frageausgewählt.innerHTML =
    "You had just selected the blue marked answer";
  if (radioValueSelected == 1) {
    PlaceholderAntwort1.style.backgroundColor = "blue";
  }
  if (radioValueSelected == 2) {
    PlaceholderAntwort2.style.backgroundColor = "blue";
  }
  if (radioValueSelected == 3) {
    PlaceholderAntwort3.style.backgroundColor = "blue";
  }
  if (radioValueSelected == 4) {
    PlaceholderAntwort4.style.backgroundColor = "blue";
  }
  btnAnswerQuestion.disabled = true;
}

btnAnswerQuestion.addEventListener("click", function () {
  var radioValue = $("input[name='Antwortmöglichkeiten']:checked").val();
  if (radioValue == undefined) {
    window.alert("Please select one answer option!");
  } else {
    console.log(radioValue);
    socket.emit("question-answered", radioValue);
    markSelectedAnswer(radioValue);
  }
});

//Chat Part

Fragenblock.style.visibility = "hidden";
