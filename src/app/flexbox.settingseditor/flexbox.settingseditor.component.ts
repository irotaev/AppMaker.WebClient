import {Component, OnInit} from '@angular/core';
import {AbstractSettingsEditorComponent} from '../Abstract/abstract-settings-editor-component';
import {FlexboxComponent} from '../flexbox/flexbox.component';

@Component({
    selector: 'am-flexbox.editorsettings',
    templateUrl: './flexbox.settingseditor.component.html',
    styleUrls: ['./flexbox.settingseditor.component.scss']
})
export class FlexboxSettingsEditorComponent extends AbstractSettingsEditorComponent implements OnInit {

    private _width: number;
    get width() {
        this._width = (this.uiComponent.instance as FlexboxComponent).width;

        return this._width;
    }
    set width(value) {
        (this.uiComponent.instance as FlexboxComponent).width = value;
    }

    private _height: number;
    get height() {
        this._height = (this.uiComponent.instance as FlexboxComponent).height;

        return this._height;
    }
    set height(value) {
        (this.uiComponent.instance as FlexboxComponent).height = value;
    }

    constructor() {
        super();
    }

    ngOnInit() {
    }

    onwidth(event) {
        console.log(event);
    }
}
