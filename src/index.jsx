import withDefaultModal from '@hoc/withDefaultModal.jsx';
import Alert from '@components/Alert/index.jsx';
import Confirm from '@components/Confirm/index.jsx';
import Progress from '@components/Progress/index.jsx';
import Prompt from '@components/Prompt/index.jsx';
import AlertConteiner from '@containers/Alert.jsx';
import ConfirmConteiner from '@containers/Confirm.jsx';
import ProgressContainer from '@containers/Progress.jsx';
import PromptConteiner from '@containers/Prompt.jsx';

export const alert = withDefaultModal(Alert, ['content', 'title', 'options']);
export const confirm = withDefaultModal(Confirm, ['content', 'title', 'options']);
export const progress = withDefaultModal(Progress, [
    'title',
    'stepTitle',
    'contentImage',
    'content',
    'buttonInfos',
    'options',
]);
export const prompt = withDefaultModal(Prompt, ['content', 'defaultValue', 'title', 'options']);

export const Component = {
    Alert: AlertConteiner,
    Confirm: ConfirmConteiner,
    Prompt: PromptConteiner,
    Progress: ProgressContainer,
};
