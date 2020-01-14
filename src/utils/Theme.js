import EntryAlertStyle from '@styles/entry/Alert.scss';
import EntryConfirmStyle from '@styles/entry/Confirm.scss';
import EntryPromptStyle from '@styles/entry/Prompt.scss';
import LineAlertStyle from '@styles/line/Alert.scss';
import LineConfirmStyle from '@styles/line/Confirm.scss';
import LinePromptStyle from '@styles/line/Prompt.scss';

class Theme {
    constructor() {
        this._type = 'entry';
        this.styles = {
            entry: {
                Alert: EntryAlertStyle,
                Confirm: EntryConfirmStyle,
                Prompt: EntryPromptStyle,
            },
            line: {
                Alert: LineAlertStyle,
                Confirm: LineConfirmStyle,
                Prompt: LinePromptStyle,
            },
        };
    }

    getStyle(str = 'popup') {
        if (this.styles[this.type] && this.styles[this.type][str]) {
            return this.styles[this._type][str];
        } else {
            return EntryAlertStyle;
        }
    }

    setType(type = 'entry') {
        this.type = type;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        if (value) {
            this._type = value;
        }
    }
}

export default new Theme();
