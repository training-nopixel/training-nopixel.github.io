let timer;
let seconds = 10;
let sequence = generateRandomSequence();
let gameRunning = false;

function resetGame() {
    clearInterval(timer);
    seconds = 10;
    sequence = generateRandomSequence();
    clearInput();
    updateTimer(); // Start the timer after resetting the game
}

function restartGame() {
    gameRunning = true;
    resetGame();
    displayLetters();
    document.getElementById('input-field').focus();
}

function generateRandomSequence() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomSequence = '';
    for (let i = 0; i < 20; i++) {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        randomSequence += alphabet[randomIndex];
    }
    return randomSequence;
}

function displayLetters() {
    const lettersContainer = document.getElementById('letters-container');
    lettersContainer.textContent = sequence;
}

function updateTimer() {
    clearInterval(timer);

    document.getElementById('timer').textContent = seconds;

    if (gameRunning) {
        timer = setInterval(() => {
            seconds--;
            document.getElementById('timer').textContent = seconds;
            if (seconds === 0) {
                endGame(false);
            }
        }, 1000);
    }
}

function endGame(win) {
    clearInterval(timer);
    if (win) {
        alert('Congratulations! You won!');
    } else {
        alert('Game Over! You lost.');
        restartGame(); // Automatically restart the game after a loss
    }
}

function clearInput() {
    document.getElementById('input-field').value = '';
}

function checkInput() {
    if (gameRunning) {
        const userInput = document.getElementById('input-field').value.toUpperCase();
        if (userInput !== sequence.substr(0, userInput.length)) {
            endGame(false);
        } else if (userInput === sequence) {
            endGame(true);
        }
    }
}
