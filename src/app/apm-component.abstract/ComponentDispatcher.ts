import {IComponent} from './IComponent';
import {ComponentFactoryResolver, ComponentRef, Injectable, Type} from '@angular/core';
import {UniqueStoreElement} from '../abstract/unique-store-element';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ComponentDispatcher {
  private readonly _components: UniqueStoreElement<ComponentRef<IComponent>>[] = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  public addComponent(componentTypeLink: Type<any>, to: IComponent) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(componentTypeLink);
    const component = to.componentContainer.createComponent<IComponent>(factory);

    this._components.push(new UniqueStoreElement<ComponentRef<IComponent>>(component, component.instance.id));
  }

  public getComponent(uniqueId: number) {
    return _.find(this._components, x => x.uniqueId === uniqueId);
  }

  public getComponentByIndex(index: number) {
    return this._components[index];
  }
}
