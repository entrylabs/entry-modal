import React, { useEffect, useCallback, useMemo } from 'react';
import Button from '../common/Button.jsx';
import Title from '../common/Title.jsx';
import { getLang } from '../../utils/index';
import { get as _get } from 'lodash-es';

const Confirm = (props) => {
    const { content, options = {}, onEvent } = props;

    const {
        title,
        negativeButtonText,
        positiveButtonText,
        negativeButtonValue = 'cancel',
        positiveButtonValue = 'ok',
        resultType = 'boolean',
    } = useMemo(() => {
        return {
            title: props.title || getLang('General.confirm_title', 'confirm'),
            negativeButtonText: options.negativeButtonText || getLang('Buttons.cancel', 'cancel'),
            positiveButtonText:
                options.positiveButtonText || getLang('Buttons.course_done', 'cancel'),
            negativeButtonValue: options.negativeButtonValue,
            positiveButtonValue: options.positiveButtonValue,
            resultType: options.resultType,
        };
    }, [props.title, options]);

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

            if (resultType === 'string') {
                onEvent(value);
                return;
            }

            onEvent(value === 'ok');
        },
        [onEvent]
    );

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
        } catch (e) {
            return null;
        }
    }, []);

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
        <div className={'entry-modal-confirm'}>
            <Title
                className={'entry-modal-title'}
                isClose
                onClose={handleButtonClick}
                closeBtnValue="close"
            >
                {title}
            </Title>
            <div className={'entry-modal-contentView'}>
                <div className={'entry-modal-content'}>{renderContent}</div>
                <div className={'entry-modal-button-group'}>
                    <Button
                        className={`entry-modal-button entry-modal-cancelButton`}
                        text={negativeButtonText}
                        onClick={handleButtonClick}
                        btnValue={negativeButtonValue}
                    />
                    <Button
                        className={'entry-modal-button'}
                        text={positiveButtonText}
                        onClick={handleButtonClick}
                        btnValue={positiveButtonValue}
                    />
                </div>
            </div>
        </div>
    );
};

export default Confirm;
