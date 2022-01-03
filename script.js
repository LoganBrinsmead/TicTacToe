
// module for the gameboard
const Gameboard = (() =>{


    let gameboard;
    const setGameboard = (newGameboard) => gameboard = newGameboard;
    const getGameboard = () => gameboard;
    return {getGameboard, setGameboard};
})();

// module with closure for checking for a win/tie and declaring the winner
const Game = (() => {
    // do stuff here

    // the value of the box that they click on and thus what gets added to their respective array
    let value;

    // variable to show whos turn it is... start with the user
    let turn;       // player1 === 1 player 2 === 2

    // what the players have inputted
    let playerOneInput = [];
    let playerTwoInput = [];

    // make the event listeners for the gameboard
    document.querySelectorAll('.square').forEach(square => {
        square.addEventListener('click', () => {
            value += 1;
            if (turn === 1) {
                playerOneInput.push(value)
                turn = 2;
            } else if (turn === 2) {
                playerTwoInput.push(value)
                turn = 1;
            };
            // test //////
            console.log(value);
            console.log(turn);
            // test //////
        });
    });

    const checkScore = () => {
        // check the score here and end the game accordingly
    };
})();

// factory func for the players
const Players = (score, name) => {
    const getName = () => name;
    const getScore = () => score;
    return {getName, getScore};
};

// module to update the display
const DisplayController = (() => {
    const gameboard = Gameboard.setGameboard(['X','X','X','X','X','X','X','X','X']);
    let x = 0;
    const updateScreen = () => {document.querySelectorAll('.square').forEach(square => {
        square.textContent = gameboard[x];
        x++;
    });
};
    const clearScreen = () => {
        // clear the screen here
    }
    return {updateScreen, clearScreen};
})();


DisplayController.updateScreen();