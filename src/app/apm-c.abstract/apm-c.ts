import {IApmC} from './i-apm-c';
import {AfterViewInit, ElementRef, Injector, Renderer2, ViewContainerRef} from '@angular/core';
import {UniqueElementService} from '../abstract/unique-element.service';
import {Store} from '../store.abstract/store';
import {ComponentSettingsStore, CssSettings} from '../store/component-settings.store';
import {StoreScalarField} from '../store.abstract/store-scalar-field';
import {ComponentDispatcher} from './apm-c-dispatcher';

import * as _ from 'lodash';

export abstract class ApmComponent implements IApmC, AfterViewInit {
  protected constructor(
    protected _uniqueElementService: UniqueElementService,
    protected _componentDispatcher: ComponentDispatcher,
    protected _elementRef: ElementRef,
    protected _viewContainerRef: ViewContainerRef,
    protected _renderer2: Renderer2,
    protected _injector: Injector,
    componentSettings: ComponentSettingsStore = null,
    uniqueId: string = null) {
    this.uniqueId = uniqueId || _uniqueElementService.generateUniqueId();

    componentSettings = componentSettings || this.createComponentSettings();

    this._componentSettings = componentSettings;
  }

  abstract childComponentsContainer: ViewContainerRef;

  readonly uniqueId: string;

  protected _componentSettings: ComponentSettingsStore;

  ngAfterViewInit(): void {
    this._elementRef.nativeElement.onclick = ($event) => {
      this.onClick($event);
    };
  }

  onClick($event: MouseEvent) {
    const createApmCPropertyEditorRoutine = this._injector.get('StoreToClassAdapter');
    // createApmCPropertyEditorRoutine.Do(this._componentSettings);
  }

  //#region ComponentSettings

  get componentSettings() {
    return this._componentSettings;
  }

  set componentSettings(value: ComponentSettingsStore) {
    this._componentSettings = value;
  }

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

  protected addCssSettingsField(name: string, value: string) {
    const field = new StoreScalarField<string>(name).setValue(value);

    this._componentSettings.cssSettingsCurrent.value.settings.value.addField(field.storeField)
      .field.subscribe(() => {

      const styleObj = this._componentSettings.cssSettingsCurrent.value.settings.value.toNameValueJson();
      _.forEach(Object.getOwnPropertyNames(styleObj), cssName => {
        this._renderer2.setStyle(this._elementRef.nativeElement, cssName, styleObj[cssName]);
      });

      this._componentDispatcher.getComponent(this.uniqueId).changeDetectorRef.detectChanges();
    });
  }

  //#endregion
}

