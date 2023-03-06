import React, { useCallback, useMemo } from 'react';

const Button = (props) => {
    const { style, className, onClick, onMouseDown, children, text, btnValue } = props;

    const handleOnClick = useCallback(
        (event) => {
            if (onClick) {
                onClick(event);
            }
        },
        [onClick]
    );

    const handleOnMouseDown = useCallback(
        (event) => {
            if (onMouseDown) {
                onMouseDown(event);
            }
        },
        [onMouseDown]
    );

    const buttonContent = useMemo(() => {
        if (children) {
            return children;
        } else if (text) {
            return text;
        }
        return null;
    }, [children, text]);

    return (
        <div
            style={style}
            className={`entry-modal-button ${className}`}
            onClick={handleOnClick}
            onMouseDown={handleOnMouseDown}
            data-value={btnValue}
        >
            {buttonContent}
        </div>
    );
};
export default Button;
