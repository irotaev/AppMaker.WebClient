import {ComponentRef} from '@angular/core';
import {IComponent} from './i-component';

export interface IDynamicComponent {
    component: ComponentRef<IComponent>;
}
