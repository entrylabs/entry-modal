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
        <div className={`${alignCol ? 'entry-modal-buttons-col' : 'entry-modal-buttons-row'}`}>
            {buttonInfos.map((button, idx) => {
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
                        key={`button_${idx}`}
                    />
                );
            })}
        </div>
    );
};

export default Buttons;
