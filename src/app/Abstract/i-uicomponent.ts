import {IComponent} from './i-component';
import {IDynamicComponent} from './i-dynamic-component';

export interface IUiComponent extends IComponent, IDynamicComponent {
}