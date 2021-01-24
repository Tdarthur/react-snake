import React, { useState } from 'react';

import Game from './Game';

const BOARD_WIDTHS = { SMALL: 20, MEDIUM: 35, LARGE: 50 };
const BOARD_HEIGHTS = { SMALL: 15, MEDIUM: 25, LARGE: 35 };

function App() {
    const [playingGame, setPlayingGame] = useState(true);
    const [gameKey, setGameKey] = useState(0);
    const [settings, setSettings] = useState({
        boardSize: { width: BOARD_WIDTHS.MEDIUM, height: BOARD_HEIGHTS.MEDIUM }
    });

    const restartGame = () => {
        setPlayingGame(true);
        setGameKey(gameKey + 1);
    };

    const endGame = () => {
        setPlayingGame(false);
    };

    const updateSettings = (newSettings) => {
        setSettings(newSettings);
    };

    return (
        <div>
            <Game
                settings={settings}
                playingGame={playingGame}
                updateSettings={updateSettings}
                endGame={endGame}
                restartGame={restartGame}
            />
        </div>
    );
}

export default App;
