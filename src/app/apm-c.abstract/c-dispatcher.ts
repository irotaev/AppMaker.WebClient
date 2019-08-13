import {IComponent} from './IComponent';
import {ComponentFactoryResolver, ComponentRef, Injectable, Type} from '@angular/core';

import {Store} from '../store.abstract/store';
import {UniqueElementService} from '../routine/unique-element.service';
import {StoreField} from '../store.abstract/store-field';
import {ApmComponent} from './apm-c';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ComponentDispatcher {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private _uniqueElementService: UniqueElementService) {

    this._componentStore = new Store(_uniqueElementService);
    const componentsField = new StoreField<Array<ComponentRef<IComponent>>>('components');
    componentsField.value = this._components;
    this._componentStore.addField(componentsField);
  }

  private readonly _componentStore: Store;
  private readonly _components: Array<ComponentRef<IComponent>> = [];

  public addComponent(componentTypeLink: Type<any>, to: IComponent) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(componentTypeLink);
    const component = to.componentContainer.createComponent<IComponent>(factory);

    this._components.push(component);
  }

  public getComponent(uniqueId: number) {
    return _.find(this._components, x => x.instance.uniqueId === uniqueId);
  }

  public getComponentByIndex(index: number) {
    return this._componentStore[index];
  }
}
