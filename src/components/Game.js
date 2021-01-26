import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Gameboard from './Gameboard';

import { moveSnake, handleGameInput } from '../redux/actions/gameActions';

import { gameStatus } from './App';

export const refreshIntervals = {
    SLOW: 0.1,
    NORMAL: 0.05,
    FAST: 0.025
};

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
const SPECIAL_KEY_CODES = ['Space', 'ShiftLeft'];

const Game = ({ refreshInterval, status, moveSnake, handleGameInput }) => {
    console.log(refreshInterval);
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
        }, refreshInterval * 1000);
        return () => {
            clearInterval(interval);
        };
    });

    document.onkeydown = ({ code }) => {
        if (
            ACTION_KEY_CODES.includes(code) &&
            actionQueue.length < ACTION_QUEUE_SIZE
        ) {
            const newActionQueue = [...actionQueue];
            newActionQueue.push({ code });
            setActionQueue(newActionQueue);
        } else if (SPECIAL_KEY_CODES.includes(code)) {
            handleGameInput({ code, down: true });
        }
    };

    document.onkeyup = ({ code }) => {
        if (SPECIAL_KEY_CODES.includes(code)) {
            handleGameInput({ code, down: false });
        }
    };

    return (
        <>
            <Gameboard />
        </>
    );
};

function mapStateToProps(state) {
    return {
        refreshInterval: state.gameState.refreshInterval,
        status: state.gameState.status
    };
}

const mapDispatchToProps = {
    moveSnake,
    handleGameInput
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
