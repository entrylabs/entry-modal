import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.querySelector('body');

const withReactModal = (WrappedComponent) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.el = document.createElement('div');
            this.el.className = 'entry-modal-modal';
        }

        componentDidMount() {
            modalRoot.appendChild(this.el);
        }

        componentWillUnmount() {
            modalRoot.removeChild(this.el);
        }

        render() {
            return ReactDOM.createPortal(
                <div className={'entry-modal-box'}>
                    <WrappedComponent {...this.props} />
                </div>,
                this.el
            );
        }
    };
};

export default withReactModal;
