import React from 'react';
import ReactDOM from 'react-dom';

const eventSet = new Set();
const withDefaultModal =
    (WrappedComponent, argsList) =>
    (...args) => {
        return new (class {
            #container = null;
            #promise = null;
            #isShow = true;
            constructor(props) {
                if (eventSet.size > 0) {
                    for (const resolve of eventSet.values()) {
                        resolve();
                    }
                    eventSet.clear();
                }
                const modal = document.querySelector('#EntryModal');
                if (modal) {
                    this.#container = modal;
                } else {
                    const body = document.querySelector('body');
                    this.#container = document.createElement('div');
                    this.#container.id = 'EntryModal';
                    this.#container.className = 'entry-modal-modal';
                    body.appendChild(this.#container);
                }
                return this.render(props);
            }

            handleEvent = (resolve, reject) => (event) => {
                if (this.#container) {
                    if (this.#container.remove) {
                        this.#container.remove();
                    } else {
                        this.#container.parentNode.removeChild(this.#container);
                    }
                }
                eventSet.delete(resolve);
                resolve(event);
            };

            render(props) {
                if (this.#container) {
                    return new Promise((resolve, reject) => {
                        eventSet.add(resolve);

                        const handleClose = () => {
                            this.#isShow = false;
                            runRender();
                        };

                        const onEvent = this.handleEvent(resolve, reject);
                        const runRender = () => {
                            ReactDOM.render(
                                <div className={'entry-modal-box'}>
                                    {this.#isShow && (
                                        <WrappedComponent
                                            {...argsList.reduce((acc, key, i) => {
                                                acc[key] = props[i];
                                                return acc;
                                            }, {})}
                                            eventEmitter={this}
                                            onEvent={(event) => {
                                                handleClose(event);
                                                onEvent(event);
                                            }}
                                        />
                                    )}
                                </div>,
                                this.#container
                            );
                        };

                        runRender();
                    });
                }
            }
        })(args);
    };

export default withDefaultModal;
