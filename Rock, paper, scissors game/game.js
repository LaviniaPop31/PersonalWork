var arrayGame = ["Rock", "Paper", "Scissors"];
var computerChoice;
var userChoice;

play();

var result = winner(computerChoice, userChoice);
console.log(result);

function play() {
    computerChoice = arrayGame[Math.floor(Math.random() * arrayGame.length)];
    userChoice = arrayGame[Math.floor(Math.random() * arrayGame.length)];
    console.log("Computer choice: " + computerChoice);
    console.log("User choice: " + userChoice);
}

function winner(computer, user) {
    if (computer === "Rock" && user === "Paper") {
        return 'User wins!';
    } else if (user === "Rock" && computer === "Paper") {
        return "Computer wins!";
    } else if (computer === "Rock" && user === "Scissors") {
        return "Computer wins!";
    } else if (user === "Rock" && computer === "Scissors") {
        return "User wins!";
    } else if (computer === "Paper" && user === "Scissors") {
        return "User wins!";
    } else if (user === "Paper" && computer === "Scissors") {
        return "Computer wins!";
    } else if (user === computer) {
        return "Repeat. Nobody won";
    }

}
   
