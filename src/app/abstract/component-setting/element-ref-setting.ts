import {ElementRef} from '@angular/core';
import {NameValuePair} from './name-value-pair';

export class ElementRefSetting {

    private readonly _styleSettings: NameValuePair[] = [];

    constructor(public elementRef: ElementRef, public id: string) {
    }

    public addStyleSetting(pair: NameValuePair) {

        const existsPair = this._styleSettings.find(p => p.name === pair.name);

        if (existsPair == null) {
            this._styleSettings.push(pair);
        } else {
            existsPair.value = pair.value;
        }
    }
}