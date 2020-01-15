import React, { Component } from 'react';
import Button from './common/Button';
import Title from './common/Title';
import { getLang } from '@utils';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dontShowChecked: false,
        };
    }

    componentDidMount() {
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', this.keyboardEvent);
        document.addEventListener('touchmove', this.preventDefault, {
            passive: false,
        });
    }

    componentWillUnmount() {
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', this.keyboardEvent);
        document.removeEventListener('touchmove', this.preventDefault, {
            passive: false,
        });
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
            this.handleButtonClick('close');
        }
    };

    preventDefault(e) {
        e.preventDefault();
    }

    handleButtonClick = (event) => {
        const { onEvent } = this.props;
        if (onEvent) {
            onEvent();
        }
    };

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

    handleDontShowChecked() {
        const { dontShowChecked } = this.state;
        this.setState({
            dontShowChecked: !dontShowChecked,
        });
    }

    render() {
        const {
            title = getLang('General.alert_title', '알림'),
            content,
            options = {},
        } = this.props;
        const {
            positiveButtonText = getLang('Buttons.course_done'),
            positiveButtonStyle = {},
            withDontShowAgain = false,
        } = options;
        const { dontShowChecked } = this.state;
        return (
            <div className={'entry-modal-alert'}>
                <Title
                    className={'entry-modal-title'}
                    isClose
                    onClose={() => this.handleButtonClick('close')}
                >
                    {title}
                </Title>
                <div className={'entry-modal-contentView'}>
                    <div className={'entry-modal-content'}>{this.createContent(content)}</div>
                    <Button
                        className={'entry-modal-button'}
                        text={positiveButtonText}
                        style={positiveButtonStyle}
                        onClick={() => this.handleButtonClick('ok')}
                    />
                    {withDontShowAgain && (
                        <div
                            className={'entry-modal-checkBox'}
                            onClick={() => {
                                this.handleDontShowChecked();
                            }}
                        >
                            <div
                                className={`entry-modal-checkDiv ${dontShowChecked &&
                                    'entry-modal-checked'}`}
                                style={{
                                    width: 18,
                                    height: 18,
                                }}
                            />
                            <span className={'entry-modal-label'}>
                                {getLang('General.dont_show_again')}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Alert;
