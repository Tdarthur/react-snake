import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
    moveSnake,
    handleGameInput,
    updateSettings
} from '../redux/actions/gameActions';

import { gameStatus } from './App';
import ScoreBoard from './Scoreboard';
import GameBoard from './Gameboard';
import Settings from './Settings';

const ACTION_QUEUE_SIZE = 5;
const ACTION_KEY_CODES = [
    'KeyA',
    'KeyD',
    'KeyW',
    'KeyS',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
    'KeyR'
];
const SPECIAL_KEY_CODES = ['Space', 'ShiftLeft', 'Enter'];

const Game = ({
    settings,
    snakeSpeed,
    status,
    updateSettings,
    moveSnake,
    handleGameInput
}) => {
    const [actionQueue, setActionQueue] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (status === gameStatus.PLAYING) {
                const action = actionQueue.shift();
                if (action) {
                    handleGameInput(action);
                }

                moveSnake();
            }
        }, 1000 / snakeSpeed);
        return () => {
            clearInterval(interval);
        };
    });

    document.onkeydown = ({ code }) => {
        if (
            ACTION_KEY_CODES.includes(code) &&
            actionQueue.length < ACTION_QUEUE_SIZE
        ) {
            if (code !== 'KeyR' && status === gameStatus.PLAYING) {
                const newActionQueue = [...actionQueue];
                newActionQueue.push({ code });
                setActionQueue(newActionQueue);
            } else if (code === 'KeyR') {
                handleGameInput({ code });
                setActionQueue([]);
            }
        } else if (SPECIAL_KEY_CODES.includes(code)) {
            handleGameInput({ code, down: true });
        }
    };

    document.onkeyup = ({ code }) => {
        if (SPECIAL_KEY_CODES.includes(code)) {
            handleGameInput({ code, down: false });
        }
    };

    const toggleSettings = () => {
        const changedSettings = { show: !settings.show };
        updateSettings(changedSettings);
    };

    return (
        <>
            <ScoreBoard />
            <GameBoard />
            <div
                className='interactable'
                id='settings_dropdown'
                onClick={toggleSettings}
            >
                {(settings.show ? 'Hide' : 'Show') + ' Settings'}
            </div>
            {settings.show ? <Settings /> : <></>}
        </>
    );
};

function mapStateToProps(state) {
    return {
        settings: state.gameState.settings,
        snakeSpeed: state.gameState.board.snake.speed,
        status: state.gameState.status
    };
}

const mapDispatchToProps = {
    moveSnake,
    handleGameInput,
    updateSettings
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
