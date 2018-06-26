import {ComponentRef, Type} from '@angular/core';
import {DynamicComponent} from './dynamic.component';

export interface IComponentSetting {
    settingsEditorComponent: { type: Type<DynamicComponent>, settingsEditorComponent: ComponentRef<DynamicComponent> }[];
    isSettingsEditorShown: boolean;
}
