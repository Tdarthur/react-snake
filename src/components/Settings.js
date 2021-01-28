import React, { useState } from 'react';
import { connect } from 'react-redux';

import { updateSettings } from '../redux/actions/gameActions';

import { boardSize } from './App';

const Settings = ({ settings, updateSettings }) => {
    const [tempSettings, setTempSettings] = useState({});

    const saveHandler = (formData) => {
        formData.preventDefault();
        const changedSettings = {};

        if (tempSettings.boardSize === '1') {
            changedSettings.boardSize = boardSize.SMALL;
        } else if (tempSettings.boardSize === '3') {
            changedSettings.boardSize = boardSize.LARGE;
        } else {
            changedSettings.boardSize = boardSize.MEDIUM;
        }

        const newSnakeStartLength = parseInt(tempSettings.snakeStartLength);
        if (newSnakeStartLength) {
            changedSettings.snakeStartLength = newSnakeStartLength;
        }

        updateSettings(changedSettings);
    };

    const handleSettingChange = (key, value) => {
        const newTempSettings = { ...tempSettings };
        newTempSettings[key] = value;
        setTempSettings(newTempSettings);
    };

    return (
        <>
            <form onSubmit={saveHandler}>
                <select
                    onChange={(e) =>
                        handleSettingChange('boardSize', e.target.value)
                    }
                    name='boardSize'
                >
                    <option value='1'>Small</option>
                    <option value='2'>Medium</option>
                    <option value='3'>Large</option>
                </select>
                <input
                    type='text'
                    name='snakeStartLength'
                    onChange={(e) =>
                        handleSettingChange('snakeStartLength', e.target.value)
                    }
                />
                <input type='submit' />
            </form>
        </>
    );
};

function mapStateToProps(state) {
    return {
        settings: state.gameState.settings
    };
}

const mapDispatchToProps = {
    updateSettings
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
