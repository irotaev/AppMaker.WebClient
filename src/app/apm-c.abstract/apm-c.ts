import {IApmC} from './i-apm-c';
import {ViewContainerRef} from '@angular/core';
import {UniqueElementService} from '../abstract/unique-element.service';
import {Store} from '../store.abstract/store';
import {ComponentSettingsStore, CssSettings} from '../store/component-settings.store';
import {StoreField} from '../store.abstract/store-field';
import {ComponentDispatcher} from './apm-c-dispatcher';

export abstract class ApmComponent implements IApmC {
  protected constructor(
    protected _uniqueElementService: UniqueElementService,
    protected _componentDispatcher: ComponentDispatcher,
    componentSettings: ComponentSettingsStore = null,
    uniqueId: string = null) {
    this.uniqueId = uniqueId || _uniqueElementService.generateUniqueId();

    componentSettings = componentSettings || this.createComponentSettings();

    this._componentSettings = componentSettings;
  }

  abstract childComponentsContainer: ViewContainerRef;

  readonly uniqueId: string;
  protected _cssStyles = {};

  //#region ComponentSettings

  get componentSettings() {
    return this._componentSettings;
  }

  set componentSettings(value: ComponentSettingsStore) {
    this._componentSettings = value;
  }

  protected _componentSettings: ComponentSettingsStore;

  private createComponentSettings() {
    const componentSettings = new ComponentSettingsStore(this._uniqueElementService);

    const cssSettingsFullHd = new CssSettings(this._uniqueElementService);
    cssSettingsFullHd.screenWidth.setValue('FullHd');
    cssSettingsFullHd.settings.setValue(new Store(this._uniqueElementService));

    componentSettings.cssSettingsAll.value.push(cssSettingsFullHd);
    componentSettings.cssSettingsCurrent.setValue(cssSettingsFullHd);

    return componentSettings;
  }

  //#endregion

  //#region CssSettings

  get cssStyles() {
    return this._cssStyles;
  }

  protected addCssSettingsField(name: string, value: string) {
    const field = new StoreField<string>(name).setValue(value);

    this._componentSettings.cssSettingsCurrent.value.settings.value.addField(field.storeField)
      .field.subscribe(() => {
      this._cssStyles = this._componentSettings.cssSettingsCurrent.value.settings.value.toNameValueJson();

      this._componentDispatcher.getComponent(this.uniqueId).changeDetectorRef.detectChanges();
    });
  }

  //#endregion
}
