import React, { useState, useEffect } from 'react';
import Gameboard from './Gameboard';

import * as directions from '../directions';
import * as cellTypes from '../cellTypes';
import utils from '../utils';

const CELL_SIZE = '15px';

const ACTION_QUEUE_SIZE = 5;
const REFERESH_INTERVAL_SECONDS = 0.075;
const SNAKE_INITIAL_LENGTH = 3;
const SNAKE_INITIAL_DIRECTION = directions.UP;

const UseGameState = ({ playingGame, restartGame, endGame, settings }) => {
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
    const [actionQueue, setActionQueue] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (playingGame) {
                updateSnake();
            }
        }, REFERESH_INTERVAL_SECONDS * 1000);
        return () => {
            clearInterval(interval);
        };
    });

    const gridTemplate = {
        rows: '',
        columns: ''
    };
    for (let i = 0; i < height; i++) {
        gridTemplate.rows += `${CELL_SIZE} `;
    }
    for (let i = 0; i < width; i++) {
        gridTemplate.columns += `${CELL_SIZE} `;
    }

    function updateSnake() {
        const action = actionQueue.shift();
        if (action) {
            utils.handleAction(action, snake, restartGame);
        }

        const newSnake = utils.moveSnake(board, snake);

        const newBoard = { ...board, cells: [...board.cells] };
        const { x, y } = newSnake.head.position;
        if (
            x < 0 ||
            x >= board.width ||
            y < 0 ||
            y >= board.height ||
            newBoard.cells[y][x] === cellTypes.SNAKE
        ) {
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
        if (actionQueue.length < ACTION_QUEUE_SIZE) {
            const newActionQueue = [...actionQueue];
            newActionQueue.push(e);
            setActionQueue(newActionQueue);
        }
    };

    return { snake, food: board.food, gridTemplate };
};

const Game = (props) => {
    const { snake, food, gridTemplate } = UseGameState(props);

    return (
        <>
            <Gameboard gridTemplate={gridTemplate} snake={snake} food={food} />
        </>
    );
};

export default Game;
