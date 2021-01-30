import gameUtils from './gameUtils';

import { boardSize, gameStatus } from '../../components/App';
import * as cellTypes from '../../cellTypes';
import * as directions from '../../directions';

const CELL_SIZE = '15px';

export const DEFAULT_BOARD_SIZE = boardSize.LARGE;
export const DEFAULT_SNAKE_START_LENGTH = 3;
export const DEFAULT_SNAKE_START_DIRECTION = directions.UP;
export const DEFAULT_SNAKE_SLOW_SPEED = 10;
export const DEFAULT_SNAKE_NORMAL_SPEED = 20;
export const DEFAULT_SNAKE_FAST_SPEED = 30;

const initializeState = () => {
    const defaultSettings = {
        show: false,
        boardSize: DEFAULT_BOARD_SIZE,
        snakeStartLength: DEFAULT_SNAKE_START_LENGTH,
        snakeStartDirection: DEFAULT_SNAKE_START_DIRECTION,
        snakeSlowSpeed: DEFAULT_SNAKE_SLOW_SPEED,
        snakeNormalSpeed: DEFAULT_SNAKE_NORMAL_SPEED,
        snakeFastSpeed: DEFAULT_SNAKE_FAST_SPEED
    };

    return { gameState: initializeGameState(defaultSettings) };
};

const initializeBoard = (settings) => {
    const { snakeStartDirection, snakeStartLength } = settings;
    const { width, height } = settings.boardSize;
    const snakePosition = {
        x: Math.floor(width / 2),
        y: Math.floor(height / 2)
    };

    let nextSnakeOffset;
    if (snakeStartDirection === directions.LEFT) {
        nextSnakeOffset = { x: 1, y: 0 };
    } else if (snakeStartDirection === directions.RIGHT) {
        nextSnakeOffset = { x: -1, y: 0 };
    } else if (snakeStartDirection === directions.UP) {
        nextSnakeOffset = { x: 0, y: 1 };
    } else {
        nextSnakeOffset = { x: 0, y: -1 };
    }

    const snakePositions = {};
    let nextSnakePosition = { ...snakePosition };
    for (let i = 1; i < snakeStartLength; i++) {
        nextSnakePosition = {
            x: nextSnakePosition.x + nextSnakeOffset.x,
            y: nextSnakePosition.y + nextSnakeOffset.y
        };

        if (!snakePositions[nextSnakePosition.x]) {
            snakePositions[nextSnakePosition.x] = {};
        }
        snakePositions[nextSnakePosition.x][nextSnakePosition.y] = true;
    }
    const snakeTail = { ...nextSnakePosition };

    const board = {
        width: width,
        height: height,
        snake: {
            head: snakePosition,
            tail: snakeTail,
            length: settings.snakeStartLength,
            direction: settings.snakeStartDirection,
            lastMove: settings.snakeStartDirection,
            speed: settings.snakeNormalSpeed
        },
        emptySpaces: width * height - settings.snakeStartLength,
        cells: [],
        food: null
    };

    for (let y = 0; y < height; y++) {
        const row = [];
        for (let x = 0; x < width; x++) {
            if (x === snakePosition.x && y === snakePosition.y) {
                row.push(cellTypes.SNAKE_HEAD);
            } else if (snakePositions[x] && snakePositions[x][y]) {
                row.push(
                    cellTypes.cellFromDirection(settings.snakeStartDirection)
                );
            } else {
                row.push(cellTypes.EMPTY);
            }
        }
        board.cells.push(row);
    }

    gameUtils.spawnFood(board);

    return board;
};

const initializeGridTemplate = (settings) => {
    const gridTemplate = {
        rows: '',
        columns: ''
    };
    for (let i = 0; i < settings.boardSize.height; i++) {
        gridTemplate.rows += `${CELL_SIZE} `;
    }
    for (let i = 0; i < settings.boardSize.width; i++) {
        gridTemplate.columns += `${CELL_SIZE} `;
    }

    return gridTemplate;
};

export const initializeGameState = (settings) => ({
    settings,
    status: gameStatus.WAITING,
    board: initializeBoard(settings),
    gridTemplate: initializeGridTemplate(settings)
});

export default initializeState();
