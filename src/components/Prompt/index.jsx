import React, { Component } from 'react';
import Button from '../common/Button';
import Title from '../common/Title';
import { getLang } from '@utils';

class Prompt extends Component {
    constructor(props) {
        super(props);
        this.inputBox = React.createRef();
    }

    componentDidMount() {
        document.body.style.overflow = 'hidden';
        document.addEventListener('touchmove', this.preventDefault, {
            passive: false,
        });
        document.addEventListener('keyup', this.keyboardEvent);
        requestAnimationFrame(() => {
            if (this.inputBox.current) {
                this.inputBox.current.focus();
            }
        });
    }

    componentWillUnmount() {
        document.body.style.overflow = 'auto';
        document.removeEventListener('touchmove', this.preventDefault, {
            passive: false,
        });
        document.removeEventListener('keyup', this.keyboardEvent);
    }

    keyboardEvent = (e) => {
        const { keyCode } = e;
        if (e.repeat) {
            return;
        }
        if (keyCode === 13) {
            e.preventDefault();
            this.handleButtonClick('ok');
        } else if (keyCode === 27) {
            e.preventDefault();
            this.handleButtonClick('cancel');
        }
    };

    preventDefault(e) {
        e.preventDefault();
    }

    handleButtonClick(event) {
        const { onEvent } = this.props;
        if (!onEvent) {
            return;
        }
        if (event === 'ok') {
            onEvent(this.inputBox.current.value);
        } else {
            onEvent(null);
        }
    }

    createContent(content) {
        let view = null;
        try {
            if (typeof content === 'object') {
                view = (
                    <div
                        className={`entry-modal-content entrylmsAlertContent`}
                        dangerouslySetInnerHTML={{
                            __html: content.outerHTML,
                        }}
                    />
                );
            } else if (typeof content === 'string') {
                view = <div>{content}</div>;
            }
        } finally {
            return view;
        }
    }

    render() {
        const {
            title = getLang('General.prompt_title', 'prompt'),
            defaultValue,
            content,
            options = {},
        } = this.props;
        const {
            negativeButtonText = getLang('Buttons.cancel', 'cancel'),
            positiveButtonText = getLang('Buttons.course_done', 'ok'),
            placeholder = '',
        } = options;
        return (
            <div className={'entry-modal-prompt'}>
                <Title
                    className={'entry-modal-title'}
                    isClose
                    onClose={() => this.handleButtonClick('close')}
                >
                    {title}
                </Title>
                <div className={'entry-modal-contentView'}>
                    <div className={'entry-modal-content'}>{this.createContent(content)}</div>
                    <div>
                        <input
                            className={'entry-modal-prompt-input'}
                            ref={this.inputBox}
                            type="text"
                            placeholder={placeholder}
                            defaultValue={defaultValue}
                            autoFocus={true}
                        />
                    </div>
                    <div className={'entry-modal-button-group'}>
                        <Button
                            className={`entry-modal-button entry-modal-cancelButton`}
                            text={negativeButtonText}
                            onClick={() => this.handleButtonClick('cancel')}
                        />
                        <Button
                            className={'entry-modal-button'}
                            text={positiveButtonText}
                            onClick={() => this.handleButtonClick('ok')}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Prompt;
