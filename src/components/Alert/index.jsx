import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Button from '../common/Button';
import Title from '../common/Title';
import { getLang } from '@utils';
import { get as _get } from 'lodash-es';

const Alert = (props) => {
    const { content, options = {}, onEvent } = props;
    const [dontShowChecked, setDontShowChecked] = useState(false);

    const keyboardEvent = useCallback((event) => {
        const { keyCode } = event;
        if (event.repeat) {
            return;
        }
        if (keyCode === 13) {
            event.preventDefault();
            handleButtonClick('ok');
        } else if (keyCode === 27) {
            event.preventDefault();
            handleButtonClick('close');
        }
    }, []);

    const preventDefault = useCallback((event) => {
        event.preventDefault();
    }, []);

    const {
        title,
        positiveButtonText,
        positiveButtonStyle,
        withDontShowAgain,
        withDontShowAgainText,
    } = useMemo(() => {
        return {
            title: props.title || getLang('General.alert_title', 'alert'),
            positiveButtonText: options.positiveButtonText || getLang('Buttons.course_done', 'ok'),
            positiveButtonStyle: options.positiveButtonStyle || {},
            withDontShowAgain: options.withDontShowAgain || false,
            withDontShowAgainText:
                options.withDontShowAgainText ||
                getLang('General.dont_show_again', 'don`t show again'),
        };
    }, [props.title, options]);

    const renderContent = useMemo(() => {
        try {
            if (typeof content === 'object') {
                return (
                    <div
                        className={`entry-modal-content entrylmsAlertContent`}
                        dangerouslySetInnerHTML={{
                            __html: content.outerHTML,
                        }}
                    />
                );
            } else if (typeof content === 'string') {
                return <div>{content}</div>;
            }
        } catch {
            return null;
        }
    }, [content]);

    const handleButtonClick = useCallback(
        (event) => {
            if (!onEvent) {
                return;
            }

            let value;
            if (typeof event === 'string') {
                value = event;
            } else {
                value = _get(event, 'target.dataset.value');
            }

            if (value === 'ok') {
                if (withDontShowAgain) {
                    onEvent({ dontShowChecked });
                } else {
                    onEvent(true);
                }
            } else {
                onEvent(false);
            }
        },
        [onEvent, withDontShowAgain, dontShowChecked]
    );

    const handleDontShowChecked = useCallback(() => {
        setDontShowChecked(!dontShowChecked);
    }, [dontShowChecked]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', keyboardEvent);
        document.addEventListener('touchmove', preventDefault, {
            passive: false,
        });
        return () => {
            document.body.style.overflow = 'auto';
            document.removeEventListener('keydown', keyboardEvent);
            document.removeEventListener('touchmove', preventDefault, {
                passive: false,
            });
        };
    }, [keyboardEvent, preventDefault]);

    return (
        <div className={'entry-modal-alert'}>
            <Title
                className={'entry-modal-title'}
                isClose
                onClose={handleButtonClick}
                btnValue={'close'}
            >
                {title}
            </Title>
            <div className={'entry-modal-contentView'}>
                <div className={'entry-modal-content'}>{renderContent}</div>
                <Button
                    className={'entry-modal-button'}
                    text={positiveButtonText}
                    style={positiveButtonStyle}
                    onClick={handleButtonClick}
                    btnValue={'ok'}
                />
                {withDontShowAgain && (
                    <div className={'entry-modal-checkBox'} onClick={handleDontShowChecked}>
                        <div
                            className={`entry-modal-checkDiv ${
                                dontShowChecked && 'entry-modal-checked'
                            }`}
                            style={{
                                width: 18,
                                height: 18,
                            }}
                        />
                        <span className={'entry-modal-label'}>{withDontShowAgainText}</span>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Alert;
