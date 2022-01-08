
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
//     const updateScreen = (symbol) => {
//         document.querySelectorAll('.square').forEach(square => {
//             square.addEventListener('click', () => {
//                 square.textContent = symbol;
//             });
//         });
//     };

    const updateScreen = (symbol, square) => {
            square.textContent = symbol;
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
        const _contains = (first, second) => {
            const indexArray = first.map(item => {
               return second.indexOf(item);
            });
            return indexArray.indexOf(-1) === -1;
         }    

        if (_contains([0,1,2], score) || 
        _contains([0,3,6], score) ||
        _contains([0,4,8], score) || 
        _contains([6,7,8], score) ||
        _contains([3,4,5], score) || 
        _contains([1,4,7], score) ||
        _contains([2,4,6], score) || 
        _contains([2,5,8], score)) {
            return true;                // there is a winner
            // someone won!!!
            // end the game and give the win to whoever got it just by changing the DOM
        };
        if (score.length === 9) {
            const tie = document.createElement('div');
            tie.textContent = "It's a tie!";
            document.querySelector('.test').appendChild(tie);
            return false;               // there is no winner
            // it's a tie!!!
        };
    };

    

    const startGame = () => {
        // function that runs during all the event listeners
        function event(index, square) {

            console.log('counter: ' + index);       // test
            gameboard.setGameboard(index);
            if (_turn === 1) {
                PlayerOne.setScore(index);
                console.log('player 1 score: ' + PlayerOne.getScore());          // test
                Display.updateScreen(PlayerOne.symbol, square);
            } else if (_turn === 2) {
                PlayerTwo.setScore(index);
                console.log('player 2 score: ' + PlayerTwo.getScore());          // test
                Display.updateScreen(PlayerTwo.symbol, square);
            }


            // TEST
            const _test = document.querySelector('.test');
            // TEST 


            const win = document.createElement('div');   
            const tie = document.createElement('div');
            tie.textContent = "It's a tie!";

            if (_checkWinner(PlayerOne.getScore()) === true) {
                win.textContent = `${PlayerOne.name} won!`;
                _test.appendChild(win);
                // add active class to button to restart here
            }
            if (_checkWinner(PlayerTwo.getScore()) === true) {
                win.textContent = `${PlayerTwo.name} won!`;
                _test.appendChild(win);
                // add active class to button to restart here
            }
            if (_checkWinner(gameboard.getGameboard()) === false) {
                _test.appendChild(tie);
                // add active class to button to restart here
            }


            if (_turn === 1) {
                _turn = 2;
            } else if(_turn === 2) {
                _turn = 1;
            }

            return _turn;
        }
    
        document.querySelectorAll('.square').forEach(function(square, index) {
            square.addEventListener('click', event.bind(null, index, square), {once: true});


        });

};


    return {startGame};
})();

Game.startGame();