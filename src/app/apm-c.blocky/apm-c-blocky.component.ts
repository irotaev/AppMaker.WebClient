import {Component, Injector, OnInit, ViewContainerRef} from '@angular/core';
import {ApmComponent} from '../apm-c.abstract/apm-c';
import {StoreFactoryRoutine} from '../routine/store.factory.routine';

@Component({
  selector: 'apm-apm-c-blocky',
  templateUrl: './apm-c-blocky.component.html',
  styleUrls: ['./apm-c-blocky.component.scss']
})
export class ApmCBlockyComponent extends ApmComponent implements OnInit {

  constructor(injector: Injector, private _storeFactoryRoutine: StoreFactoryRoutine) {
    super(injector, '__ApmCBlockyComponent');
  }

  childComponentsContainer: ViewContainerRef = null;

  private _show = false;
  get show() {
    return this._show;
  }
  set show(value: boolean) {
    this.apmComponentSettingsStore.customSettings.value.getField('show').setValue(value);
  }

  ngOnInit() {
  }

  apmOnComponentInit() {
    super.apmOnComponentInit();

    this.apmComponentSettingsStore.customSettings.value.addField<boolean>(this._storeFactoryRoutine.StoreValueField('show'));

    this.apmComponentSettingsStore.customSettings.value.getField('show').subscribe((value: boolean) => {
      this._show = value;
      this._changeDetectorRef.detectChanges();
    });
  }
}
