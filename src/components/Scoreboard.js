import React from 'react';
import { connect } from 'react-redux';

const ScoreBoard = ({ score }) => (
    <div className='score-board'>
        <div className='score-title'>Score</div>
        <div className='score'>{score}</div>
    </div>
);

function mapStateToProps(state) {
    return {
        score:
            state.gameState.board.snake.length -
            state.gameState.settings.snakeStartLength
    };
}

export default connect(mapStateToProps, null)(ScoreBoard);
