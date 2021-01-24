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
            lastMove: direction,
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

        return snake;
    },

    makeBoard: function (width, height) {
        const board = {
            width: width,
            height: height,
            emptySpaces: width * height - 1,
            cells: [],
            food: null
        };
        for (let y = 0; y < height; y++) {
            const row = [];
            for (let x = 0; x < width; x++) {
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
        for (let y = 0; y < newBoard.height; y++) {
            for (let x = 0; x < newBoard.width; x++) {
                if (newBoard.cells[y][x] === cellTypes.EMPTY) {
                    if (emptyCellsCounted === newFoodAt) {
                        newBoard.cells[y][x] = cellTypes.FOOD;
                        newBoard.food = { x, y };
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
        let newLength;
        if (
            newPosition.x >= 0 &&
            newPosition.x < board.width &&
            newPosition.y >= 0 &&
            newPosition.y < board.height &&
            board.cells[newPosition.y][newPosition.x] !== cellTypes.SNAKE
        ) {
            if (board.cells[newPosition.y][newPosition.x] === cellTypes.FOOD) {
                newTail = tail;
                newLength = snake.length + 1;
            } else {
                newTail = tail.previous;
            }
        } else {
            newTail = tail;
            newHead = head;
            head.previous = null;
        }

        return {
            head: newHead,
            tail: newTail,
            length: newLength ? newLength : snake.length,
            direction,
            lastMove: direction,
            alive: snake.alive
        };
    },

    handleAction: function (action, snake, restartGame) {
        switch (action.key) {
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
    }
};

export default utils;
