var words = ["JAVASCRIPT", "HANGMANOUT", "APPLE", "BANANA", "CAT", "DOG", "ELEPHANT", "FISH", "GIRRAFE", "HOUSE",
    "ICE", "KANGARO", "LION", "MONKEY", "NEST", "ORANGE", "PENGUINE", "QUARANTINE", "RAINBOW",
    "TABLE", "UMBRELLA", "VIOLINE", "WHALE", "XYLOPHONE", "YAK", "ZEBRA"];

var selectedWord = "";
var guessedWord = [];
var wrongGuesses = [];
var chances = 6;

// this function is help to set the values for the first time
function startGame(){
    selectedWord = words[Math.floor(Math.random()*words.length)];
    guessedWord = Array(selectedWord.length).fill(" _ ");
    wrongGuesses = [];
    chances = 6;
    updateDisplay();
}

// function for displaying the updated values on the screen
function updateDisplay(){
    var gameover = false;
    //  first we have to update the display for the selected word
    document.getElementById("word").innerText = guessedWord.join(" ");

    //  then we have to update the wrongwords which are selected by the user
    document.getElementById("wrongcharacters").innerText = "Wrong-Characters : " + wrongGuesses.join(", ");

    //  then we have to update the remaining attempts/ chances according to the wronguesses
    document.getElementById("remainingchances").innerText = "Remaining Attempts : " + chances;

    if(guessedWord.join("") === selectedWord){
        document.getElementById("messagedisp").innerText = "🎉 You Win The Game...";
        document.getElementById("messagedisp").style.color = "green";
        document.getElementById("messagedisp").style.font = "bold";
        document.getElementById("messagedisp").style.fontSize = "20px";
        gameover = true;
    }else if(chances === 0){
        document.getElementById("messagedisp").innerText = "💔 You Lose The Game The Word Was "+selectedWord;
        document.getElementById("messagedisp").style.color = "red";
        document.getElementById("messagedisp").style.font = "bold";
        document.getElementById("messagedisp").style.fontSize = "20px";
        gameover = true;
    }else{
        document.getElementById("messagedisp").innerText = "";
    }
}

// function for restarting the game
function restartGame(){
    gameover = false;
    startGame();  // for staring the game
    resetButtons(); // for enabling all the buttons back
}

function handleGuess(letter){
    if(gameover){
        return;
    }
    // first we wanrt to check that the character which is already in wrongword then we does not select it
    if(wrongGuesses.includes(letter) || guessedWord.includes(letter)){
        document.getElementById("messagedisp").innerText = "You Already Guessed That Letter!..";
        return;
    }

    // now , we check for if that letter is present in the selected word then we have to place it in the guessed word
    if(selectedWord.includes(letter)){
        for(let i =0 ; i<selectedWord.length;i++){
            if(selectedWord[i] === letter){
                guessedWord[i] = letter;
            }
        }
    }else{
        wrongGuesses.push(letter);
        chances--;
    }
    updateDisplay();
}

function resetButtons(){
    const buttons = document.querySelectorAll(".letters");
    buttons.forEach(button => {
        button.disabled = false;
    });
}

function buttonsClick(){
    const buttons = document.querySelectorAll(".letters");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            handleGuess(button.innerText);
            button.disabled = true;
        });
    });
}

startGame();
buttonsClick();
