let round = 0, playerScore = 0, computerScore = 0;

function newRound() {
    for (let humanhand of document.getElementsByClassName('humanhand')) {
        humanhand.style.visibility = 'visible';
    }
    for (let robothand of document.getElementsByClassName('robothand')) {
        robothand.style.visibility = 'hidden';
    }
}

function endGame() {
    let message ='Tied!';
    if (playerScore > computerScore) {
        message = '(Wo)man wins!' 
    } else if (computerScore > playerScore) {
        message = 'Machine wins!'
    } 
    message += '- Go again? <a href="#" id="reloadlink">Refresh!</a>'
    document.getElementById('subtitle').innerHTML = message;
    document.getElementById('reloadlink').addEventListener('click', () => location.reload());
    for (let hand of document.getElementsByClassName('hand')) {
        hand.style.visibility = 'hidden';
    }
}

function updateScreen(playerChoice, computerChoice, winner) {
    /* Update scoreboard */
    document.getElementById('subtitle').innerHTML = `Round ${round}: ${winner} wins.`;
    document.getElementById('humanscore').innerText = playerScore;
    document.getElementById('computerscore').innerText = computerScore;
    /* Add choices to table */
    let playerBadge = document.getElementById(`row${round}`).childNodes[3].childNodes[0];
    let computerBadge = document.getElementById(`row${round}`).childNodes[5].childNodes[0];
    playerBadge.style.backgroundImage = `url(./images/human/${playerChoice}.png)`;
    computerBadge.style.backgroundImage = `url(./images/robot/${computerChoice}.png)`;
    /* Indicate winner in table */
    if (winner == 'human') {
        playerBadge.style.borderColor = '#1288FF';
    } else if (winner == 'robot') {
        computerBadge.style.borderColor = '#FF3822';
    }
    /* End of round logic */
    if (round == 5) {
        setTimeout(endGame, 1500);
    } else {
        setTimeout(newRound, 1500);
    }
 }

function computerPlay () {
    let options = ['rock', 'paper', 'scissors'];
    let computerChoice = options[ Math.floor(Math.random() * 3)];
    for (let robothand of document.getElementsByClassName('robothand')) {
        if (robothand.getAttribute('value') == computerChoice) {
            robothand.style.visibility = 'visible';
        }
    }
    return computerChoice;
}

function playRound(playerChoice) {
    let computerChoice = computerPlay(), winner = 'neither';
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
        getEventTarget(e).classList.add('clicked');
        for (let hand of document.getElementsByClassName('hand')) {
            hand.style.visibility = 'hidden';
            if (hand.classList.contains('clicked')) {
                hand.style.visibility = 'visible';
                hand.classList.remove('clicked');
            }
        }
        playRound(getEventTarget(e).getAttribute('value'));
    }
}

document.addEventListener('click', handleClick);