import React, { useState, useEffect } from 'react';
import Gameboard from './Gameboard';

import * as cellTypes from '../cellTypes';
import * as directions from '../directions';
import utils from '../utils';

const REFERESH_INTERVAL_SECONDS = 0.05;
const SNAKE_INITIAL_LENGTH = 3;
const SNAKE_INITIAL_DIRECTION = directions.UP;

const Game = ({
    settings,
    playingGame,
    updateSettings,
    endGame,
    restartGame
}) => {
    const { width, height } = settings.boardSize;

    const [snake, setSnake] = useState(
        utils.makeSnake(
            Math.floor(width / 2),
            Math.floor(height / 2),
            SNAKE_INITIAL_LENGTH,
            SNAKE_INITIAL_DIRECTION
        )
    );
    const [board, setBoard] = useState(utils.makeBoard(width, height));

    useEffect(() => {
        const interval = setInterval(() => {
            if (playingGame) {
                updateSnake();
            }
        }, REFERESH_INTERVAL_SECONDS * 1000);
        return () => clearInterval(interval);
    });

    function updateSnake() {
        const newSnake = utils.moveSnake(board, snake);

        const newBoard = { ...board, cells: [...board.cells] };
        const { x, y } = newSnake.head.position;
        if (x < 0 || x >= board.width || y < 0 || y >= board.height) {
            newSnake.alive = false;
            endGame();
        } else if (newBoard.cells[y][x] === cellTypes.FOOD) {
            newBoard.cells[y][x] = cellTypes.SNAKE;
            setBoard(utils.generateFood(newBoard));
        } else {
            newBoard.cells[snake.tail.position.y][snake.tail.position.x] =
                cellTypes.EMPTY;
            newBoard.cells[y][x] = cellTypes.SNAKE;
            setBoard(newBoard);
        }

        setSnake(newSnake);
    }

    document.onkeydown = (e) => {
        switch (e.key) {
            case 'a':
            case 'ArrowLeft':
                if (snake.lastMove !== directions.RIGHT) {
                    snake.direction = directions.LEFT;
                }
                break;
            case 'd':
            case 'ArrowRight':
                if (snake.lastMove !== directions.LEFT) {
                    snake.direction = directions.RIGHT;
                }
                break;
            case 'w':
            case 'ArrowUp':
                if (snake.lastMove !== directions.DOWN) {
                    snake.direction = directions.UP;
                }
                break;
            case 's':
            case 'ArrowDown':
                if (snake.lastMove !== directions.UP) {
                    snake.direction = directions.DOWN;
                }
                break;
            case 'r':
                restartGame();
                break;
            default:
                break;
        }
    };

    return (
        <>
            <Gameboard board={board} snakeAlive={snake.alive} />
        </>
    );
};

export default Game;
