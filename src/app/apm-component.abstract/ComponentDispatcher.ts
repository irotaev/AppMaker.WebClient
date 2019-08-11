import {IComponent} from './IComponent';
import {ComponentFactoryResolver, ComponentRef, Injectable, Type} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentDispatcher {
  public components: ComponentRef<IComponent>[] = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {

  }

  public addComponent(componentTypeLink: Type<any>, to: IComponent) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(componentTypeLink);
    const component = to.componentContainer.createComponent(factory);

    this.components.push(component);
  }
}
