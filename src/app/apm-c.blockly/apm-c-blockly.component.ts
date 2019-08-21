import {Component, Injector, OnInit, ViewContainerRef} from '@angular/core';
import {ApmComponent} from '../apm-c.abstract/apm-c';
import {StoreFactoryRoutine} from '../routine/store.factory.routine';
import * as Blockly from 'blockly';

@Component({
  selector: 'apm-apm-c-blocky',
  templateUrl: './apm-c-blockly.component.html',
  styleUrls: ['./apm-c-blockly.component.scss']
})
export class ApmCBlocklyComponent extends ApmComponent implements OnInit {

  constructor(injector: Injector, private _storeFactoryRoutine: StoreFactoryRoutine) {
    super(injector, '__ApmCBlocklyComponent');
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

    this.apmComponentSettingsStore.customSettings.value.addField<boolean>(this._storeFactoryRoutine.StoreValueField('show'))
      .field.setValue(true);

    this.apmComponentSettingsStore.customSettings.value.getField('show').subscribe((value: boolean) => {
      this._show = value;
      this._changeDetectorRef.detectChanges();
    });
  }

  apply($event: MouseEvent) {
    // @ts-ignore
    // TODO
    // tslint:disable-next-line:no-eval
    eval(Blockly.JavaScript.workspaceToCode(document.workspace) as string);
  }
}
