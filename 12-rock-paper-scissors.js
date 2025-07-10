let score = JSON.parse(localStorage.getItem('score')) || 
     {wins:0,
      loses: 0,
      ties: 0
     };
     
     updateScoreElement();

/*
  if (!score) {
    score = {
      wins:0,
      loses: 0,
      ties: 0
    };
  }
  */

    let isAutoPLaying = false;
    let intervalId;
    
    //const autoPlay = () =>  {

    //};
    
    function autoPlay()
    {
      if(!isAutoPLaying)
       {
      intervalId = setInterval(() =>  {
      const playerMove = pickmove();
      playGame(playerMove);  
      }, 1000);
      isAutoPLaying = true;
      
    } else 
    {
      clearInterval(intervalId);
      isAutoPLaying = false;
    }
  }

    document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
      playGame('rock');
    });

    document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
      playGame('paper');
    });

    document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
      playGame('scissors');
    });
     
    document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r'){
      playGame('rock');
    } else if (event.key === 'p'){
      playGame('paper');
    }else if(event.key === 's'){
      playGame('scissors');
    }
    
    });


     function playGame(playerMove){

     const computerMove = pickmove();
    
    let result = ''; 

    if (playerMove === 'scissors'){
      if(computerMove === 'rock'){
        result ='you lose.';
      }  else if (computerMove === 'paper'){
      result = 'you win.';
    }else if (computerMove === 'scissors') {
      result='tie.';
    }
   } else if(playerMove === 'paper') {
    
      if(computerMove === 'rock'){
        result ='you win.'
      } else if (computerMove === 'paper'){
        result = 'Tie.';
      }else if (computerMove === 'scissors') {
        result='you lose.';
      }
   } else if(playerMove === 'rock'){

      if(computerMove === 'rock'){
        result ='Tie.'
      } else if (computerMove === 'paper'){
        result = 'you lose.';
      }else if (computerMove === 'scissors') {
        result='you win.';
      }
      
   }

    if(result === 'you win.'){
      score.wins += 1;
    } else if (result === 'you lose.'){
      score.loses += 1;
    } else if(result === 'Tie.'){
      score.ties += 1;
    }

    localStorage.setItem('score',JSON.stringify(score));

   updateScoreElement();

   document.querySelector('.js-result').innerHTML = result;

   document.querySelector('.js-moves')
   .innerHTML = ` You  <img src ="images/${playerMove}-emoji.png" class="move-icon">
   
    <img src =" images/${computerMove}-emoji.png" class="move-icon">
    Computer`; 
  }

   
  function updateScoreElement(){
    
    document.querySelector('.js-score')
      .innerHTML =`wins:${score.wins}, loses:${score.loses}, ties:${score.ties}`;
  }

  function pickmove() {

 const randomNumber = Math.random();

  let computerMove = '';

   if(randomNumber >= 0 && randomNumber <1/3){
    computerMove= 'rock';
   } else if(randomNumber >= 1 / 3 && randomNumber < 2/ 3){
     computerMove = 'paper';
   }else if(randomNumber >= 2 / 3 && randomNumber < 1){
     computerMove = 'scissors';
    }

    return computerMove;

  }
