import gameUtils from './gameUtils';

import { boardSize, gameStatus } from '../../components/App';
import { refreshIntervals } from '../../components/Game';
import * as cellTypes from '../../cellTypes';
import * as directions from '../../directions';

const CELL_SIZE = '15px';

const DEFAULT_BOARD_SIZE = boardSize.MEDIUM;
const DEFAULT_SNAKE_START_LENGTH = 3;
const DEFAULT_SNAKE_START_DIRECTION = directions.UP;

const initializeState = () => {
    const defaultSettings = {
        boardSize: DEFAULT_BOARD_SIZE,
        snakeStartLength: DEFAULT_SNAKE_START_LENGTH,
        snakeStartDirection: DEFAULT_SNAKE_START_DIRECTION
    };

    return { gameState: initializeGameState(defaultSettings) };
};

const initializeBoard = (settings) => {
    const { width, height } = settings.boardSize;
    const snakePosition = {
        x: Math.floor(width / 2),
        y: Math.floor(height / 2)
    };
    const snakeTailY = snakePosition.y + settings.snakeStartLength - 1;

    const board = {
        width: width,
        height: height,
        snake: {
            head: snakePosition,
            tail: {
                x: snakePosition.x,
                y: snakeTailY
            },
            length: settings.snakeStartLength,
            direction: settings.snakeStartDirection,
            lastMove: settings.snakeStartDirection
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
            } else if (
                x === snakePosition.x &&
                y > snakePosition.y &&
                y <= snakeTailY
            ) {
                row.push(cellTypes.SNAKE_UP);
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
    status: gameStatus.PLAYING,
    refreshInterval: refreshIntervals.NORMAL,
    board: initializeBoard(settings),
    gridTemplate: initializeGridTemplate(settings)
});

export default initializeState();
