import {IApmC} from './i-apm-c';
import {ViewContainerRef} from '@angular/core';
import {UniqueElementService} from '../abstract/unique-element.service';
import {Store} from '../store.abstract/store';
import {ComponentSettingsStore, CssSettings} from '../store/component-settings.store';

export abstract class ApmComponent implements IApmC {
  protected constructor(
    protected _uniqueElementService: UniqueElementService,
    componentSettings: ComponentSettingsStore = null,
    uniqueId: string = null) {
    this.uniqueId = uniqueId || _uniqueElementService.generateUniqueId();

    componentSettings = componentSettings || this.createComponentSettings();

    this._componentSettings = componentSettings;
  }

  readonly uniqueId: string;
  protected _componentSettings: ComponentSettingsStore;
  get componentSettings() {
    return this._componentSettings;
  }

  set componentSettings(value: ComponentSettingsStore) {
    this._componentSettings = value;
  }

  abstract childComponentsContainer: ViewContainerRef;

  private createComponentSettings() {
    const componentSettings = new ComponentSettingsStore(this._uniqueElementService);

    const cssSettingsFullHd = new CssSettings(this._uniqueElementService);
    cssSettingsFullHd.screenWidth.setValue('FullHd');
    cssSettingsFullHd.settings.setValue(new Store(this._uniqueElementService));

    componentSettings.cssSettingsAll.value.push(cssSettingsFullHd);
    componentSettings.cssSettingsCurrent.setValue(cssSettingsFullHd);

    return componentSettings;
  }
}
