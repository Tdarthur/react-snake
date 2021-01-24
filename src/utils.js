import SnakeNode from './SnakeNode';
import * as directions from './directions';
import * as cellTypes from './cellTypes';

const utils = {
    makeBoard: function (boardWidth, boardHeight) {
        const board = {
            width: boardWidth,
            height: boardHeight,
            emptySpaces: boardWidth * boardHeight - 1,
            cells: []
        };
        for (let i = 0; i < boardHeight; i++) {
            const row = [];
            for (let j = 0; j < boardWidth; j++) {
                row.push(cellTypes.EMPTY);
            }
            board.cells.push(row);
        }

        return this.generateFood(board);
    },

    makeSnake: function (posX, posY, length, direction) {
        const snakeEnds = {
            head: new SnakeNode({
                x: posX,
                y: posY
            }),
            direction,
            lastMove: null
        };

        let previousNode = snakeEnds.head;
        for (let i = 1; i < length; i++) {
            const currentNode = new SnakeNode(
                {
                    x: posX,
                    y: posY + i
                },
                previousNode
            );
            previousNode.append(currentNode);
            previousNode = currentNode;
        }

        snakeEnds.tail = previousNode;

        return snakeEnds;
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

        let newTail;
        if (
            newPosition.x >= 0 &&
            newPosition.x < board.width &&
            newPosition.y >= 0 &&
            newPosition.y < board.height
        ) {
            if (board.cells[newPosition.y][newPosition.x] === cellTypes.FOOD) {
                newTail = tail;
                board.cells[newPosition.y][newPosition.x] = cellTypes.EMPTY;
            } else {
                newTail = tail.previous;
                board.cells[tail.position.y][tail.position.x] = cellTypes.EMPTY;
            }
        } else {
            newTail = tail;
        }

        return {
            head: new SnakeNode(newPosition, head),
            tail: newTail,
            direction,
            lastMove: direction
        };
    },

    getSnakeLength: function (snake) {
        let currentNode = snake;
        let len = 1;

        while (currentNode.next !== null) {
            len++;
            currentNode = currentNode.next;
        }

        return len;
    }
};

export default utils;
