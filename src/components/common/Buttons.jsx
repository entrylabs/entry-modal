import React from 'react';
import Button from './Button.jsx';

const Buttons = (props) => {
    const {
        buttonInfos = [
            {
                text: '',
                onClick,
                isNegative: false,
                btnValue: 'ok',
            },
        ],
        defaultOnClick,
    } = props;

    return buttonInfos.map((button) => {
        return (
            <Button
                className={`entry-modal-button ${
                    button.isNegative ? 'entry-modal-cancelButton' : ''
                }`}
                text={button.text}
                onClick={button.onClick ?? defaultOnClick}
                btnValue={button.btnValue}
            />
        );
    });
};

export default Buttons;
