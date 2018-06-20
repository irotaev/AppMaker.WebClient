import {ISettingsEditorComponent} from './i-settingse-editor-component';
import {Component, ComponentRef} from '@angular/core';
import {IComponent} from './i-component';

@Component({})
export abstract class AbstractSettingsEditorComponent implements ISettingsEditorComponent {
    component: ComponentRef<IComponent>;
    uiComponent: ComponentRef<IComponent> = null;
}
