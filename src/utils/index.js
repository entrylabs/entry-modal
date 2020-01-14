import { get } from 'lodash-es';

export const getLang = (key = '', defaultValue) => {
    const { Lang = {} } = window || {};
    return get(Lang, key, defaultValue || key);
};
