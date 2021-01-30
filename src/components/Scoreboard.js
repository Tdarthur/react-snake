import React, { useState } from 'react';
import { connect } from 'react-redux';

const HIGH_SCORE_KEY = 'snakeHighScore';

const ScoreBoard = ({ score }) => {
    const [highScore, setHighScore] = useState(
        localStorage.getItem(HIGH_SCORE_KEY)
    );

    if (score > highScore) {
        localStorage.setItem(HIGH_SCORE_KEY, score);
        setHighScore(score);
    }

    return (
        <div id='scoreboard'>
            <div id='high_score'>
                <div className='score-title'>High Score</div>
                <div className='score'>
                    <span className='highlight'>{highScore}</span>
                </div>
            </div>
            <div id='spacer'></div>
            <div id='current_score'>
                <div className='score-title'>Score</div>
                <div className='score'>
                    <span className='highlight'>{score}</span>
                </div>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        score:
            state.gameState.board.snake.length -
            state.gameState.settings.snakeStartLength
    };
}

export default connect(mapStateToProps, null)(ScoreBoard);
