import {IComponent} from './IComponent';
import {Component, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentDispatcher {
  public Components: IComponent[] = [];

  public setRootComponent(component: IComponent) {
    if (this.Components.length > 0) {
      throw new Error('Component list not empty');
    }

    this.Components.push(component);
  }

  public addComponent(component: IComponent, to: IComponent) {
    this.Components.push(component);
  }
}
