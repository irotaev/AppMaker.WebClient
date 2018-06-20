import {Component, OnInit} from '@angular/core';
import {AbstractSettingsEditorComponent} from '../Abstract/abstract-settings-editor-component';

@Component({
    selector: 'am-flexbox.editorsettings',
    templateUrl: './flexbox.settingseditor.component.html',
    styleUrls: ['./flexbox.settingseditor.component.scss']
})
export class FlexboxSettingsEditorComponent extends AbstractSettingsEditorComponent implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() {
    }

}
