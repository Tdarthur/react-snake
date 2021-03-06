import React from 'react';

import { settingTypes } from './Settings';

const Setting = ({
    settingType,
    name,
    labelText,
    min,
    max,
    children,
    onChange
}) => {
    let settingElement;
    if (settingType === settingTypes.NUMBER) {
        settingElement = makeNumberInput(name, labelText, min, max, onChange);
    } else if (settingType === settingTypes.SELECT) {
        settingElement = makeSelect(name, labelText, children, onChange);
    }

    return <>{settingElement}</>;
};

function makeNumberInput(name, labelText, min, max, onChange) {
    return (
        <div className='setting'>
            <label name={name}>{labelText}:</label>
            <input
                className='interactable'
                type='number'
                min={min}
                max={max}
                name={name}
                onChange={(e) => onChange(name, e.target.value)}
            />
        </div>
    );
}

function makeSelect(name, labelText, children, onChange) {
    return (
        <div className='setting'>
            <label name={name}>{labelText}:</label>
            <select
                className='interactable'
                name={name}
                onChange={(e) => onChange(name, e.target.value)}
            >
                {children}
            </select>
        </div>
    );
}

export default Setting;
