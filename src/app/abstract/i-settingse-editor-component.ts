import {ComponentRef} from '@angular/core';
import {DynamicComponent} from './dynamic.component';

export interface ISettingsEditorComponent {
    uiComponent: ComponentRef<DynamicComponent>;
}
