const border=document.querySelector('#border');
const blockHeight=25
const blockWidth=25
const startButton=document.querySelector('.start-btn');
const model=document.querySelector('.model');
const startGameModel=document.querySelector('.start-game');
const gameOverModel=document.querySelector('.Game-over');
const restartButton=document.querySelector(".Restart-btn");
const highScoreElement = document.querySelector('#highScore-value');
const scoreElement = document.querySelector('#score-value');
const timeElement = document.querySelector('#time-value');
const hamBurgerIcon = document.getElementById("icon");
const model1 = document.getElementById("model1");

const resumeBtn = document.querySelector(".pause-btn");
const quitBtn = document.querySelector(".quit-btn");


let highScore = localStorage.getItem("highScore") || 0;
let score = 0;
let time = `00-00`;

highScoreElement.innerText=highScore;


const cols= Math.floor(border.clientWidth / blockWidth);
const rows = Math.floor(border.clientHeight / blockHeight);
const blocks=[];
let snake=[{x:1,y:3}];
let intervalId=null;

let timeIntervalId = null;

let food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)};

let direction='down';

for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
        const block = document.createElement('div');
        block.classList.add("block");
        border.appendChild(block);
        // block.innerText= `${i}-${j}`
       blocks[ `${i}-${j}` ] = block;
    }    
}

function render(){
    let head=null;

   blocks[`${food.x}-${food.y}`].classList.add("food")

   if(direction==='left'){
    head={x:snake[0].x,y:snake[0].y-1}
   }  else if(direction==='right'){
    head={x:snake[0].x,y:snake[0].y+1}
   }else if(direction==='down'){
    head={x:snake[0].x+1,y:snake[0].y}
   }else if(direction==='up'){
    head={x:snake[0].x-1,y:snake[0].y}
   }

   if(head.x<0 || head.x >=rows || head.y<0 || head.y >=cols){
   
  clearInterval(intervalId);
   model1.style.display ="none";

  model.style.display="flex";
  startGameModel.style.display = "none";
  gameOverModel.style.display="flex";
  return;
   }

   if(head.x==food.x && head.y==food.y){
   
   blocks[`${food.x}-${food.y}`].classList.remove("food")
   food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)};
   blocks[`${food.x}-${food.y}`].classList.add("food")
   snake.unshift(head);

   score += 10
   scoreElement.innerText=score;
   if(score > highScore){
    highScore = score;
    localStorage.setItem("highScore",highScore.toString());
   }
   }

snake.forEach(segment => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill")
});
   snake.unshift(head);
   snake.pop();
snake.forEach(segment => {
    blocks[`${segment.x}-${segment.y}`].classList.add("fill")
});

}
startButton.addEventListener("click",() =>{
    model.style.display="none";
   
    intervalId =  setInterval(()=> render(), 350)
    timeIntervalId = setInterval(() =>{
        let [min, sec] = time.split("-").map(Number);

        if(sec == 59){
            min +=1;
            sec = 0;
        }else{
            sec += 1
        }
        time = `${min}-${sec}`
        timeElement.innerText = time;
    }, 1000)
})

restartButton.addEventListener("click",restartGame)


function restartGame(){
     
  blocks[`${food.x}-${food.y}`].classList.remove("food")
   snake.forEach(segment => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill")
})

clearInterval(intervalId);

 score = 0;
time=`00-00`;

scoreElement.innerText=score;
timeElement.innerText=time;
 scoreElement.innerText=score;

highScoreElement.innerText=highScore;
    model.style.display="none";
   
    direction='down';
     snake=[{x:1,y:3}];
     food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)};
      model.style.display="none";
    intervalId =  setInterval(()=> render(), 350)
}



hamBurgerIcon.addEventListener("click", () => {
    model1.style.display = "flex";   // show div
        
});

resumeBtn.addEventListener("click",()=>{
 clearInterval(intervalId);
 clearInterval(timeIntervalId) 
})


resumeBtn.addEventListener("dblclick",()=>{
        intervalId =  setInterval(()=> render(), 350)
        model1.style.display ="none";
        timeIntervalId = setInterval(() =>{
        let [min, sec] = time.split("-").map(Number);

        if(sec == 59){
            min +=1;
            sec = 0;
        }else{
            sec += 1
        }
        time = `${min}-${sec}`
        timeElement.innerText = time;
    }, 1000)
});

quitBtn.addEventListener("click",()=>{
    model1.style.display="none";
    model.style.display="flex";
    clearInterval(intervalId);
});



addEventListener("keydown",(event)=>{
    if(event.key==='ArrowLeft'){
        direction='left';
    }else if(event.key==='ArrowRight'){
        direction='right';
    }else if(event.key==='ArrowDown'){
        direction='down';
    }else if(event.key==='ArrowUp'){
        direction='up';
    }
})