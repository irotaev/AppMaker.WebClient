import {IComponent} from './iComponent';
import {Component, ViewContainerRef} from '@angular/core';
import {UniqueElementService} from '../abstract/uniqueElement.service';
import {Store} from '../store.abstract/store';
import {StoreToClassAdapter} from '../routine/storeToClassAdapter.service';
import {ComponentSettings, CssSettings} from '../store.virtual/ComponentSettings';

export abstract class ApmComponent implements IComponent {
  protected constructor(
    protected _storeToClassAdapter: StoreToClassAdapter,
    protected _uniqueElementService: UniqueElementService,
    componentSettings: Store = null,
    uniqueId: string = null) {
    this.uniqueId = uniqueId || _uniqueElementService.generateUniqueId();

    componentSettings = componentSettings || this._storeToClassAdapter.toStore(this.createComponentSettings());

    this._componentSettings = componentSettings;
  }

  readonly uniqueId: string;
  protected _componentSettings: Store;
  get componentSettings() {
    return this._componentSettings;
  }
  set componentSettings(value: Store) {
    this._componentSettings = value;
  }

  component: Component;
  abstract componentContainer: ViewContainerRef;

  private createComponentSettings() {
    const componentSettings = new ComponentSettings();

    const cssSettingsFullHd = new CssSettings();
    cssSettingsFullHd.screenWidth = 'FullHd';
    cssSettingsFullHd.settings = new Store(this._uniqueElementService);

    componentSettings.cssSettingsAll.push(cssSettingsFullHd);
    componentSettings.cssSettingsCurrent = cssSettingsFullHd;

    return componentSettings;
  }
}
