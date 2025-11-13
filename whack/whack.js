const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('startBtn');

let lastHole;
let timeUp = false;
let score = 0;
function randomTime(min, max){
    return Math.round(Math.random()*(max - min) +min);
}

function randomHole(holes) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];
    if(hole === lastHole) return randomHole(holes);
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(600, 1600);
    const hole = randomHole(holes);
    hole.classList.add('active');
    
    setTimeout(() => {
        hole.classList.remove('active');
        if(!timeUp) peep();
    }, time);
}

function startGame() {
    score = 0;
    scoreDisplay.textContent = score;
    timeUp = false;
    peep();
    setTimeout(() => (timeUp = true),15000);
}

function bonk(e) {
    if(!e.isTrusted) return;

    if(this.classList.contains('active')) {
        score++;
        this.classList.remove('active');
        scoreDisplay.textContent = score;
    }
}

holes.forEach(hole => {
    hole.addEventListener('click', bonk);

    const mole = document.createElement('div');
    mole.classList.add('mole');
    hole.appendChild(mole);
});

startBtn.addEventListener('click', startGame);