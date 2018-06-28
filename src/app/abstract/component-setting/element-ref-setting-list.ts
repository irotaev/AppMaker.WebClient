import {ElementRefSetting} from './element-ref-setting';
import {NameValuePair} from './name-value-pair';

/**
 * List of element with property editor general settings
 */
export class ElementRefSettingList {
    private readonly _elementRefSettings: ElementRefSetting[] = [];

    /**
     * Add element for setting
     * @param el
     * @param id
     */
    public addElementRefSetting(elRefSet: ElementRefSetting) {
        if (this._elementRefSettings.find(e => e.id === elRefSet.id)) {
            throw new Error(`Id: ${elRefSet.id} is already exists`);
        }

        this._elementRefSettings.push(elRefSet);
    }

    public addElementStyle(id: string, pair: NameValuePair) {
        const elSet = this._elementRefSettings.find(e => e.id === id);

        if (elSet == null) {
            throw new Error(`No element with current id ${id}`);
        }

        elSet.addStyleSetting(pair);
    }
}
