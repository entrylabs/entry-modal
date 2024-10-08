import React, { useEffect, useState } from 'react';

const ProgressBar = (props) => {
    const { percent, preset = 'default' } = props;
    const [roundPercent, setRoundPercent] = useState(0);
    const overHalf = roundPercent > 50;

    useEffect(() => {
        if (preset === 'full') {
            setRoundPercent(100);
        } else if (preset === 'fail') {
            setRoundPercent(Math.round(0));
        } else {
            setRoundPercent(Math.round(percent));
        }
    }, [preset, percent]);

    return (
        <div className={`entry-modal-progressbar-wrapper`}>
            <progress className={`entry-modal-progressbar`} value={roundPercent} max="100" />
            <div
                className={`entry-modal-progressbar-text ${
                    overHalf ? 'entry-modal-text-invert' : ''
                }`}
            >
                {preset === 'fail' ? '!' : `${roundPercent}%`}
            </div>
        </div>
    );
};
export default ProgressBar;
