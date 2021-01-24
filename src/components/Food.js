import React from 'react';

const Food = ({ food }) => (
    <div
        className={'food-cell'}
        style={{
            gridRow: `${food.y + 1} / ${food.y + 2}`,
            gridColumn: `${food.x + 1} / ${food.x + 2}`
        }}
    ></div>
);

export default Food;
