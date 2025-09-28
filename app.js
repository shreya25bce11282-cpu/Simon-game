// Arrays to store the sequences
let gameSeq=[];
let userSeq=[];
let highScore=0;

// Available button colors
let btns=["red","blue","green","yellow"];

// Game status
let started=false;
let level=0;

// Select the h2 element to show level/game over
let h2=document.querySelector("h2");

// Start game on keypress
document.addEventListener("keypress",function()
{
 if(started==false)
 {
    console.log("Game is Started");
    started=true;

    levelUp();
 }
});

// Flash effect for game buttons
function gameFlash(btn)
{
    btn.classList.add("gameflash");
    setTimeout(function() {
        btn.classList.remove("gameflash");},250);
    }

    // Flash effect for user clicks
    function userFlash(btn)
{
    btn.classList.add("userFlash");
    setTimeout(function() {
        btn.classList.remove("userFlash");},250);
    }

// Advance level and add new color to sequence
function levelUp()
{
    userSeq=[]; // Reset user sequence
    level++;
    if(highScore<level)
        highScore=level;
    h2.innerText=`Level ${level}`;

    // Pick random color
    let randIdx=Math.floor(Math.random()*4);
    let randColor=btns[randIdx];
    let randBtn= document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

// Check if user clicked correct sequence
function checkAns(idx)
{
    

    if(userSeq[idx]===gameSeq[idx])
    {
        if(userSeq.length==gameSeq.length)
        {
            setTimeout(levelUp,1000);
        }
    }
        else
            {
            h2.innerHTML=`Game Over! Your score was <b>${level}</b><br>Highest score is:<b>${highScore}</b><br> Press any key to start`;
            document.querySelector("body").style.backgroundColor="red";
            setTimeout(function(){
              document.querySelector("body").style.backgroundColor="white";   },150);
            reset();
        }
    }


    // Handle user button click
function btnPress()
{
    let btn=this;
    userFlash(btn);

    userColor= btn.getAttribute("id");
    userSeq.push(userColor);
   
    checkAns(userSeq.length-1);
}

// Add click listeners to all buttons
let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns)
{
    btn.addEventListener("click",btnPress)
}

// Reset game variables
function reset()
{
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}