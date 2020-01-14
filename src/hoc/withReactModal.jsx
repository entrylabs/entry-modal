import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Styles from '@styles/Modal.scss';

const modalRoot = document.querySelector('body');

const withReactModal = (WrappedComponent) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.el = document.createElement('div');
            this.el.className = Styles.modal;
        }

        componentDidMount() {
            modalRoot.appendChild(this.el);
        }

        componentWillUnmount() {
            modalRoot.removeChild(this.el);
        }

        render() {
            console.log(ReactDOM);
            return ReactDOM.createPortal(
                <div className={Styles.box}>
                    <WrappedComponent {...this.props} />
                </div>,
                this.el
            );
        }
    };
};

export default withReactModal;
