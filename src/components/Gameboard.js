import React from 'react';
import { connect } from 'react-redux';

import Snake from './Snake';
import Food from './Food';

const Gameboard = ({ gameState }) => {
    const { status, board, gridTemplate } = gameState;
    return (
        <>
            <div
                className='game-board'
                style={{
                    gridTemplateRows: gridTemplate.rows,
                    gridTemplateColumns: gridTemplate.columns
                }}
            >
                <Snake board={board} status={status} />
                <Food food={board.food} />
            </div>
        </>
    );
};

function mapStateToProps(state) {
    return {
        gameState: state.gameState
    };
}

export default connect(mapStateToProps, null)(Gameboard);
