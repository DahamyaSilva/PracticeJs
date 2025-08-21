let playerScore = 0;
let computerScore = 0;

const choices = ['rock', 'paper', 'scissors'];
const emojis = {
    rock: '🪨',
    paper: '📄',
    scissors: '✂️'
};

function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'tie';
    }
    
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'win';
    } else {
        return 'lose';
    }
}

function updateDisplay(playerChoice, computerChoice, result) {
    document.getElementById('playerChoice').textContent = emojis[playerChoice];
    document.getElementById('computerChoice').textContent = emojis[computerChoice];
    
    const resultElement = document.getElementById('result');
    
    if (result === 'win') {
        resultElement.textContent = 'You Win! 🎉';
        resultElement.className = 'result win';
    } else if (result === 'lose') {
        resultElement.textContent = 'You Lose! 😔';
        resultElement.className = 'result lose';
    } else {
        resultElement.textContent = "It's a Tie! 🤝";
        resultElement.className = 'result tie';
    }
}

function updateScore(result) {
    if (result === 'win') {
        playerScore++;
        document.getElementById('playerScore').textContent = playerScore;
    } else if (result === 'lose') {
        computerScore++;
        document.getElementById('computerScore').textContent = computerScore;
    }
}

function playGame(playerChoice) {
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);
    
    updateDisplay(playerChoice, computerChoice, result);
    updateScore(result);
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    document.getElementById('playerScore').textContent = '0';
    document.getElementById('computerScore').textContent = '0';
    document.getElementById('playerChoice').textContent = '?';
    document.getElementById('computerChoice').textContent = '?';
    document.getElementById('result').className = 'result';
}
