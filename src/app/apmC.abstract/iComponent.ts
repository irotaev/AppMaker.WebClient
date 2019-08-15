import {Component, ViewContainerRef} from '@angular/core';
import {IUniqueElement} from '../abstract/IUniqueElement';
import {Store} from '../store.abstract/store';

export interface IComponent extends IUniqueElement {
  componentContainer: ViewContainerRef;
  component: Component;
  componentSettings: Store;
}
