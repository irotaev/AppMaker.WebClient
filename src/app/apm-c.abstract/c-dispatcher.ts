import {IComponent} from './IComponent';
import {ComponentFactoryResolver, ComponentRef, Injectable, Type} from '@angular/core';

import {Store} from '../store.abstract/store';
import {UniqueElementService} from '../routine/unique-element.service';
import {StoreField} from '../store.abstract/store-field';
import {ApmComponent} from './apm-c';

@Injectable({
  providedIn: 'root'
})
export class ComponentDispatcher {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private _uniqueElementService: UniqueElementService) {
    this._componentStore = new Store(_uniqueElementService);
  }

  private readonly _componentStore: Store;

  public addComponent(componentTypeLink: Type<any>, to: IComponent) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(componentTypeLink);
    const component = to.componentContainer.createComponent<IComponent>(factory);

    const componentField = new StoreField<ComponentRef<IComponent>>('component');
    componentField.value = component;
    this._componentStore.addUniqueField(component.instance as ApmComponent);
  }

  public getComponent(uniqueId: number): StoreField<ComponentRef<IComponent>>  {
    return this._componentStore.getField(uniqueId);
  }

  public getComponentByIndex(index: number) {
    return this._componentStore[index];
  }
}
