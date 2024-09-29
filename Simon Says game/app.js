let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let max = 0;
let max2 = 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

document.addEventListener("keypress", function() {
    if (started == false) {
        console.log("Game is started")
        started = true;
    }

    levelUp();
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
};

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
};

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randbtn);
};

function checkAns(idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over ! Your score was <b>${level}</b> <br> Press any key to start`;

        document.querySelector("body").style.backgroundColor = "red";
        max2 = level;
        setTimeout( function() {
            document.querySelector("body").style.backgroundColor = "white";
        });
        reset();
        HighScore();
    }
};

function HighScore() {
    if(max == max2) {
        h3.innerText = `Your High Score is ${max2}`;
    } else if (max > max2) {
        h3.innerText = `Your High Score is ${max}`;
    } else {
        max = max2; 
        alert(`Congrats you made a new High Score ! Your High Score is ${max}`);
        h3.innerText = `Your High Score is ${max}`
    }
};

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
};

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);    
};

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}