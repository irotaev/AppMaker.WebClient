import {IComponent} from './iComponent';
import {Component, ViewContainerRef} from '@angular/core';
import {UniqueElementService} from '../abstract/uniqueElement.service';
import {Store} from '../store.abstract/store';
import {IUniqueElement} from '../abstract/IUniqueElement';
import {StoreToClassAdapter} from '../routine/storeToClassAdapter.service';
import {ComponentSettings, CssSettings} from '../store.virtual/ComponentSettings';

export abstract class ApmComponent implements IComponent, IUniqueElement {
  protected constructor(
    protected _storeToClassAdapter: StoreToClassAdapter,
    protected _uniqueElementService: UniqueElementService) {
    this.uniqueId = _uniqueElementService.generateUniqueId();

    //#region Create CssSettings store

    const componentSettings = new ComponentSettings();

    const cssSettingsFullHd = new CssSettings();
    cssSettingsFullHd.screenWidth = 'FullHd';
    cssSettingsFullHd.settings = new Store(this._uniqueElementService);

    componentSettings.cssSettingsAll.push(cssSettingsFullHd);
    componentSettings.cssSettingsCurrent = cssSettingsFullHd;

    this._componentSettings = this._storeToClassAdapter.toStore(componentSettings);

    //#endregion
  }

  readonly uniqueId: number;
  protected _componentSettings: Store;

  component: Component;
  componentContainer: ViewContainerRef;
}
