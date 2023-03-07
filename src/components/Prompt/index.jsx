import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import Button from '../common/Button.jsx';
import Title from '../common/Title.jsx';
import { getLang } from '../../utils/index';
import { get as _get } from 'lodash-es';

const Prompt = (props) => {
    const { defaultValue, content, options = {}, onEvent } = props;
    const inputBox = useRef();

    const { title, negativeButtonText, positiveButtonText, placeholder } = useMemo(() => {
        return {
            title: props.title || getLang('General.prompt_title', 'prompt'),
            negativeButtonText: options.negativeButtonText || getLang('Buttons.cancel', 'cancel'),
            positiveButtonText: options.positiveButtonText || getLang('Buttons.course_done', 'ok'),
            placeholder: options.placeholder || '',
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

            if (value === 'ok') {
                onEvent(inputBox.current.value || '');
            } else {
                onEvent(null);
            }
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
        } catch {
            return null;
        }
    }, [content]);

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
        document.addEventListener('keyup', keyboardEvent);
        document.addEventListener('touchmove', preventDefault, {
            passive: false,
        });
        requestAnimationFrame(() => {
            if (inputBox.current) {
                inputBox.current.focus();
            }
        });
        return () => {
            document.body.style.overflow = 'auto';
            document.removeEventListener('keyup', keyboardEvent);
            document.removeEventListener('touchmove', preventDefault, {
                passive: false,
            });
        };
    });

    return (
        <div className={'entry-modal-prompt'}>
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
                <div>
                    <input
                        className={'entry-modal-prompt-input'}
                        ref={inputBox}
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
                        onClick={handleButtonClick}
                        btnValue={'cancel'}
                    />
                    <Button
                        className={'entry-modal-button'}
                        text={positiveButtonText}
                        onClick={handleButtonClick}
                        btnValue={'ok'}
                    />
                </div>
            </div>
        </div>
    );
};
export default Prompt;
