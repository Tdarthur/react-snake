import SnakeNode from './SnakeNode';
import * as directions from './directions';
import * as cellTypes from './cellTypes';

const utils = {
    makeSnake: function (posX, posY, length, direction) {
        const snake = {
            head: new SnakeNode({
                x: posX,
                y: posY
            }),
            length,
            direction,
            lastMove: null,
            alive: true
        };

        let previousNode = snake.head;
        for (let i = 1; i < length; i++) {
            const currentNode = new SnakeNode(
                {
                    x: posX,
                    y: posY + i
                },
                previousNode
            );
            previousNode = currentNode;
        }

        snake.tail = previousNode;
        console.log(snake.tail);

        return snake;
    },

    makeBoard: function (width, height, snakeTail) {
        const board = {
            width: width,
            height: height,
            emptySpaces: width * height - 1,
            cells: []
        };
        for (let i = 0; i < height; i++) {
            const row = [];
            for (let j = 0; j < width; j++) {
                row.push(cellTypes.EMPTY);
            }
            board.cells.push(row);
        }

        return this.generateFood(board);
    },

    generateFood: function (board) {
        const newBoard = { ...board };
        const newFoodAt = Math.floor(Math.random() * newBoard.emptySpaces);

        let emptyCellsCounted = 0;
        for (let i = 0; i < newBoard.height; i++) {
            for (let j = 0; j < newBoard.width; j++) {
                if (newBoard.cells[i][j] === cellTypes.EMPTY) {
                    if (emptyCellsCounted === newFoodAt) {
                        newBoard.cells[i][j] = cellTypes.FOOD;
                        return newBoard;
                    } else {
                        emptyCellsCounted++;
                    }
                }
            }
        }

        return newBoard;
    },

    moveSnake: function (board, snake) {
        const { head, tail, direction } = snake;

        let newPosition = { ...head.position };
        if (direction === directions.LEFT) {
            newPosition.x = newPosition.x - 1;
        } else if (direction === directions.RIGHT) {
            newPosition.x = newPosition.x + 1;
        } else if (direction === directions.UP) {
            newPosition.y = newPosition.y - 1;
        } else if (direction === directions.DOWN) {
            newPosition.y = newPosition.y + 1;
        }

        let newHead = new SnakeNode(newPosition);
        head.previous = newHead;

        let newTail;
        if (
            newPosition.x >= 0 &&
            newPosition.x < board.width &&
            newPosition.y >= 0 &&
            newPosition.y < board.height
        ) {
            if (board.cells[newPosition.y][newPosition.x] === cellTypes.FOOD) {
                newTail = tail;
            } else {
                newTail = tail.previous;
            }
        }

        return {
            head: newHead,
            tail: newTail,
            length: snake.length,
            direction,
            lastMove: direction,
            alive: snake.alive
        };
    }
};

export default utils;
