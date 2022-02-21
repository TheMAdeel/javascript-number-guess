const easy = document.querySelector("#easy"),
      hard = document.querySelector("#hard"),
      restart = document.querySelector("#restart"),
      gameScreen = document.querySelector(".gameScreen"),
      startScreen = document.querySelector(".startScreen"),
      input = document.querySelector("#input"),
      displayAttempts = document.querySelector("#attempts"),
      DisplayPreviousNumbers = document.querySelector("#previous_numbers"),
      message = document.querySelector("#message"),
      audio = new Audio("./play.wav");
let   totalAttempts,
      computerGuessNumber = Math.floor(Math.random() * 100),
      remainingAttempts,
      previousNumbers = [];

// Toggle Screens
const toggleScreens = (btn) => {
   if (btn === "restart" || typeof(btn) === "undefined") {
      startScreen.classList.remove("hide");
      gameScreen.classList.add("hide");
   } else {
      startScreen.classList.add("hide");
      gameScreen.classList.remove("hide");
   }
}
toggleScreens();

const gameOver = (reason) => {
   if (reason === "loose") {
      message.textContent = "OPPS You lose the game 😥";
   }
   restart.style.display = "inline-block";
   input.type = "text";
   input.style.fontSize = "14px";
   input.style.fontWeight = "400";
   input.value = "press RESTART to play again";
   input.disabled = "true";
   restart.style.display = "inline-block";
}

// Change States when user changes number
const changeStates = (remainingAttempts, previousNumbers) => {
   if (previousNumbers.slice(-1) < computerGuessNumber) {
      message.textContent = "Your Guess is Low 😌";
   }else if (previousNumbers.slice(-1) > computerGuessNumber) {
      message.textContent = "Your Guess is High 😮";
   } else if(previousNumbers.slice(-1) == computerGuessNumber){
      message.textContent = `Hurray! You won this game in ${totalAttempts - remainingAttempts} attempts 🥳`;
      gameOver("won");
   }
   displayAttempts.textContent = remainingAttempts;
   DisplayPreviousNumbers.textContent = previousNumbers;
   input.value = "";
   console.log(remainingAttempts);
}

// When Game Starts OR When user clicks on easy/hard button
const startGame = (mode) => {
   // Reset Previous records
   restart.style.display = "none";
   input.disabled = false;
   message.textContent = "Enter Your Guess";
   previousNumbers = [];
   computerGuessNumber = Math.floor(Math.random() * 100);

   // Check Mode
   if (mode === "easy") {
      changeStates(10, ['-']);
      totalAttempts = 10;
      remainingAttempts = 10;
      input.addEventListener("change", () => {
         remainingAttempts -= 1;
         previousNumbers.push(input.value);
         if(remainingAttempts >= 0 ) changeStates(remainingAttempts, previousNumbers);
         if(remainingAttempts <= 0 ) gameOver("loose");
      })
   } else if (mode === "hard") {
      changeStates(5, ['-']);
      totalAttempts = 5;
      remainingAttempts = 5;
      input.addEventListener("change", () => {
         remainingAttempts -= 1;
         previousNumbers.push(input.value);
         if (remainingAttempts >= 0) changeStates(remainingAttempts, previousNumbers);
         if(remainingAttempts <= 0 ) gameOver("loose");
      })
   } else {
      return;
   }
}

easy.addEventListener("click", () => {
   audio.play();
   toggleScreens("easy");
   startGame("easy");
});

hard.addEventListener("click", () => {
   audio.play();
   toggleScreens("hard");
   startGame("hard");
})

restart.addEventListener("click", () => {
   audio.play();
   toggleScreens("restart");
})
