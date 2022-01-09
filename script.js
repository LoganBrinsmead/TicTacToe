
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
    const _notify = document.querySelector('#notify');
    const updateGrid = (symbol, square) => {
            square.textContent = symbol;
    };
    const resetButton = () => { document.querySelector('#resetButton').addEventListener('click', () => {
            Game.resetGame();
            document.querySelectorAll('.square').forEach(square => {
                square.textContent = '';
            });
            Game.startGame();
    })};
    const updateNotify = (update) => {
        _notify.textContent = update;
    };
    return {
        updateGrid, 
        resetButton, 
        updateNotify 
    };
})();
const Game = (() => {
    const gameboard = Gameboard;
    const Display = DisplayController;
    const PlayerOne = Player('X', 'Player X');
    const PlayerTwo = Player('O', 'Player O');
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
            return true;                
        }  
    };
    const resetGame = () => {
        PlayerOne.getScore().length = 0;
        PlayerTwo.getScore().length = 0;
        gameboard.getGameboard().length = 0;
    };
    const startGame = () => {
        Display.updateNotify(`It's ${PlayerOne.name}'s turn!`);    
        let _turn = 1;          // player 1 === 1, player 2 === 2
        let isOver = false;
        function event(index, square) {
            console.log(gameboard.getGameboard().length)
            console.log(_checkWinner(gameboard.getGameboard()));

            if (isOver) {return};
            gameboard.setGameboard(index);
            if (_turn === 1) {
                PlayerOne.setScore(index);
                Display.updateGrid(PlayerOne.symbol, square);
                Display.updateNotify(`It's ${PlayerTwo.name}'s turn!`);
            } else if (_turn === 2) {
                PlayerTwo.setScore(index);
                Display.updateGrid(PlayerTwo.symbol, square);
                Display.updateNotify(`It's ${PlayerOne.name}'s turn!`);
            }
            if (_checkWinner(PlayerOne.getScore()) === true) {
                Display.updateNotify(`${PlayerOne.name} won!`);
                isOver = true;
            }
            if (_checkWinner(PlayerTwo.getScore()) === true) {
                Display.updateNotify(`${PlayerTwo.name} won!`);
                isOver = true;
            }
            if (gameboard.getGameboard().length === 9) {
                Display.updateNotify(`It's a tie!`);
                isOver = true;
            }
            if (_turn === 1) {
                _turn = 2;
            } else if(_turn === 2) {
                _turn = 1;
            }
        }   
        document.querySelectorAll('.square').forEach(function(square, index) {
            square.addEventListener('click', event.bind(null, index, square), {once: true});
        });
};
    return {startGame, resetGame};
})();

Game.startGame();
DisplayController.resetButton();