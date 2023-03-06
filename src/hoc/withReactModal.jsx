import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.querySelector('body');

const withReactModal = (WrappedComponent) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.el = document.createElement('div');
            this.el.className = 'entry-modal-modal';
            this.state = {
                isShow: true,
            };
        }

        componentDidMount() {
            modalRoot.appendChild(this.el);
        }

        componentWillUnmount() {
            modalRoot.removeChild(this.el);
        }

        render() {
            const { isShow } = this.state;
            return ReactDOM.createPortal(
                <div className={'entry-modal-box'}>
                    {isShow && (
                        <WrappedComponent
                            {...this.props}
                            onEvent={(event) => {
                                this.setState({
                                    isShow: false,
                                });
                                if (this.onEvent) {
                                    this.onEvent(event);
                                }
                            }}
                        />
                    )}
                </div>,
                this.el
            );
        }
    };
};

export default withReactModal;
