let round = 0, playerScore = 0, computerScore = 0;

function updateScreen(playerChoice, computerChoice, winner) {
    /* Update scoreboard */
    document.getElementById('playerScore').innerText = playerScore;
    document.getElementById('computerScore').innerText = computerScore;
    /* Add choices to table */
    let playerBadge = document.getElementById(`row${round}`).childNodes[3].childNodes[0];
    let computerBadge = document.getElementById(`row${round}`).childNodes[5].childNodes[0];
    playerBadge.style.backgroundImage = `url(../images/human/${playerChoice}.png)`;
    computerBadge.style.backgroundImage = `url(../images/robot/${computerChoice}.png)`;
    /* Indicate winner in table */
    if (winner == 'human') {
        playerBadge.style.borderColor = '#1288FF';
    } else if (winner == 'robot') {
        computerBadge.style.borderColor = '#FF3822';
    }
    /* End of game changes */
    if (round == 5) {
        let message = '';
        playerScore > computerScore ? message = 'Man wins!' 
        : computerScore > playerScore ? message = 'Machine wins!' : message = 'Tied!';
        document.getElementById('subtitle').innerText = message;
        document.getElementById('reload').innerText = 'Again? Refresh!';
    }
 }

function computerPlay () {
    let options = ['rock', 'paper', 'scissors'];
    return options[ Math.floor(Math.random() * 3)];
}

function playRound(playerChoice) {
    let computerChoice = computerPlay(), winner = '';
    if (computerChoice !== playerChoice) {
        if (
            (playerChoice == 'rock' && computerChoice == 'scissors') ||
            (playerChoice == 'paper' && computerChoice == 'rock') ||
            (playerChoice == 'scissors' && computerChoice == 'paper')
            ) {
                playerScore++;
                winner = 'human';
        } else {
                computerScore++;
                winner = 'robot';
        }
            
    }
    round++;
    updateScreen(playerChoice, computerChoice, winner);
}

function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}

function handleClick(e) {
    if (getEventTarget(e).getAttribute('value') && round < 5) {
        playRound(getEventTarget(e).getAttribute('value'));
    }
}

document.addEventListener('click', handleClick);






