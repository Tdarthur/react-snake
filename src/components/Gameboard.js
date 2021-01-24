import React from 'react';
import * as cellTypes from '../cellTypes';

const CELL_TYPE_CLASS_NAMES = {};
CELL_TYPE_CLASS_NAMES[cellTypes.EMPTY] = 'empty-cell';
CELL_TYPE_CLASS_NAMES[cellTypes.SNAKE] = 'snake-cell';
CELL_TYPE_CLASS_NAMES[cellTypes.FOOD] = 'food-cell';

const Gameboard = ({ board }) => {
    const { width, height } = board;

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
                                className={
                                    'cell ' + CELL_TYPE_CLASS_NAMES[cell]
                                }
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
