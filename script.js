
const Gameboard = (() => {
    let _gameboardArray = [];

    const setGameboard = (value) => {_gameboardArray.push(value)};
    const getGameboard = () => _gameboardArray;

    return {setGameboard, getGameboard};
})();


const Player = (symbol, name) => {
    let _playerArray = [];

    const setScore = (value) => {_playerArray.push(value)};
    const getScore = () => _playerArray;

    return {
        symbol,
        name,
        setScore,
        getScore
    };
};

const DisplayController = (() => {
    const updateScreen = (symbol) => {
        document.querySelectorAll('.square').forEach(square => {
            square.addEventListener('click', () => {
                square.textContent = symbol;
                square.disabled = true;
            });
        });
    };
    return {updateScreen};
})();

const Game = (() => {
    let _turn = 1;          // player 1 === 1, player 2 === 2

    const gameboard = Gameboard;
    const Display = DisplayController;

    const PlayerOne = Player('X', 'Logan');
    const PlayerTwo = Player('O', 'Computer');

    const _checkWinner = (score) => {
        if (score.includes([1,2,3]) || 
        score.includes([1,4,7]) ||
        score.includes([1,5,9]) || 
        score.includes([7,8,9]) ||
        score.includes([4,5,6]) || 
        score.includes([2,5,8]) || 
        score.includes([3,6,9])) {
            return true;                // there is a winner
            // someone won!!!
            // end the game and give the win to whoever got it just by changing the DOM
        };
        if (score.length === 9) {
            const tie = document.createElement('div');
            tie.textContent = "It's a tie!";
            document.appendChild(tie);
            return false;               // there is no winner
            // it's a tie!!!
        };
    };

    

    const startGame = () => {
        // function that runs during all the event listeners
        function event() {
            const win = document.createElement('div');   
            const tie = document.createElement('div');
            tie.textContent = "It's a tie!";
            if (_turn === 1) {
                if (_checkWinner(PlayerOne.getScore()) === true) {
                    win.textContent = `${PlayerOne.name} won!`;
                    document.appendChild(win);
                    // add active class to button to restart here
                }
                if (_checkWinner(gameboard.getGameboard()) === false) {
                    document.appendChild(tie);
                    // add active class to button to restart here
                }
                _turn = 2;
            } else if(_turn === 2) {
                if (_checkWinner(PlayerTwo.getScore()) === true) {
                    win.textContent = `${PlayerTwo.name} won!`;
                    document.appendChild(win);
                    // add active class to button to restart here
                }
                if (_checkWinner(gameboard.getGameboard()) === false) {
                    document.appendChild(tie);
                    // add active class to button to restart here
                }
                _turn = 1;
            }
        }

        // add event listeners to each grid item separately
        document.getElementById('one').addEventListener('click', function handler() {
            gameboard.setGameboard(1);
            if (_turn === 1 ) {
                PlayerOne.setScore(1);
                Display.updateScreen(PlayerOne.symbol);
                event();
                document.getElementById('one').removeEventListener('click', handler);
                console.log(PlayerOne.getScore());                  // test  
            } else if (_turn === 2) {
                PlayerTwo.setScore(1);
                Display.updateScreen(PlayerTwo.symbol);
                event();
            }
        });
        document.getElementById('two').addEventListener('click', () => {
            gameboard.setGameboard(2);
            if (_turn === 1 ) {
                PlayerOne.setScore(2);
                Display.updateScreen(PlayerOne.symbol);
                event();
            } else if (_turn === 2) {
                PlayerTwo.setScore(2);
                Display.updateScreen(PlayerTwo.symbol);
                event();
            }
            
        });
        document.getElementById('three').addEventListener('click', () => {
            gameboard.setGameboard(3);
            if (_turn === 1 ) {
                PlayerOne.setScore(3);
                Display.updateScreen(PlayerOne.symbol);
                event();
            } else if (_turn === 2) {
                PlayerTwo.setScore(3);
                Display.updateScreen(PlayerTwo.symbol);
                event();
            }
        });
        document.getElementById('four').addEventListener('click', () => {
            gameboard.setGameboard(4);
            if (_turn === 1 ) {
                PlayerOne.setScore(4);
                Display.updateScreen(PlayerOne.symbol);
                event();
            } else if (_turn === 2) {
                PlayerTwo.setScore(4);
                Display.updateScreen(PlayerTwo.symbol);
                event();
            }
        });
        document.getElementById('five').addEventListener('click', () => {
            gameboard.setGameboard(5);
            if (_turn === 1 ) {
                PlayerOne.setScore(5);
                Display.updateScreen(PlayerOne.symbol);
                event();
            } else if (_turn === 2) {
                PlayerTwo.setScore(5);
                Display.updateScreen(PlayerTwo.symbol);
                event();
            }
        });
        document.getElementById('six').addEventListener('click', () => {
            gameboard.setGameboard(6);
            if (_turn === 1 ) {
                PlayerOne.setScore(6);
                Display.updateScreen(PlayerOne.symbol);
                event();
            } else if (_turn === 2) {
                PlayerTwo.setScore(6);
                Display.updateScreen(PlayerTwo.symbol);
                event();
            }
        });
        document.getElementById('seven').addEventListener('click', () => {
            gameboard.setGameboard(7);
            if (_turn === 1 ) {
                PlayerOne.setScore(7);
                Display.updateScreen(PlayerOne.symbol);
                event();
            } else if (_turn === 2) {
                PlayerTwo.setScore(7);
                Display.updateScreen(PlayerTwo.symbol);
                event();
            }
        });
        document.getElementById('eight').addEventListener('click', () => {
            gameboard.setGameboard(8);
            if (_turn === 1 ) {
                PlayerOne.setScore(8);
                Display.updateScreen(PlayerOne.symbol);
                event();
            } else if (_turn === 2) {
                PlayerTwo.setScore(8);
                Display.updateScreen(PlayerTwo.symbol);
                event();
            }
        });
        document.getElementById('nine').addEventListener('click', () => {
            gameboard.setGameboard(9);
            if (_turn === 1 ) {
                PlayerOne.setScore(9);
                Display.updateScreen(PlayerOne.symbol);
                event();
            } else if (_turn === 2) {
                PlayerTwo.setScore(9);
                Display.updateScreen(PlayerTwo.symbol);
                event();
            }
        });

    };
    return {startGame};
})();

Game.startGame();