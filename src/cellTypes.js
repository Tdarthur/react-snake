export const EMPTY = 0;
export const FOOD = 1;
export const SNAKE_HEAD = 2;
export const SNAKE_LEFT = 3;
export const SNAKE_RIGHT = 4;
export const SNAKE_UP = 5;
export const SNAKE_DOWN = 6;

export const isSnake = (cellType) =>
    cellType === SNAKE_HEAD ||
    cellType === SNAKE_LEFT ||
    cellType === SNAKE_RIGHT ||
    cellType === SNAKE_UP ||
    cellType === SNAKE_DOWN;
