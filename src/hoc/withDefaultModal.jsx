import React from 'react';
import ReactDOM from 'react-dom';
import Styles from '@styles/Modal.scss';

const eventSet = new Set();
const withDefaultModal = (WrappedComponent, argsList) => (...args) => {
    return new class {
        #container = null;
        #promise = null;
        constructor(props) {
            if (eventSet.size > 0) {
                for (let resolve of eventSet.values()) resolve();
                eventSet.clear();
            }
            const modal = document.querySelector('#EntryModal');
            if (modal) {
                this.#container = modal;
            } else {
                const body = document.querySelector('body');
                this.#container = document.createElement('div');
                this.#container.id = 'EntryModal';
                this.#container.className = Styles.modal;
                body.appendChild(this.#container);
            }
            return this.render(props);
        }

        handleEvent = (resolve) => (event) => {
            if (this.#container) {
                this.#container.remove();
            }
            eventSet.delete(resolve);
            resolve(event);
        };

        render(props) {
            if (this.#container) {
                return new Promise((resolve, reject) => {
                    eventSet.add(resolve);
                    ReactDOM.render(
                        <div className={Styles.box}>
                            <WrappedComponent
                                {...argsList.reduce((acc, key, i) => {
                                    acc[key] = props[i];
                                    return acc;
                                }, {})}
                                eventEmitter={this}
                                onEvent={this.handleEvent(resolve, reject)}
                            />
                        </div>,
                        this.#container
                    );
                });
            }
        }
    }(args);
};

export default withDefaultModal;
