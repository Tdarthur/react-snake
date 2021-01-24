import React, { useState, useEffect } from 'react';

import Snake from './Snake';
import Food from './Food';

const Gameboard = ({ gridTemplate, snake, food }) => {
    return (
        <>
            <div
                className='game-board'
                style={{
                    gridTemplateRows: gridTemplate.rows,
                    gridTemplateColumns: gridTemplate.columns
                }}
            >
                <Snake snake={snake} />
                <Food food={food} />
            </div>
        </>
    );
};

export default Gameboard;
