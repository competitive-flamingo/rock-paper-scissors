
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
    let drawVal = 0;
    let humanChoiceString = "";
    let computerChoiceString = "";
    let roundNumber = 1;
    let gameplayEnabled = true;
    const WIN_SCORE = 5;
    const humanChoices = document.querySelectorAll(".choices .choice");
    const computerChoice = document.querySelector(".computer-side .choice");
    const computerChoiceImage = document.createElement("img");
    const computerChoicePara = document.querySelector(".computer-side p");
    const won = document.querySelector("span.won");
    const lost = document.querySelector("span.lost");
    const draw = document.querySelector("span.draw");
    const log = document.querySelector(".log");
    const buttonContainer = document.querySelector(".button-container");
    const playAgainButton = document.createElement("button");
    playAgainButton.textContent = "Play Again";
    humanChoices.forEach((choice) => {
        choice.addEventListener("mouseover", colorChoiceBackground);
        choice.addEventListener("mouseout", uncolorChoiceBackground);
        choice.addEventListener("click", showChoices);
    });
    function colorChoiceBackground() {
        if(!gameplayEnabled) return;
        this.style.backgroundColor = "#028391";
    }
    function uncolorChoiceBackground() {
        if(!gameplayEnabled) return;
        this.style.backgroundColor = "transparent";
    }
    function showChoices() {
        if(!gameplayEnabled) return;
        humanChoiceString = this.firstElementChild.firstElementChild.className;
        computerChoiceString = getComputerChoice();
        updateComputerChoice();
        playRound(computerChoiceString, humanChoiceString);;
    }
    function getComputerChoiceImage(computerChoiceString) {
        switch(computerChoiceString) {
            case "rock" : return "./images/rock.png";
            case "paper" : return "./images/paper.png";
            case "scissors" : return "./images/scissors.png";
        }
    }
    function updateComputerChoice() {
        computerChoiceImage.src = getComputerChoiceImage(computerChoiceString);
        computerChoiceImage.alt = computerChoiceString;
        computerChoiceImage.classList.add(computerChoiceString);
        computerChoicePara.textContent = capitalizeFirstLetter(computerChoiceString);
        if(computerChoice.childNodes[1].firstChild) computerChoice.childNodes[1].firstChild.remove();
        computerChoice.childNodes[1].appendChild(computerChoiceImage);
    }
    function isGameOver() {
        return humanScore === WIN_SCORE || computerScore === WIN_SCORE;
    }
    function endGame() {
        gameplayEnabled = false;
        humanChoices.forEach((choice) => {
            removeEventListener("mouseover", choice);
            removeEventListener("mouseout", choice);
            removeEventListener("click", choice);
            choice.style.backgroundColor = "transparent";
            choice.style.cursor = "not-allowed";
        });
        buttonContainer.appendChild(playAgainButton);
        playAgainButton.addEventListener("click", () => {
            document.location.reload();
        })
    }
    function playRound(computerChoice, humanChoice) {
        let roundLog = "";
        if(computerChoice === "rock" && humanChoice === "scissors" ||
            computerChoice === "scissors" && humanChoice === "paper" ||
            computerChoice == "paper" && humanChoice == "rock"
        ) {
            computerScore++;
            roundLog = `You lose! ${capitalizeFirstLetter(computerChoice)} beats ${capitalizeFirstLetter(humanChoice)}`;
        }
        else if(computerChoice != humanChoice) {
            humanScore++;
            roundLog = `You win! ${capitalizeFirstLetter(humanChoice)} beats ${capitalizeFirstLetter(computerChoice)}`;
        }
        else {
            drawVal++;
            roundLog = "It's a tie!";
        }
        won.textContent = humanScore;
        lost.textContent = computerScore;
        draw.textContent = drawVal;
        log.textContent = `Round ${roundNumber++}: ${roundLog}`;
        if(isGameOver()) {
            log.textContent = humanScore === 5 ? "Congrats on winning the game!" : "You lost! better luck next time";
            endGame();
        }
    }
}

playGame();