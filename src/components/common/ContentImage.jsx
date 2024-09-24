import React, { useEffect, useState } from 'react';
import { IMAGE_TYPES } from '../../constants';

const ContentImage = (props) => {
    const { imageType } = props;
    const [currentName, setCurrentName] = useState(undefined);

    useEffect(() => {
        if (IMAGE_TYPES.includes(imageType)) {
            setCurrentName(imageType);
        } else {
            console.log('ERROR: not supported imageType.');
        }
    }, [imageType]);

    return (
        currentName && (
            <div
                className={`entry-modal-contentImage entry-modal-img_${currentName}`}
                alt={imageType}
            />
        )
    );
};
export default ContentImage;
