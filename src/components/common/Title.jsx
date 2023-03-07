import React, { Component, useMemo } from 'react';
import Button from './Button';

const Title = (props) => {
    const {
        className = 'entry-modal-entryLmsTitle',
        children,
        isClose,
        onClose,
        closeBtnValue = 'close',
    } = props;

    const closeButton = useMemo(() => {
        if (isClose !== false) {
            return (
                <Button
                    className="entry-modal-entryLmsClose"
                    onClick={onClose}
                    btnValue={closeBtnValue}
                />
            );
        }
        return null;
    }, [isClose, onClose]);

    return (
        <div className={className}>
            <div className="entry-modal-entryLmsText">{children}</div>
            {closeButton}
        </div>
    );
};

export default Title;
