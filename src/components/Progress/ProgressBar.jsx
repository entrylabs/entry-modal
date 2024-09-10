import React from 'react';

const ProgressBar = (props) => {
    const { percent } = props;
    const roundPercent = Math.round(percent);
    const overHalf = roundPercent > 50;

    return (
        <div className={`entry-modal-progressbar-wrapper`}>
            <progress className={`entry-modal-progressbar`} value={roundPercent} max="100" />
            <div
                className={`entry-modal-progressbar-text ${
                    overHalf ? 'entry-modal-text-invert' : ''
                }`}
            >
                {roundPercent}%
            </div>
        </div>
    );
};
export default ProgressBar;
