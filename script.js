let isTimerGoing = false;
let milliseconds = 0;
const timer = document.querySelector(".timer");
const scramble = document.querySelector(".scramble");


const scrambleDict = {
    "L": ["L","L'","L2"],
    "R": ["R","R'","R2"],
    "U": ["U","U'","U2"],
    "D": ["D","D'","D2"],
    "B": ["B","B'","B2"],
    "F": ["F","F'","F2"],
}

const scrambleList = ["F","F'","F2","B","B'","B2","U","U'","U2","D","D'","D2","R","R'","R2","L","L'","L2"];

const button = document.querySelector(".timer-button");

document.body.onkeyup = function(e) {
    if(e.key == 32 || e.code == "Space"){
        !isTimerGoing ? startTimer() : stopTimer();
        isTimerGoing = !isTimerGoing;
    }
}

function startTimer(){
    timerClock = setInterval( changeTimer, 1);
    offset = Date.now();
}
function changeTimer(){
    milliseconds += getOffset();
    timer.innerHTML = new Date(milliseconds).toISOString().slice(11,-1);
}
function stopTimer(){
    clearInterval(timerClock);
    milliseconds = 0;
    newScramble();                
}
function getOffset(){
    now = Date.now();
    delta = now - offset;
    offset = now;
    return delta;
}

function generateScramble(length){
    let previous = "";
    let letter = "";
    let tempScramble = [];
    for(i = 0; i < length; i++){
        while(previous == letter || (scrambleDict[letter[0]]).includes(previous)){
            ranNum = Math.floor(Math.random() * scrambleList.length);
            letter = scrambleList[ranNum];
        }
        tempScramble.push(letter);
        previous = letter;
    }
    return tempScramble;
}

function newScramble(){
    scramble.innerHTML = generateScramble(20);
}

newScramble();
