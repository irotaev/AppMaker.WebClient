import {IApmC} from './i-apm-c';
import {Component, ViewContainerRef} from '@angular/core';
import {UniqueElementService} from '../abstract/unique-element.service';
import {Store} from '../store.abstract/store';
import {ComponentSettings, CssSettings} from '../store/component-settings';

export abstract class ApmComponent implements IApmC {
  protected constructor(
    protected _uniqueElementService: UniqueElementService,
    componentSettings: Store = null,
    uniqueId: string = null) {
    this.uniqueId = uniqueId || _uniqueElementService.generateUniqueId();

    componentSettings = componentSettings || this.createComponentSettings();

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

  abstract childComponentsContainer: ViewContainerRef;

  private createComponentSettings() {
    const componentSettings = new ComponentSettings(this._uniqueElementService);

    const cssSettingsFullHd = new CssSettings(this._uniqueElementService);
    cssSettingsFullHd.screenWidth.setValue('FullHd');
    cssSettingsFullHd.settings.setValue(new Store(this._uniqueElementService));

    componentSettings.cssSettingsAll.value.push(cssSettingsFullHd);
    componentSettings.cssSettingsCurrent.setValue(cssSettingsFullHd);

    return componentSettings;
  }
}
