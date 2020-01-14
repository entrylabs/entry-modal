import withReactModal from '@hoc/withReactModal';
import withDefaultModal from '@hoc/withDefaultModal';
import Alert from '@components/Alert';
import Confirm from '@components/Confirm';
import Prompt from '@components/Prompt';

export const alert = withDefaultModal(Alert, ['content', 'title', 'options']);
export const confirm = withDefaultModal(Confirm, ['content', 'title', 'options']);
export const prompt = withDefaultModal(Prompt, ['content', 'defaultValue', 'title', 'options']);
export { default as theme } from '@utils/Theme';

export const Component = {
    Alert: withReactModal(Alert),
    Confirm: withReactModal(Confirm),
    Prompt: withReactModal(Prompt),
};
