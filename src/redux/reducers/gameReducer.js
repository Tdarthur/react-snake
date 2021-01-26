import initialState, { initializeGameState } from './initialState';

import gameUtils from './gameUtils';

import * as types from '../actions/actionTypes';

export default function gameReducer(state = initialState.gameState, action) {
    switch (action.type) {
        case types.START_NEW_GAME:
            return initializeGameState(state.settings);
        case types.UPDATE_SETTINGS:
            return { ...state, settings: action.newSettings };
        case types.UPDATE_STATUS:
            return { ...state, status: action.newStatus };
        case types.MOVE_SNAKE:
            return gameUtils.moveSnake(state);
        case types.HANDLE_GAME_INPUT:
            return gameUtils.handleGameInput(state, action.inputAction);
        default:
            return state;
    }
}
