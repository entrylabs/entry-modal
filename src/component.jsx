import withReactModal from '@hoc/withReactModal';

import Alert from '@components/Alert';
import Confirm from '@components/Confirm';
import Prompt from '@components/Prompt';

export const Component = {
    Alert: withReactModal(Alert),
    Confirm,
    Prompt,
};
