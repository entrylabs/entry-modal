import React, { Component } from 'react';
import Button from './common/Button';
import Title from './common/Title';
import Theme from '@utils/Theme';
import { getLang } from '@utils';

class Prompt extends Component {
    constructor(props) {
        super(props);
        this.inputBox = React.createRef();
        this.setTheme(props);
    }

    componentDidMount() {
        document.body.style.overflow = 'hidden';
        document.addEventListener('touchmove', this.preventDefault, {
            passive: false,
        });
        document.addEventListener('keyup', this.keyboardEvent);
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

    setTheme({ theme = 'entry' }) {
        Theme.setType(theme);
        this.theme = Theme.getStyle('Prompt');
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
                        className={`${Style.content} entrylmsAlertContent`}
                        dangerouslySetInnerHTML={{
                            __html: content.outerHTML,
                        }}
                    />
                );
            } else if (typeof content === 'string') {
                view = <div>{content}</div>;
            }
        } catch (e) {}

        return view;
    }

    render() {
        const {
            title = getLang('General.prompt_title', '답변'),
            defaultValue,
            content,
            options = {},
        } = this.props;
        const {
            negativeButtonText = getLang('Buttons.cancel'),
            positiveButtonText = getLang('Buttons.course_done'),
            placeholder = getLang('General.prompt_placeholder', ''),
        } = options;
        return (
            <div className={this.theme.prompt}>
                <Title
                    className={this.theme.title}
                    isClose
                    onClose={() => this.handleButtonClick('close')}
                >
                    {title}
                </Title>
                <div className={this.theme.contentView}>
                    <div className={this.theme.content}>{this.createContent(content)}</div>
                    <div>
                        <input
                            ref={this.inputBox}
                            type="text"
                            placeholder={placeholder}
                            defaultValue={defaultValue}
                        />
                    </div>
                    <div>
                        <Button
                            className={`${this.theme.button} ${this.theme.cancelButton}`}
                            text={negativeButtonText}
                            onClick={() => this.handleButtonClick('cancel')}
                        />
                        <Button
                            className={this.theme.button}
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
