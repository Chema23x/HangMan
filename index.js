let startCard = document.querySelector("#start-card")
let gameSound = document.querySelector("#gameSound")
let startBtn =document.querySelector("#btn-start");
let panelGame = document.querySelector("#panel");

startBtn.addEventListener("click", (e) => {
    startCard.remove();
    gameSound.play();
    panelGame.classList.remove("panelOff")
    panelGame.classList.add("panelOn")
})

// Creating the letter buttons to play

const letters = [
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
];

let gameBtn = document.querySelector("#game-buttons");


const addButtons = (letters) => {
for (let i = 0; i < letters.length; i++){
    gameBtn.innerHTML += `<button class="btn-letter">${letters[i]}</button>`
  }
}

addButtons(letters);

// falta colocar hidden el juego hasta que se de click y aparezca visible