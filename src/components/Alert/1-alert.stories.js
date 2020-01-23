import React from 'react';
import { linkTo } from '@storybook/addon-links';
import Alert from './index';
import '@styles/entry/index.scss';

export default {
    title: 'Alert',
    component: Alert,
};

export const EntryAlert = () => (
    <Alert
        content="내용"
        title="속성"
        options={{
            positiveButtonText: '확인하기',
        }}
    />
);

EntryAlert.story = {
    name: 'default',
};
