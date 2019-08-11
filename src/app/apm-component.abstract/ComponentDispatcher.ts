import {IComponent} from './IComponent';
import {ComponentFactoryResolver, Injectable, Type} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentDispatcher {
  public components: IComponent[] = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {

  }

  // public setRootComponent(component: IComponent) {
  //   if (this.components.length > 0) {
  //     throw new Error('Component list not empty');
  //   }
  //
  //   this.Components.push(component);
  // }

  public addComponent(componentTypeLink: Type<any>, to: IComponent) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(componentTypeLink);
    const component = to.componentContainer.createComponent(factory);

    this.components.push(component.instance);
  }
}
