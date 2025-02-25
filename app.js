let gameSeq= [];
let userSeq =[];
let btns =["yellow" , "red" ,"purple" , "green"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");
highScore = localStorage.getItem("highScore") || 0; 
document.addEventListener("keypress" ,function(){
    if(started == false){
        console.log("Game is Started!");
        started = true;
        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash")
    setTimeout(function(){
        btn.classList.remove("flash");
    } ,250)
}

function usrflash(btn){
    btn.classList.add("usrflash")
    setTimeout(function(){
        btn.classList.remove("usrflash");
    } ,250)
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    //random btn choose

    let randIdx = Math.floor(Math.random() *3);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    // console.log(randColor);
    // console.log(randIdx);
    // console.log(randbtn);
    gameSeq.push(randColor);
    console.log(gameSeq)
   gameFlash(randbtn);
}

function checkAns(index){
    // console.log("curr level : ", level);
    // let index = level -1;
    if(userSeq[index] == gameSeq[index]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp , 1000);
        }
        console.log("same Value");
    }
    else{
        if (level > highScore) {
            highScore = level;
            localStorage.setItem("highScore", highScore); // Save high score
        }
        h2.innerHTML = `Game Over! </br> Your score was <b>${level}</b> </br> High Score: <b>${highScore}</b> </br> Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        } ,150)
        reset();
    }
}

function btnPress(){
    // console.log(this);
    let btn = this;
    usrflash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}
let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click" , btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

