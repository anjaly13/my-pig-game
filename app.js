/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var activePlayers,score,roundScore,isGameActive,lastScore1,lastScore2,finalScore;
init();

/**
 * rol the dice
 */
document.querySelector('.btn-roll').addEventListener('click',function(){

    

    if(isGameActive){
        // generate a random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        if((lastScore1 + dice1) === 12 || (lastScore2 + dice2) === 12){
            // loose all the points and next player's turn
            twoSixInaRow();
        }

        // display the the numbers
        var docDomDice = document.getElementById('dice-1');
        docDomDice.style.display = 'block';
        docDomDice.src = 'dice-' + dice1 + '.png';

        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        // if 2 is coming add the round score with the score snd shift to next person, else round up the scores 
        if(dice1 !== 1 && dice2 !== 1){
            roundScore += dice1+dice2;
            document.getElementById('current-' + activePlayers).textContent = roundScore;
        }
        else{
            nextTurn();
        }   
        lastScore1 = dice1;
        lastScore2 = dice2;     
    }
 
});

function twoSixInaRow(){
    score[activePlayers] = 0;
    lastScore1 = 0;
    lastScore2 = 0;
    document.getElementById('score-'+activePlayers).textContent = 0;
    nextTurn();
}

/**
 * Hold button
 */
document.querySelector('.btn-hold').addEventListener('click',function(){
    if(isGameActive){
        score[activePlayers] += roundScore ;
        document.getElementById('score-'+activePlayers).textContent = score[activePlayers];


        finalScore = document.querySelector('.final-score').value;
        if(!finalScore){
            finalScore = 100;
        }
        console.log(finalScore);
        if(score[activePlayers] >= finalScore){
            document.getElementById('name-'+activePlayers).textContent = 'Winner!';
            document.getElementById('dice-2').style.display = 'none';
            document.getElementById('dice-1').style.display = 'none';
            document.querySelector('.player-'+activePlayers+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayers+'-panel').classList.remove('active');
            isGameActive = false;
        }
        else{
            nextTurn();
        }
    }
});

function nextTurn(){
    activePlayers == 0 ? activePlayers = 1 : activePlayers =0;
        roundScore = 0;

        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;

        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.player-0-panel').classList.toggle('active');

        document.getElementById('dice-2').style.display = 'none';
        document.getElementById('dice-1').style.display = 'none';
}

/**
 * start a new game 
 */
document.querySelector('.btn-new').addEventListener('click',init);

function init(){
    score = [0,0];
    roundScore = 0;
    activePlayers = 0;

    isGameActive = true;
    lastScore1 = 0;
    lastScore2 = 0;
    
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('#name-1').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
}



