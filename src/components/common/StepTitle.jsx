import React, { Component, useMemo } from 'react';

const StepTitle = (props) => {
    const { className = 'entry-modal-stepTitle', titles = [], select = 0 } = props;

    return (
        <div className={className}>
            {titles.map((title, idx) => {
                const isLast = idx + 1 === titles.length;
                const isSelected = idx === select;
                return (
                    <>
                        <div
                            className={`entry-modal-stepTitle-title ${
                                isSelected ? 'entry-modal-stepTitle-selected' : ''
                            }`}
                        >
                            {title}
                        </div>
                        {!isLast && <div className={`entry-modal-stepTitle-divider`} />}
                    </>
                );
            })}
        </div>
    );
};

export default StepTitle;
