let starting = true;
let ending = false;
let milliseconds = 0;
let solveNumber = 1;
let scramble = "";
const timer = document.querySelector(".timer");
const scrambleText = document.querySelector(".scramble");
const timerWrapper = document.querySelector(".times-wrapper");
const timesTable = document.querySelector(".times-table")

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


// when pressing down stop, and the second time up start again
document.body.onkeyup = function(e){
    if(e.code == "Space" ){
        if(starting ){ 
            startTimer();
            starting = false;
        } else {
            starting = true;
        }
    }
}

document.body.onkeydown = function(e){ 
    if(e.code == "Space" && !e.repeat && !starting) stopTimer(); 
}
    
function startTimer(){
    timerClock = setInterval( changeTimer, 1);
    offset = Date.now();
}
function changeTimer(){
    milliseconds += getOffset();
    timer.innerHTML = getTimeString();
}
function stopTimer(){
    clearInterval(timerClock);
    addTime();
    generateScramble();                
}
function getOffset(){
    now = Date.now();
    delta = now - offset;
    offset = now;
    return delta;
}

function addTime(){
    const fragment = new DocumentFragment();
    const row = timesTable.insertRow(1);
    row.insertCell(0).textContent = solveNumber++;
    row.insertCell(1).textContent = milliseconds / 1000;
    row.insertCell(2).innerHTML = "<button>+2</button>";
    row.insertCell(3).innerHTMl = "<button>X</button";



}

//converts all times into 000:00.000 
//but if no minutes, then 0.000
function getTimeString(){
    mins = Math.floor(milliseconds / 60000);
    secs = Math.floor(milliseconds / 1000) % 60;
    mils = milliseconds % 1000
    return ((mins != 0) ? mins + ":" + ("0" + secs).slice(-2) : secs) + "." + mils;
}

function generateScramble(){
    let previous = "";
    let letter = "";
    let tempScramble = "";
    for(i = 0; i < 20; i++){
        while(previous == letter || (scrambleDict[letter[0]]).includes(previous)){
            ranNum = Math.floor(Math.random() * scrambleList.length);
            letter = scrambleList[ranNum];
        }
        tempScramble += (letter) + "  ";
        previous = letter;
    }
    scramble = tempScramble;
    scrambleText.textContent = scramble;
}

generateScramble();

