import {IComponent} from './i-component';
import {ComponentRef, Type} from '@angular/core';

export interface IComponentSetting {
    settingsEditorComponent: { type: Type<IComponent>, settingsEditorComponent: ComponentRef<IComponent> }[];
    isSettingsEditorShown: boolean;
}
