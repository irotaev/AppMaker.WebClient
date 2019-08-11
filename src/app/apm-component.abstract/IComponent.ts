import {Component, ViewContainerRef} from '@angular/core';
import {IUnique} from '../abstract/iUnique';

export interface IComponent extends IUnique {
  componentContainer: ViewContainerRef;
  component: Component;
}
