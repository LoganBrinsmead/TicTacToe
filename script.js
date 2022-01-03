/*
        Name:           TicTacToe
        Author:         Logan Brinsmead
        Date:           January 2, 2022
        Description:    Use modules, factory functions, and general object concepts to create a simple TicTacToe game.
                        Inspired by the Odin Project. :)
*/



// factory func for the players
const Player = (symbol, name) => {
    const getName = () => name;
    const getSymbol = () => symbol;     // symbol === X or O
    return {getName, getSymbol};
};

// module to update the display
const DisplayController = (() => {
    const gameboard = Gameboard.setGameboard(['1','2','3','4','5','6','7','8','9']);
    let x = 0;
    const updateScreen = () => {document.querySelectorAll('.square').forEach(square => {
        square.textContent = gameboard[x];
        x++;
    });
};
    const reset = () => {
        // reset everything
    }
    return {updateScreen, clearScreen};
})();


// module for the gameboard
const Gameboard = (() =>{
    let gameboard;
    const setGameboard = (newGameboard) => gameboard = newGameboard;
    const getGameboard = () => gameboard;
    return {getGameboard, setGameboard};
})();

// module with closure for checking for a win/tie and declaring the winner
const Game = (() => {

    // make the objects we need to run the game
    const changeDisplay = DisplayController.updateScreen();     // change the display
    const Gameboard = Gameboard.setGameboard();                 // change the gameboard

    const checkWinner = (playerOneScore, playerTwoScore) => {
        if (playerOneScore.includes([1,2,3]) || 
            playerOneScore.includes([1,4,7]) ||
            playerOneScore.includes([1,5,9]) || 
            playerOneScore.includes([7,8,9]) ||
            playerOneScore.includes([4,5,6]) || 
            playerOneScore.includes([2,5,8]) || 
            playerOneScore.includes([3,6,9])) {
                return true;
            } else if (playerTwoScore.includes([1,2,3]) || 
            playerTwoScore.includes([1,4,7]) ||
            playerTwoScore.includes([1,5,9]) || 
            playerTwoScore.includes([7,8,9]) ||
            playerTwoScore.includes([4,5,6]) || 
            playerTwoScore.includes([2,5,8]) || 
            playerTwoScore.includes([3,6,9])) {
                return false;
            }
    };

    // make an object for playerOne
    const playerOne = Player('X', prompt("What is player one's name?"));        // name === input from user, tentatively prompt()
    // make an object for playerTwo
    const playerTwo = Player('O', prompt("What is player two's name?"));        // name === input from user, tentatively prompt()

    // the value of the box that they click on and thus what gets added to their respective array
    let value = 0;

    // variable to show whos turn it is... start with the user
    let turn;       // player1 === 1 player 2 === 2

    // what the players have inputted
    let playerOneInput = [];
    let playerTwoInput = [];

    // make the event listeners for the gameboard
    const startGame = () =>  { document.querySelectorAll('.square').forEach(square => {
        value += 1;     /// value for the square
        square.addEventListener('click', () => {
            if (turn === 1) {
                playerOneInput.push(value);
                if (checkWinner(playerOneInput, playerTwoInput)) {break};
                turn = 2;
            } else if (turn === 2) {
                playerTwoInput.push(value);
                if (checkWinner(playerOneInput, playerTwoInput) === false) {break};
                turn = 1;
                changeDisplay()
            };
            // test //////
            console.log(value);
            console.log(turn);
            // test //////
            square.disabled = 'true';
        });

    });
}})();




