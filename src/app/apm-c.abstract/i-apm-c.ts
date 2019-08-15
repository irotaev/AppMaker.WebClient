import {ViewContainerRef} from '@angular/core';
import {IUniqueElement} from '../abstract/i-unique-element';
import {ComponentSettingsStore} from '../store/component-settings.store';

export interface IApmC extends IUniqueElement {
  childComponentsContainer: ViewContainerRef;
  componentSettings: ComponentSettingsStore;
}
