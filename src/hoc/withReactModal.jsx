import React, { Fragment, Component, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

const withReactModal = (WrappedComponent) => (props) => {
    const { isShow } = props;
    const [modalEl, setModalEl] = useState(null);

    useEffect(() => {
        const modalRoot = document.querySelector('body');
        if (!modalEl) {
            const el = document.createElement('div');
            el.className = 'entry-modal-modal';
            setModalEl(el);
        }
        if (isShow) {
            modalRoot.appendChild(modalEl);
            return () => {
                if (modalEl) {
                    modalRoot.removeChild(modalEl);
                }
            };
        }
    }, [isShow, modalEl]);

    if (!isShow || !modalEl) {
        return null;
    }

    return ReactDOM.createPortal(
        <div className={'entry-modal-box'}>
            <WrappedComponent {...props} />
        </div>,
        modalEl
    );
};

export default withReactModal;
