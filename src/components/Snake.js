import React from 'react';

const Snake = ({ snake }) => {
    const snakeClass = snake.alive ? 'snake-cell' : 'dead-snake-cell';

    let snakeCells = [];
    let currentNode = snake.tail;
    while (currentNode) {
        const { x, y } = currentNode.position;
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

        currentNode = currentNode.previous;
    }

    return <>{snakeCells}</>;
};

export default Snake;
