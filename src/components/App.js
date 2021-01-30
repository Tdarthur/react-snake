import React from 'react';

import Game from './Game';

export const boardSize = {
    SMALL: { width: 20, height: 15 },
    MEDIUM: { width: 35, height: 25 },
    LARGE: { width: 50, height: 35 }
};

export const gameStatus = {
    WAITING: 'WAITING',
    PLAYING: 'PLAYING',
    PAUSED: 'PAUSED',
    GAME_OVER: 'GAME_OVER'
};

function App() {
    return <Game />;
}

export default App;
