import {AfterViewInit, ChangeDetectorRef, ElementRef, Injector, Renderer2, ViewContainerRef} from '@angular/core';
import {ApmCStore} from '../store/apm-c.store';
import {StoreValueField} from '../store.abstract/store-value-field';

import * as _ from 'lodash';
import {Store} from '../store.abstract/store';
import {IStoreField} from '../store.abstract/i-store-field';
import {Subscription} from 'rxjs';

export abstract class ApmComponent implements AfterViewInit {
  protected _elementRef: ElementRef;
  private readonly _renderer2: Renderer2;
  private readonly _changeDetectorRef: ChangeDetectorRef;
  private _styleSettingsSubscriptions: Subscription[] = [];

  protected constructor(injector: Injector, uniqueId: string = null) {
    this._elementRef = injector.get<ElementRef>(ElementRef);
    this._renderer2 = injector.get(Renderer2);
    this._changeDetectorRef = injector.get(ChangeDetectorRef);

    this.uniqueId = uniqueId;
  }

  abstract childComponentsContainer: ViewContainerRef;
  uniqueId: string;

  apmComponentSettingsStore: ApmCStore<ApmComponent>;

  ngAfterViewInit(): void {
  }

  apmOnComponentInit() {
    this.apmComponentSettingsStore.styleSettingsCurrent.subscribe((settings: Store) => {

      _.forEach(this._styleSettingsSubscriptions, s => {
        s.unsubscribe();
      });
      this._styleSettingsSubscriptions = [];

      _.forEach(settings.getField<Store>('settings').value.fields, (field: IStoreField<any>) => {
        this._styleSettingsSubscriptions.push(field.subscribe(() => {

          const styleObj = this.apmComponentSettingsStore.styleSettingsCurrent.value.settings.value.toNameValueJson();
          _.forEach(Object.getOwnPropertyNames(styleObj), cssName => {
            this._renderer2.setStyle(this._elementRef.nativeElement, cssName, styleObj[cssName]);
          });

          this._changeDetectorRef.detectChanges();
        }));
      });

    });
  }

  // onClick($event: MouseEvent) {
  //   const createApmCPropertyEditorRoutine = this._injector.get('StoreToClassAdapter');
  //   // createApmCPropertyEditorRoutine.Do(this._componentSettings);
  // }

  //#region StyleSettingsStore

  protected addStyleSettingsField(name: string, value: string) {
    const field = new StoreValueField<string>(name).setValue(value);

    this.apmComponentSettingsStore.styleSettingsCurrent.value.settings.value.addField(field.storeField);
    // this.styleSettingsCurrent.settings.subscribe((settings: StoreValueField<Store>) => {
    //   settings.value.addField(field.storeField)
    //     .field.subscribe(() => {
    //
    //     const styleObj = this.styleSettingsCurrent.settings.value.toNameValueJson();
    //     _.forEach(Object.getOwnPropertyNames(styleObj), cssName => {
    //       this._renderer2.setStyle(this._elementRef.nativeElement, cssName, styleObj[cssName]);
    //     });
    //
    //     this._changeDetectorRef.detectChanges();
    //   });
    // });

    // this.styleSettingsCurrent.settings.value.addField(field.storeField)
    //   .field.subscribe(() => {
    //
    //   const styleObj = this.styleSettingsCurrent.settings.value.toNameValueJson();
    //   _.forEach(Object.getOwnPropertyNames(styleObj), cssName => {
    //     this._renderer2.setStyle(this._elementRef.nativeElement, cssName, styleObj[cssName]);
    //   });
    //
    //   this._changeDetectorRef.detectChanges();
    // });
  }

  //#endregion
}

