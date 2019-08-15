import {IApmC} from './i-apm-c';
import {ComponentFactoryResolver, ComponentRef, Injectable, Type, ViewContainerRef} from '@angular/core';

import {Store} from '../store.abstract/store';
import {UniqueElementService} from '../abstract/unique-element.service';
import {StoreField} from '../store.abstract/store-field';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ComponentDispatcher {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private _uniqueElementService: UniqueElementService) {

    this._componentStore = new Store(_uniqueElementService);
    const componentsField = new StoreField<Array<ComponentRef<IApmC>>>('components');
    componentsField.value = this._components;
    this._componentStore.addField(componentsField);
  }

  private readonly _componentStore: Store;
  private readonly _components: Array<ComponentRef<IApmC>> = [];

  public createComponent(componentTypeLink: Type<any>, to: IApmC, insertToView: ViewContainerRef = null): ComponentRef<IApmC> {
    insertToView = insertToView || to.childComponentsContainer;

    const factory = this.componentFactoryResolver.resolveComponentFactory(componentTypeLink);
    const component = insertToView.createComponent<IApmC>(factory);
    this._components.push(component);

    component.instance.componentSettings.parentComponentUniqueId.setValue(to.uniqueId);
    to.componentSettings.childComponentUniqueIds.value.push(component.instance.uniqueId);

    component.changeDetectorRef.detectChanges();

    return component;
  }

  public getComponent<T>(uniqueId: string): ComponentRef<IApmC> {
    return _.find(this._components, x => x.instance.uniqueId === uniqueId);
  }

  public getComponentByIndex(index: number) {
    return this._componentStore[index];
  }
}
