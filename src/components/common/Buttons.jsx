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
        alignCol = false,
    } = props;

    return (
        <div className={`${alignCol ? 'entry-modal-buttons-col' : ''}`}>
            {buttonInfos.map((button) => {
                return (
                    <Button
                        className={`entry-modal-button ${
                            button.isNegative ? 'entry-modal-cancelButton' : ''
                        }`}
                        text={button.text}
                        onClick={(event) => {
                            button.onClick && button.onClick();
                            defaultOnClick(event);
                        }}
                        btnValue={button.btnValue}
                    />
                );
            })}
        </div>
    );
};

export default Buttons;
