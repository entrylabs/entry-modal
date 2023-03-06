import React from 'react';
import { linkTo } from '@storybook/addon-links';
import Confirm from './index';
import '@styles/entry/index.scss';

export default {
    title: 'Confirm',
    component: Confirm,
};

export const EntryConfirm = () => (
    <Confirm
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

EntryConfirm.story = {
    name: 'default',
};
