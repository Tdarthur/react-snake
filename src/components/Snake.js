import React from 'react';
import { gameStatus } from './App';

import * as cellTypes from '../cellTypes';

const Snake = ({ board, status }) => {
    const { cells, snake } = board;
    const snakeClass =
        status === gameStatus.GAME_OVER ? 'dead-snake-cell' : 'snake-cell';

    let snakeCells = [];
    let currentCell = { ...snake.tail };
    let cellValue = cells[currentCell.y][currentCell.x];
    while (cellValue) {
        const { x, y } = currentCell;
        const positionStyle = {
            gridRow: `${y + 1} / ${y + 2}`,
            gridColumn: `${x + 1} / ${x + 2}`
        };

        snakeCells.push(
            <div
                className={snakeClass}
                key={x + ',' + y}
                style={positionStyle}
            ></div>
        );

        if (cellValue === cellTypes.SNAKE_LEFT) {
            currentCell.x--;
        } else if (cellValue === cellTypes.SNAKE_RIGHT) {
            currentCell.x++;
        } else if (cellValue === cellTypes.SNAKE_UP) {
            currentCell.y--;
        } else if (cellValue === cellTypes.SNAKE_DOWN) {
            currentCell.y++;
        } else {
            break;
        }

        cellValue = cells[currentCell.y]
            ? cells[currentCell.y][currentCell.x]
            : null;
    }

    return <>{snakeCells}</>;
};

export default Snake;
