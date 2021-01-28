import React from 'react';
import { gameStatus } from './App';

import * as cellTypes from '../cellTypes';
import * as directions from '../directions';

const SNAKE_EDGE_RADIUS = '5px';
const roundedSnake = true;
const separatedSnakeHead = false;
const snakeColor = 'rgb(51, 51, 51)';

const Snake = ({ board, status }) => {
    const { cells, snake } = board;
    const snakeClass =
        status === gameStatus.GAME_OVER ? 'dead-snake-cell' : 'snake-cell';

    let snakeCells = [];
    let currentCell = { ...snake.tail };
    let cellValue = cells[currentCell.y][currentCell.x];
    while (cellValue) {
        const { x, y } = currentCell;

        snakeCells.push(
            <div
                className={snakeClass}
                key={x + ',' + y}
                style={{
                    gridRow: `${y + 1} / ${y + 2}`,
                    gridColumn: `${x + 1} / ${x + 2}`,
                    backgroundColor: snakeColor
                }}
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
        } else if (cellValue === cellTypes.SNAKE_HEAD) {
            break;
        }

        cellValue = cells[currentCell.y]
            ? cells[currentCell.y][currentCell.x]
            : null;
    }

    const snakeHeadStyle = snakeCells[snakeCells.length - 1].props.style;
    const snakeTailCell = cells[snake.tail.y][snake.tail.x];
    const snakeTailStyle = snakeCells[0].props.style;
    if (roundedSnake) {
        if (snake.direction === directions.LEFT) {
            // snakeHeadStyle.marginRight = '25%';
            snakeHeadStyle.borderRadius = `${SNAKE_EDGE_RADIUS} 0 0 ${SNAKE_EDGE_RADIUS}`;
        } else if (snake.direction === directions.RIGHT) {
            // snakeHeadStyle.marginLeft = '25%';
            snakeHeadStyle.borderRadius = `0 ${SNAKE_EDGE_RADIUS} ${SNAKE_EDGE_RADIUS} 0`;
        } else if (snake.direction === directions.UP) {
            // snakeHeadStyle.marginBottom = '25%';
            snakeHeadStyle.borderRadius = `${SNAKE_EDGE_RADIUS} ${SNAKE_EDGE_RADIUS} 0 0`;
        } else if (snake.direction === directions.DOWN) {
            // snakeHeadStyle.marginTop = '25%';
            snakeHeadStyle.borderRadius = `0 0 ${SNAKE_EDGE_RADIUS} ${SNAKE_EDGE_RADIUS}`;
        }

        if (snakeTailCell === cellTypes.SNAKE_LEFT) {
            snakeTailStyle.borderRadius = `0 ${SNAKE_EDGE_RADIUS} ${SNAKE_EDGE_RADIUS} 0`;
        } else if (snakeTailCell === cellTypes.SNAKE_RIGHT) {
            snakeTailStyle.borderRadius = `${SNAKE_EDGE_RADIUS} 0 0 ${SNAKE_EDGE_RADIUS}`;
        } else if (snakeTailCell === cellTypes.SNAKE_UP) {
            snakeTailStyle.borderRadius = `0 0 ${SNAKE_EDGE_RADIUS} ${SNAKE_EDGE_RADIUS}`;
        } else if (snakeTailCell === cellTypes.SNAKE_DOWN) {
            snakeTailStyle.borderRadius = `${SNAKE_EDGE_RADIUS} ${SNAKE_EDGE_RADIUS} 0 0`;
        }
    }

    if (separatedSnakeHead) {
        if (snake.direction === directions.LEFT) {
            snakeHeadStyle.marginRight = '25%';
        } else if (snake.direction === directions.RIGHT) {
            snakeHeadStyle.marginLeft = '25%';
        } else if (snake.direction === directions.UP) {
            snakeHeadStyle.marginBottom = '25%';
        } else if (snake.direction === directions.DOWN) {
            snakeHeadStyle.marginTop = '25%';
        }
    }

    return <>{snakeCells}</>;
};

export default Snake;
