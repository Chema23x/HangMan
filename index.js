
//Panel de inicio de juego
let startCard = document.querySelector("#start-card")
let gameSound = document.querySelector("#gameSound")
let startBtn =document.querySelector("#btn-start");
let panelGame = document.querySelector("#panel");

startBtn.addEventListener("click", (e) => {
    startCard.remove();
    panelGame.classList.remove("panelOff")
    panelGame.classList.add("panelOn")
    gameSound.play();
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

// HangMan Drawing

const drawingStages = [
    [
        "+----+",
        "|",   
        "|",
        "|",
        "|",
        "==========="
    ],
    [
        "+----+",
        "|    |",  
        "|",
        "|",
        "|",
        "==========="
    ],
    [
        "+----+",
        "|    |",  
        "|    o",
        "|",
        "|",
        "==========="
    ],
    [
        "+----+",
        "|    |",  
        "|    o",
        "|    |",
        "|",
        "==========="
    ],
    [
        "+----+",
        "|    |",  
        "|    o",
        "|   /|",
        "|",
        "==========="
    ],
    [
        "+----+",
        "|    |",  
        "|    o",
        "|   /|\\", 
        "|",
        "==========="
    ],
    [
        "+----+",
        "|    |",  
        "|    o",
        "|   /|\\", 
        "|   /",
        "==========="
    ],
    [
        "+----+",
        "|    |",  
        "|    o",
        "|   /|\\", 
        "|   / \\",
        "==========="
    ]
];

// Inicializa el contador de errores
let errorCount = 0;

let hangManArea = document.querySelector("#hangman-container");
hangManArea.innerHTML = `<pre>${drawingStages[0].join("\n")}</pre>`;

// Funcion a los botones

const word = ["l", "e", "t", "t", "u", "c", "e"];

function handleButtonClick(event) {
    const clickedLetter = event.target.textContent.toLowerCase();
    const clickedButton = event.target;

    if (word.includes(clickedLetter)) {
        console.log(`Great! ${clickedLetter} is in the word.`);

        // Encuentra todas las posiciones donde aparece la letra en la palabra
        const positions = word.reduce((acc, letter, index) => {
            if (letter === clickedLetter) {
                acc.push(index + 1); // Suma 1 porque las posiciones de las letras generalmente comienzan en 1
            }
            return acc;
        }, []);

        // Coloca la letra en las casillas correspondientes
        positions.forEach(position => {
            document.querySelector(`#letter${position}`).innerText = clickedLetter;
        });

        // Agrega la clase solo al botón clicado
        clickedButton.classList.add("btn-letter-true");

        // Verifica si todas las casillas están llenas para lanzar la alerta de victoria
        if (checkWordComplete()) {
            setTimeout(() => {
        document.querySelector(".winAlert").style.display = "flex";
        document.querySelector("#panel").classList.add("endGame");
        gameSound.pause();
    }, 1000);
}

    } else {
        console.log(`Too bad! ${clickedLetter} is not in the word.`);

        // Agrega la clase al botón incorrecto
        clickedButton.classList.add("btn-letter-false");
        
        // Agrega la clase de animación de sacudida (shake)
        document.querySelector("#hangman-container").classList.add("shake");
        
        // Para ajustar el tiempo de espera antes de quitar la clase shake
        setTimeout(() => {
            document.querySelector("#hangman-container").classList.remove("shake");
        }, 500);

        // Aumenta el contador de errores
        errorCount++;
        
        showHangMan();
    }
}

// lOSE GAME
     
function showHangMan() {
    let hangManArea = document.querySelector("#hangman-container");
    
    // Verifica si hay etapas adicionales del dibujo disponibles
    if (errorCount < drawingStages.length) {
        // Utiliza el elemento pre para preservar los saltos de línea
        hangManArea.innerHTML = `<pre>${drawingStages[errorCount].join("\n")}</pre>`;
    } else {
        hangManArea.textContent = "¡GAME OVER!";
        document.querySelector(".loseAlert").style.display = "flex";
        document.querySelector("#panel").classList.add("endGame");
        gameSound.pause();
    }
}

// Click en botones

function checkWordComplete() {
    // Verifica si todas las letras de la palabra están en las casillas
    return word.every((letter, index) => {
        const letterElement = document.querySelector(`#letter${index + 1}`);
        return letterElement && letterElement.innerText.toLowerCase() === letter;
    });
}

const letterButtons = document.querySelectorAll(".btn-letter");

letterButtons.forEach(button => {
    button.addEventListener("click", handleButtonClick);
});

// Game over (Re-start)

let reStartBtn = document.querySelector("#btn-restart");

reStartBtn.addEventListener("click", (e) => {
    // Reset game state

    // Remove the word completion message
    document.querySelector(".loseAlert").style.display = "none";

    // Remove the losing game class
    document.querySelector("#panel").classList.remove("endGame");

    // Remove the drawn hangman
    let hangManArea = document.querySelector("#hangman-container");
    hangManArea.innerHTML = `<pre>${drawingStages[0].join("\n")}</pre>`;

    // Reset error count
    errorCount = 0;

    // Reset the word array
    const word = ["l", "e", "t", "t", "u", "c", "e"];

    // Reset letter buttons and their classes
    letterButtons.forEach((button, index) => {
        const letterElement = document.querySelector(`#letter${index + 1}`);
        if (letterElement) {
            letterElement.innerText = "";
        }
        button.classList.remove("btn-letter-true", "btn-letter-false");
    });

    gameSound.currentTime = 0;
    gameSound.play();
});

// Win Game (Re-start)


let newGameBtn = document.querySelector("#winBtn-restart");

newGameBtn.addEventListener("click", (e) => {
    // Reset game state

    // Remove the word completion message
    document.querySelector(".winAlert").style.display = "none";

    // Remove the losing game class
    document.querySelector("#panel").classList.remove("endGame");

    // Remove the drawn hangman
    let hangManArea = document.querySelector("#hangman-container");
    hangManArea.innerHTML = `<pre>${drawingStages[0].join("\n")}</pre>`;

    // Reset error count
    errorCount = 0;

    // Reset the word array
    const word = ["l", "e", "t", "t", "u", "c", "e"];

    // Reset letter buttons and their classes
    letterButtons.forEach((button, index) => {
        const letterElement = document.querySelector(`#letter${index + 1}`);
        if (letterElement) {
            letterElement.innerText = "";
        }
        button.classList.remove("btn-letter-true", "btn-letter-false");
    });

    gameSound.currentTime = 0;
    gameSound.play();
});