import React from 'react';
import { connect } from 'react-redux';

import { gameStatus } from './App';
import { updateStatus } from '../redux/actions/gameActions';

import Snake from './Snake';
import Food from './Food';

const GameBoard = ({ gameState, updateStatus }) => {
    const { status, board, gridTemplate } = gameState;

    const handleBoardClick = () => {
        if (status === gameStatus.PLAYING) {
            updateStatus(gameStatus.PAUSED);
        } else if (
            status === gameStatus.PAUSED ||
            status === gameStatus.WAITING
        ) {
            updateStatus(gameStatus.PLAYING);
        }
    };

    return (
        <>
            <div className='game'>
                <div
                    className='overlay-container interactable'
                    id='game_board'
                    style={{
                        gridTemplateRows: gridTemplate.rows,
                        gridTemplateColumns: gridTemplate.columns
                    }}
                    onClick={handleBoardClick}
                >
                    <Snake board={board} status={status} />
                    <Food food={board.food} />
                    {status !== gameStatus.PLAYING ? (
                        <div className='overlay' id='game_overlay'>
                            <button id='overlay_button'>
                                {status === gameStatus.WAITING ? (
                                    <>
                                        <span className='text-special'>
                                            Click
                                        </span>{' '}
                                        or press{' '}
                                        <span className='text-special'>
                                            'Enter'
                                        </span>{' '}
                                        to Play
                                    </>
                                ) : status === gameStatus.PAUSED ? (
                                    <span className='text-special'>Paused</span>
                                ) : (
                                    <>
                                        Game Over
                                        <br />
                                        Press{' '}
                                        <span className='text-special'>
                                            'R'
                                        </span>{' '}
                                        to restart
                                    </>
                                )}
                            </button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </>
    );
};

function mapStateToProps(state) {
    return {
        gameState: state.gameState
    };
}

const mapDispatchToProps = {
    updateStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
