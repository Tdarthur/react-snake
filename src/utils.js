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

        return board;
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
    }
};

export default utils;
