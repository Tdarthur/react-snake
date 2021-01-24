import React from 'react';
import * as cellTypes from '../cellTypes';

const Gameboard = ({ board, snakeAlive }) => {
    const { width, height } = board;

    const cellTypeClassName = {};
    cellTypeClassName[cellTypes.EMPTY] = 'empty-cell';
    cellTypeClassName[cellTypes.SNAKE] = snakeAlive
        ? 'snake-cell'
        : 'dead-snake-cell';
    cellTypeClassName[cellTypes.FOOD] = 'food-cell';

    let templateRows = '';
    let templateColumns = '';
    for (let i = 0; i < height; i++) {
        templateRows += '15px ';
    }
    for (let i = 0; i < width; i++) {
        templateColumns += '15px ';
    }

    return (
        <div
            className='game-board'
            style={{
                gridTemplateRows: templateRows,
                gridTemplateColumns: templateColumns
            }}
        >
            {board.cells
                .map((row, i) =>
                    row.map((cell, j) => {
                        const positionStyle = {
                            gridRow: `${i + 1} / ${i + 2}`,
                            gridColumn: `${j + 1} / ${j + 2}`
                        };
                        return (
                            <div
                                className={'cell ' + cellTypeClassName[cell]}
                                key={j + ',' + i}
                                style={positionStyle}
                            ></div>
                        );
                    })
                )
                .flat()}
        </div>
    );
};

export default Gameboard;
