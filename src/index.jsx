import Alert from '@components/Alert';
import Confirm from '@components/Confirm';
import Prompt from '@components/Prompt';

import withDefaultModal from '@hoc/withDefaultModal';
export const alert = withDefaultModal(Alert, ['content', 'title', 'options']);
export const confirm = withDefaultModal(Confirm, ['content', 'title', 'options']);
export const prompt = withDefaultModal(Prompt, ['content', 'defaultValue', 'title', 'options']);
export { default as theme } from '@utils/Theme';

import withReactModal from '@hoc/withReactModal';
export const Component = {
    Alert: withReactModal(Alert),
    Confirm: withReactModal(Confirm),
    Prompt: withReactModal(Prompt),
};
