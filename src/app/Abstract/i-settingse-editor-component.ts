import {IComponent} from './i-component';
import {IDynamicComponent} from './i-dynamic-component';
import {ComponentRef} from '@angular/core';

export interface ISettingsEditorComponent extends IComponent, IDynamicComponent {
    uiComponent: ComponentRef<IComponent>;
}