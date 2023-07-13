const audio1= new Audio("ting.mp3");
const audio2=new Audio("gameover.mp3");
const audio3=new Audio("music.mp3");


const clicked=Array.from(document.getElementsByClassName('box'));
const boxText=Array.from(document.getElementsByClassName('text'));
let turn="X"
clicked.forEach((element, index) => {
    element.addEventListener('click', () => {
      if (boxText[index].innerText === "") {
        boxText[index].innerText = turn;
        changeTurn()

      }
      audio1.play();
      const winResult = winning();
      if (winResult) {
        const winner=document.getElementById('win');
       
        winner.innerText="Winner is"+" "+winResult;
        document.getElementById('gif').style.display="flex";
        
        audio2.play();
        audio1.pause();
        audio3.pause();
        disable_input();
      }
      else if(isAllBoxesFilled()){
        const winner=document.getElementById('win');
        winner.innerText="Match Drawn"
        audio1.pause()
        audio3.pause()
        disable_input();
      }
    });
  });
  
const changeTurn=()=>{
if(turn==="X"){
    return turn= "0"
}
else{
    return turn="X"
}

}
const winning=()=>{
    const combinations=[ [0, 1, 2], // Rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonals
    [2, 4, 6]];
    for(comb of combinations){
        const [a,b,c]=comb;
        if (
            boxText[a].innerText !== "" &&
            boxText[a].innerText === boxText[b].innerText &&
            boxText[a].innerText === boxText[c].innerText
          ) {
            return boxText[a].innerText; // Return the winning symbol (X or O)
          }
        
      
         // No win condition found
      }
      return null;
    }
    const isAllBoxesFilled = () => {
      return boxText.every((text) => text.innerText !== "");
    };
    const disable_input=()=>{
      clicked.forEach((element)=>{
        element.removeEventListener('click');
      });
    }
    const background_music=()=>{
      audio3.play();
      const winResult=winning();
      if(winResult||isAllBoxesFilled()){
        audio3.pause();
        return;
      }
      requestAnimationFrame(background_music);
    }
    background_music();
