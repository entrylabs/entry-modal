import withDefaultModal from '@hoc/withDefaultModal';
import Alert from '@components/Alert';
import Confirm from '@components/Confirm';
import Prompt from '@components/Prompt';
import AlertConteiner from '@containers/Alert';
import ConfirmConteiner from '@containers/Confirm';
import PromptConteiner from '@containers/Prompt';

export const alert = withDefaultModal(Alert, ['content', 'title', 'options']);
export const confirm = withDefaultModal(Confirm, ['content', 'title', 'options']);
export const prompt = withDefaultModal(Prompt, ['content', 'defaultValue', 'title', 'options']);

export const Component = {
    Alert: AlertConteiner,
    Confirm: ConfirmConteiner,
    Prompt: PromptConteiner,
};
