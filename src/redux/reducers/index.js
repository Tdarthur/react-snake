import { combineReducers } from 'redux';
import gameState from './gameReducer';

const rootReducer = combineReducers({
    gameState
});

export default rootReducer;
