import {AfterViewInit, ChangeDetectorRef, ElementRef, Injector, Renderer2, ViewContainerRef} from '@angular/core';
import {StyleSettingsStore} from '../store/apm-c.store';
import {StoreValueField} from '../store.abstract/store-value-field';

import * as _ from 'lodash';

export abstract class ApmComponent implements AfterViewInit {
  protected _elementRef: ElementRef;
  private readonly _renderer2: Renderer2;
  private readonly _changeDetectorRef: ChangeDetectorRef;

  protected constructor(injector: Injector, uniqueId: string = null) {
    this._elementRef = injector.get<ElementRef>(ElementRef);
    this._renderer2 = injector.get(Renderer2);

    this.uniqueId = uniqueId;
  }

  abstract childComponentsContainer: ViewContainerRef;
  uniqueId: string;

  styleSettings: StyleSettingsStore;

  ngAfterViewInit(): void {
    // this._elementRef.nativeElement.onclick = ($event) => {
    //   this.onClick($event);
    // };
  }

  // onClick($event: MouseEvent) {
  //   const createApmCPropertyEditorRoutine = this._injector.get('StoreToClassAdapter');
  //   // createApmCPropertyEditorRoutine.Do(this._componentSettings);
  // }

  //#region ComponentSettings

  // get componentSettings() {
  //   return this._componentSettings;
  // }
  //
  // set componentSettings(value: ApmCStore) {
  //   this._componentSettings = value;
  // }
  //
  // private createComponentSettings(): StyleSettingsStore {
  //   const cssSettingsFullHd = new StyleSettingsStore(this._uniqueElementService);
  //   cssSettingsFullHd.screenWidth.setValue('FullHd');
  //   cssSettingsFullHd.settings.setValue(new Store(this._uniqueElementService));
  //
  //   componentSettings.styleSettingsAll.value.push(cssSettingsFullHd);
  //   componentSettings.styleSettingsCurrent.setValue(cssSettingsFullHd);
  //
  //   return componentSettings;
  // }

  //#endregion

  //#region StyleSettingsStore

  protected addCssSettingsField(name: string, value: string) {
    const field = new StoreValueField<string>(name).setValue(value);

    this.styleSettings.settings.value.addField(field.storeField)
      .field.subscribe(() => {

      const styleObj = this.styleSettings.settings.value.toNameValueJson();
      _.forEach(Object.getOwnPropertyNames(styleObj), cssName => {
        this._renderer2.setStyle(this._elementRef.nativeElement, cssName, styleObj[cssName]);
      });

      this._changeDetectorRef.detectChanges();
    });
  }

  //#endregion
}

