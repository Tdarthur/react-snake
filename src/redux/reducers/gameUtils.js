import { initializeGameState } from './initialState';

import { gameStatus } from '../../components/App';
import { refreshIntervals } from '../../components/Game';
import * as cellTypes from '../../cellTypes';
import * as directions from '../../directions';

const spawnFood = (board) => {
    const newFoodAt = Math.floor(Math.random() * board.emptySpaces);

    let emptyCellsCounted = 0;
    for (let y = 0; y < board.height; y++) {
        for (let x = 0; x < board.width; x++) {
            if (board.cells[y][x] === cellTypes.EMPTY) {
                if (emptyCellsCounted === newFoodAt) {
                    board.cells[y][x] = cellTypes.FOOD;
                    board.food = { x, y };
                    return;
                } else {
                    emptyCellsCounted++;
                }
            }
        }
    }

    throw new Error('Failed to find empty space for food');
};

const gameUtils = {
    spawnFood: spawnFood,

    moveSnake: (state) => {
        const newState = {
            ...state,
            board: {
                ...state.board,
                cells: state.board.cells.map((row) => [...row]),
                snake: {
                    ...state.board.snake,
                    head: { ...state.board.snake.head },
                    tail: { ...state.board.snake.tail },
                    lastMove: state.board.snake.direction
                }
            }
        };
        const board = newState.board;
        const { cells, width, height, snake } = board;
        const { tail, direction } = snake;

        const newPosition = { ...snake.head };

        let cellMoved;
        if (direction === directions.LEFT) {
            cellMoved = cellTypes.SNAKE_LEFT;
            newPosition.x = newPosition.x - 1;
        } else if (direction === directions.RIGHT) {
            cellMoved = cellTypes.SNAKE_RIGHT;
            newPosition.x = newPosition.x + 1;
        } else if (direction === directions.UP) {
            cellMoved = cellTypes.SNAKE_UP;
            newPosition.y = newPosition.y - 1;
        } else if (direction === directions.DOWN) {
            cellMoved = cellTypes.SNAKE_DOWN;
            newPosition.y = newPosition.y + 1;
        }

        if (
            newPosition.x >= 0 &&
            newPosition.x < width &&
            newPosition.y >= 0 &&
            newPosition.y < height &&
            (!cellTypes.isSnake(cells[newPosition.y][newPosition.x]) ||
                (newPosition.x === tail.x && newPosition.y === tail.y))
        ) {
            cells[snake.head.y][snake.head.x] = cellMoved;
            snake.head = newPosition;

            if (cells[newPosition.y][newPosition.x] === cellTypes.FOOD) {
                snake.length = snake.length + 1;
                board.emptySpaces--;
                spawnFood(board);
            } else {
                const tailCell = cells[tail.y][tail.x];
                cells[tail.y][tail.x] = cellTypes.EMPTY;

                if (tailCell === cellTypes.SNAKE_LEFT) {
                    tail.x--;
                } else if (tailCell === cellTypes.SNAKE_RIGHT) {
                    tail.x++;
                } else if (tailCell === cellTypes.SNAKE_UP) {
                    tail.y--;
                } else if (tailCell === cellTypes.SNAKE_DOWN) {
                    tail.y++;
                }
            }

            cells[newPosition.y][newPosition.x] = cellTypes.SNAKE_HEAD;
        } else {
            newState.status = gameStatus.GAME_OVER;
        }

        return newState;
    },

    handleGameInput: (state, inputAction) => {
        const newState = {
            ...state,
            board: { ...state.board, snake: { ...state.board.snake } }
        };
        const snake = newState.board.snake;
        switch (inputAction.code) {
            case 'KeyA':
            case 'ArrowLeft':
                if (snake.lastMove !== directions.RIGHT) {
                    snake.direction = directions.LEFT;
                }
                break;
            case 'KeyD':
            case 'ArrowRight':
                if (snake.lastMove !== directions.LEFT) {
                    snake.direction = directions.RIGHT;
                }
                break;
            case 'KeyW':
            case 'ArrowUp':
                if (snake.lastMove !== directions.DOWN) {
                    snake.direction = directions.UP;
                }
                break;
            case 'KeyS':
            case 'ArrowDown':
                if (snake.lastMove !== directions.UP) {
                    snake.direction = directions.DOWN;
                }
                break;
            case 'KeyR':
                return initializeGameState(state.settings);
            case 'Space':
                if (inputAction.down) {
                    newState.refreshInterval = refreshIntervals.SLOW;
                } else {
                    newState.refreshInterval = refreshIntervals.NORMAL;
                }
                break;
            case 'ShiftLeft':
                if (inputAction.down) {
                    newState.refreshInterval = refreshIntervals.FAST;
                } else {
                    newState.refreshInterval = refreshIntervals.NORMAL;
                }
                break;
            default:
                break;
        }

        return newState;
    }
};

export default gameUtils;
