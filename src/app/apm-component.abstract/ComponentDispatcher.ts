import {IComponent} from './IComponent';
import {ComponentFactoryResolver, ComponentRef, Injectable, Type} from '@angular/core';
import {UniqueStoreElement} from '../abstract/unique-store-element';

@Injectable({
  providedIn: 'root'
})
export class ComponentDispatcher {
  public components: UniqueStoreElement<ComponentRef<IComponent>>[] = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  public addComponent(componentTypeLink: Type<any>, to: IComponent) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(componentTypeLink);
    const component = to.componentContainer.createComponent<IComponent>(factory);

    this.components.push(new UniqueStoreElement<ComponentRef<IComponent>>(component, component.instance.id));
  }
}
