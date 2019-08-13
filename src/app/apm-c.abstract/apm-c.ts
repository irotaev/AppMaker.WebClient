import {IComponent} from './IComponent';
import {Component, ViewContainerRef} from '@angular/core';
import {UniqueElementService} from '../routine/unique-element.service';
import {UniqueElement} from '../abstract/unique-element';
import {Store} from '../store.abstract/store';
import {StoreField} from '../store.abstract/store-field';

export abstract class ApmComponent extends UniqueElement<StoreField<ApmComponent>> implements IComponent {
  protected constructor(protected _uniqueElementService: UniqueElementService) {
    super(null, _uniqueElementService.generateUniqueId());

    this._cssSettingsStore = new Store(_uniqueElementService);
  }

  protected _cssSettingsStore: Store;

  component: Component;
  componentContainer: ViewContainerRef;

  getCssSettingsStore() {
    return this._cssSettingsStore;
  }

  changeCssSettingsStore(store: Store) {
    if (store == null) {
      throw new Error('cssSettingsStore to change is null');
    }

    this._cssSettingsStore = store;
  }
}
