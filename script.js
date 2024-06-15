
function getRandomChoiceNumber() {
    return Math.floor(Math.random() * 3) + 1;
}

function capitalizeFirstLetter(choice) {
    return choice && choice.charAt(0).toUpperCase() + choice.slice(1);
}

function getComputerChoice() {
    let randomNumber = getRandomChoiceNumber();
    switch(randomNumber) {
        case 1: return "rock";
        case 2: return "paper";
        case 3: return "scissors";
    }
}

function getHumanChoice() {
    let input = prompt("Enter choice: ");
    return !input ? "" : input;
}

function playGame() {
    let computerScore = 0;
    let humanScore = 0;
    let roundNumber = 1;

    function playRound(computerChoice, humanChoice) {
        if(computerChoice === "rock" && humanChoice === "scissors" ||
            computerChoice === "scissors" && humanChoice === "paper" ||
            computerChoice == "paper" && humanChoice == "rock"
        ) {
            computerScore++;
            console.log(`You lose! ${capitalizeFirstLetter(computerChoice)} beats ${capitalizeFirstLetter(humanChoice)}`)
        }
        else if(computerChoice != humanChoice) {
            humanScore++;
            console.log(`You win! ${capitalizeFirstLetter(humanChoice)} beats ${capitalizeFirstLetter(computerChoice)}`)
        }
        
        else {
            console.log("It's a tie!");
        }
    }

    while(roundNumber <= 5) {
        console.log(`Round ${roundNumber}:`);
        const humanChoice = getHumanChoice().toLowerCase();
        const computerChoice = getComputerChoice();
        console.log("Computer Choice: " + computerChoice);
        console.log("Human Choice: " + humanChoice);
        playRound(computerChoice, humanChoice);
        roundNumber++;
    }

    if(computerScore > humanScore) {
        console.log(`Computer won the game with a score of ${computerScore}-${humanScore}`);
    }
    else if(computerScore < humanScore){
        console.log(`Congrats! You won the game with a score of ${humanScore}-${computerScore}`);
    }
    else {
        console.log("The game ended with a tie!");
    }
}

playGame();