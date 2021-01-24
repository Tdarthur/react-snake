import React, { useState, useEffect, useRef } from 'react';
import Gameboard from './Gameboard';

import SnakeNode from '../SnakeNode';
import utils from '../utils';
import * as directions from '../directions';

const REFERESH_INTERVAL_SECONDS = 0.5;

const Game = ({ settings }) => {
    const { boardWidth, boardHeight } = settings.boardSize;
    const [board, setBoard] = useState(
        utils.makeBoard(boardWidth, boardHeight)
    );
    const [snakeHead, setSnakeHead] = useState(
        new SnakeNode((boardWidth * boardHeight) / 2)
    );
    const [snakeDirection, setSnakeDirection] = useState(directions.LEFT);
    const [food, setFood] = useState(utils.generateFood(board));

    useEffect(() => {
        const interval = setInterval(
            () => utils.moveSnake(board, snakeHead, snakeDirection),
            REFERESH_INTERVAL_SECONDS * 1000
        );
        return () => clearInterval(interval);
    });

    return (
        <>
            <Gameboard boardSize={settings.boardSize} />
        </>
    );
};

export default Game;
