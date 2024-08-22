import React, { useEffect, useCallback, useMemo } from 'react';
import Button from '../common/Button.jsx';
import Title from '../common/Title.jsx';
import StepTitle from '../common/StepTitle.jsx';
import { getLang } from '../../utils/index';
import { get as _get } from 'lodash-es';

const Progress = (props) => {
    const {
        title,
        stepTitle = {
            titles: [],
            select: 0,
        },
        contentImage,
        content,
        buttons = [
            {
                text: '',
                onClick: () => {},
                style: 'positive',
            },
        ],
        options = {},
        onEvent,
    } = props;

    // const { title, negativeButtonText, positiveButtonText } = useMemo(() => {
    //     return {
    //         title: props.title || getLang('General.progress_title', 'progress'),
    //         negativeButtonText: options.negativeButtonText || getLang('Buttons.cancel', 'cancel'),
    //         positiveButtonText:
    //             options.positiveButtonText || getLang('Buttons.course_done', 'cancel'),
    //     };
    // }, [props.title, options]);

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
        <div className={'entry-modal-progress'}>
            <Title
                className={'entry-modal-title'}
                isClose
                onClose={handleButtonClick}
                closeBtnValue="close"
            >
                {title}
            </Title>
            <div className={'entry-modal-contentView'}>
                <StepTitle
                    className={'entry-modal-stepTitle'}
                    titles={stepTitle.titles}
                    select={stepTitle.select}
                />
                <div className={'entry-modal-content'}>{renderContent}</div>
                <div className={'entry-modal-button-group'}>
                    <Button
                        className={`entry-modal-button`}
                        text={buttons[0].text}
                        onClick={handleButtonClick}
                        btnValue={'cancel'}
                    />
                    {/* <Button
                        className={'entry-modal-button entry-modal-cancelButton'}
                        text={positiveButtonText}
                        onClick={handleButtonClick}
                        btnValue={'ok'}
                    /> */}
                </div>
            </div>
        </div>
    );
};

export default Progress;
