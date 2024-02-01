const cell=document.querySelectorAll(".cell");
const whosTurn=document.querySelector("#whosTurn");
const restartBtn=document.querySelector("#restartBtn");
const winCondition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let options=["","", "", "", "","" ,"", "", "" ]
let currentPlayer="X";
let running=false;
initializeGame();
function initializeGame(){
running=true;
cell.forEach(cell=>cell.addEventListener("click", cellClick));
restartBtn.addEventListener("click",RestartGame);
whosTurn.textContent=`${currentPlayer} 'turn`;

}



function cellClick(){
const cellIndex=this.getAttribute("cellIndex");
if(options[cellIndex]!==""||!running){
    return;
}
UpdateCell(this,cellIndex);

checkWinner();


}
function UpdateCell(cell,index){
options[index] = currentPlayer;
cell.textContent = currentPlayer;
}



function changePlayer(){
currentPlayer=(currentPlayer=="X") ? "0":"X";
whosTurn.textContent = `${currentPlayer}'s Turn`;

}



function checkWinner(){
    let roundwon=false;
    for(let i=0;i<winCondition.length;i++){
    const condition=winCondition[i];
    const cellA=options[condition[0]];
    const cellB=options[condition[1]];
    const cellC=options[condition[2]];


    if(cellA==""||cellB==""||   cellC==""){
        continue;
     }
     if(cellA==cellB&&cellB==cellC){
        roundwon=true;
        break;
     }
     }
    if(roundwon){
        whosTurn.textContent=`${currentPlayer} kazandı`;
        running=false;
     }
    else if(!options.includes("")){
        whosTurn.textContent="Berabere"

     }

     else{
       changePlayer()
     }

}

function RestartGame() {
    currentPlayer="X";
    options=["","", "", "", "","" ,"", "", "" ]
    cell.forEach(cell=>cell.textContent="");
    running=true;
    whosTurn.textContent=`${currentPlayer} 'turn`;

}