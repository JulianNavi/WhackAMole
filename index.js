const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const controls = document.getElementById('start');
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
};

function randomHole(holes) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
};

function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    //console.log(time, hole);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp)
            peep();
    }, time)
};

const startGame = () => {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => true, 10000)
};

function bonk() {
    if (!event.isTrusted) {
        return;
    }
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));

controls.addEventListener('click', event => {
    console.log(event);
    switch (event.target.id) {
        case 'start':
            startGame();
            break;
        default:
            break;
    }
})