import React, { useState } from 'react';
import { connect } from 'react-redux';

import { updateSettings } from '../redux/actions/gameActions';

import { boardSize } from './App';
import Setting from './Setting';

import '../styles/Settings.css';

export const settingTypes = {
    TEXT: 1,
    NUMBER: 2,
    SELECT: 3,
    CHECKBOX: 4
};

const Settings = ({ settings, updateSettings }) => {
    const [tempSettings, setTempSettings] = useState({});

    const saveHandler = (formData) => {
        formData.preventDefault();
        const changedSettings = {};

        if (tempSettings.boardSize === '1') {
            changedSettings.boardSize = boardSize.SMALL;
        } else if (tempSettings.boardSize === '2') {
            changedSettings.boardSize = boardSize.MEDIUM;
        } else if (tempSettings.boardSize === '3') {
            changedSettings.boardSize = boardSize.LARGE;
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
            <form id='settings_form' onSubmit={saveHandler}>
                <Setting
                    settingType={settingTypes.SELECT}
                    name='boardSize'
                    labelText='Board Size'
                    onChange={handleSettingChange}
                >
                    <option></option>
                    <option value='1'>Small</option>
                    <option value='2'>Medium</option>
                    <option value='3'>Large</option>
                </Setting>
                <Setting
                    settingType={settingTypes.NUMBER}
                    name='snakeStartLength'
                    labelText='Snake Start Length'
                    min={1}
                    max={7}
                    onChange={handleSettingChange}
                ></Setting>
                <div className='save-wrapper'>
                    <button className='save-button' type='submit'>
                        Save Changes
                    </button>
                </div>
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
