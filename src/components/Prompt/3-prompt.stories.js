import React from 'react';
import { linkTo } from '@storybook/addon-links';
import Prompt from './index';
import '@styles/entry/index.scss';

export default {
    title: 'Prompt',
    component: Prompt,
};

export const ToStorybook = () => (
    <Prompt
        content="내용"
        title="속성"
        options={{
            positiveButtonText: '확인하기',
            negativeButtonText: '취소하기',
        }}
        onEvent={(v) => {
            console.log(v);
        }}
    />
);

ToStorybook.story = {
    name: 'default',
};
