const startScreen = document.getElementById('startScreen');
const startButton = document.getElementById('startButton');
const gameContainer = document.getElementById('gameContainer');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const endScreen = document.getElementById('endScreen');
const finalScore = document.getElementById('finalScore');
const restartButton = document.getElementById('restartButton');

let score = 0;
let lives = 3;
let gameInterval;
let circleTimeout;
let spawnInterval = 2000;
let isGameOver = false;

startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    gameContainer.classList.remove('hidden');
    startGame();
});

function startGame() {
    score = 0;
    lives = 3;
    spawnInterval = 2000;
    isGameOver = false;
    scoreDisplay.textContent = `Pontos: ${score}`;
    livesDisplay.textContent = `Vidas: ${lives}`;

    spawnCircles();
}

function spawnCircles() {
    if (isGameOver) return;

    const circle = document.createElement('div');
    circle.classList.add('circle');

    const size = Math.random() * 40 + 20;
    const topPosition = Math.random() * (gameContainer.clientHeight - size);
    const leftPosition = Math.random() * (gameContainer.clientWidth - size);

    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${topPosition}px`;
    circle.style.left = `${leftPosition}px`;
    circle.style.backgroundColor = getRandomColor();

    gameContainer.appendChild(circle);

    circleTimeout = setTimeout(() => {
        if (gameContainer.contains(circle)) {
            circle.remove();
            loseLife();
        }
    }, spawnInterval);

    circle.addEventListener('click', () => {
        clearTimeout(circleTimeout);
        circle.classList.add('clicked');
        setTimeout(() => circle.remove(), 200);
        increaseScore();
    });

    gameInterval = setTimeout(spawnCircles, spawnInterval);
}

function increaseScore() {
    score += 1;
    scoreDisplay.textContent = `Pontos: ${score}`;

    if (score % 5 === 0 && spawnInterval > 800) {
        spawnInterval -= 200;
    }
}

function loseLife() {
    lives -= 1;
    livesDisplay.textContent = `Vidas: ${lives}`;

    if (lives === 0) {
        endGame();
    }
}

function endGame() {
    isGameOver = true;
    clearTimeout(gameInterval);
    clearTimeout(circleTimeout);
    
    finalScore.textContent = score;

    gameContainer.classList.add('hidden');
    endScreen.classList.remove('hidden');
}

restartButton.addEventListener('click', () => location.reload());

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
