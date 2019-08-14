import {Component, ViewContainerRef} from '@angular/core';
import {IUniqueElement} from '../abstract/IUniqueElement';

export interface IComponent extends IUniqueElement {
  componentContainer: ViewContainerRef;
  component: Component;
}
