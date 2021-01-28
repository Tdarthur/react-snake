import * as types from './actionTypes';

export function startNewGame() {
    return { type: types.START_NEW_GAME };
}

export function updateSettings(changedSettings) {
    return { type: types.UPDATE_SETTINGS, changedSettings };
}

export function updateStatus(newStatus) {
    return { type: types.UPDATE_STATUS, newStatus };
}

export function moveSnake() {
    return { type: types.MOVE_SNAKE };
}

export function handleGameInput(inputAction) {
    return { type: types.HANDLE_GAME_INPUT, inputAction };
}
