import {AfterViewInit, Component, ComponentRef, HostListener, Injector, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ApmCArtboardComponent} from './apm-c-artboard/apm-c-artboard.component';
import {ApmComponent} from './apm-c.abstract/apm-c';
import {ListStore} from './store/list.store';
import {ApmCFactoryRoutine} from './routine/apm-c.factory.routine';
import {ApmCStoreFactoryRoutine} from './routine/apm-c-store.factory.routine';
import {ApmCStore} from './store/apm-c.store';
import {MatDialog} from '@angular/material';
import {ApmCPropertyEditorComponent} from './apm-c-property-editor/apm-c-property-editor.component';
import {ApmCBlocklyComponent} from './apm-c.blockly/apm-c-blockly.component';

import * as Blockly from 'blockly';
import {DragRef} from '@angular/cdk/drag-drop';

@Component({
  selector: 'apm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends ApmComponent implements OnInit, AfterViewInit {
  isComponentListDisplayed = true;
  isPropertyListDisplayed = false;

  constructor(injector: Injector,
              private _listStore: ListStore,
              private _apmCFactoryRoutine: ApmCFactoryRoutine,
              private _apmStoreFactoryRoutine: ApmCStoreFactoryRoutine,
              private _matDialog: MatDialog) {
    super(injector, '__AppComponent');
  }

  @ViewChild('childComponentsContainer', {read: ViewContainerRef, static: false}) childComponentsContainer: ViewContainerRef;
  @ViewChild('apmCArtboard', {read: ViewContainerRef, static: false}) apmCArtboard: ViewContainerRef;
  @ViewChild('apmCPropertyListContainer', {read: ViewContainerRef, static: false}) apmCPropertyListContainer: ViewContainerRef;
  @ViewChild('apmCBlockyContainer', {read: ViewContainerRef, static: false}) apmCBlockyContainer: ViewContainerRef;

  ngOnInit(): void {
    // @ts-ignore
    window.document.ListStore = this._listStore;
  }

  ngAfterViewInit(): void {
    const apmCAppComponentStore = this._apmStoreFactoryRoutine.createApmComponentStoreEmpty<AppComponent>();
    // @ts-ignore
    apmCAppComponentStore.setApmComponent({instance: this} as ComponentRef<AppComponent>);

    const apmCArtboardStore = this._apmStoreFactoryRoutine
      .createApmComponentStoreCustom<ApmCArtboardComponent>(ApmCArtboardComponent, this.apmCArtboard);

    apmCArtboardStore.parentComponentStoreUniqueId.setValue(apmCAppComponentStore.uniqueId);
    apmCAppComponentStore.childComponentStoreUniqueIds.value.push(apmCArtboardStore.uniqueId);

    // ------------------------------------------------------------------------------
    // Application Events
    //
    this.bindEvents();

    this.initBlockly();
  }

  private bindEvents() {
    const apmCAppStore = this._listStore.getStoreByUniqueId<ApmCStore<ApmCArtboardComponent>>('__AppComponent');
    const apmCArtboardStore = this._listStore.getStoreByUniqueId<ApmCStore<ApmCArtboardComponent>>('__ApmCArtboard');

    apmCArtboardStore.events.value.getField('drop').subscribe((...args) => {
      const item: DragRef = args[0] && args[0][0] as DragRef;

      if (!item) {
        return;
      }

      const componentFlexboxStore = this._apmStoreFactoryRoutine.createApmComponentStore(item.data, apmCArtboardStore.uniqueId);

      this.apmCPropertyListContainer.clear();
      const apmCPropertyEditorComponentStore = this._apmStoreFactoryRoutine
        .createApmComponentStoreCustom(ApmCPropertyEditorComponent, this.apmCPropertyListContainer);
      apmCPropertyEditorComponentStore.styleSettingsAll.setValue(componentFlexboxStore.styleSettingsAll.value);
      apmCPropertyEditorComponentStore.styleSettingsCurrent.setValue(componentFlexboxStore.styleSettingsCurrent.value);
    });
  }

  private initBlockly() {
    const apmCBlockyStore = this._apmStoreFactoryRoutine.createApmComponentStoreCustom(ApmCBlocklyComponent, this.apmCBlockyContainer);

    // @ts-ignore
    Blockly.Blocks.log = {
      init() {
        this.jsonInit({
          message0: 'log %1',
          args0: [
            {
              type: 'input_value',
              name: 'VALUE',
              check: 'String'
            }
          ],
          output: 'String',
          colour: 160,
          tooltip: 'Log it'
        });
      }
    };

    // @ts-ignore
    Blockly.JavaScript.log = (block) => {
      // @ts-ignore
      return ['document.ListStore.getStoreByUniqueId(\'__ApmCBlocklyComponent\').customSettings.value.getField(\'show\').setValue(true)', Blockly.JavaScript.ORDER_MEMBER];
    };

    // @ts-ignore
    // TODO
    document.workspace = Blockly.inject('blocklyDiv', {
      toolbox: '<xml id="toolbox" style="display: none">\n' +
        '  <block type="controls_if"></block>\n' +
        '  <block type="controls_repeat_ext"></block>\n' +
        '  <block type="logic_compare"></block>\n' +
        '  <block type="math_number"></block>\n' +
        '  <block type="math_arithmetic"></block>\n' +
        '  <block type="text"></block>\n' +
        '  <block type="text_print"></block>\n' +
        '  <block type="log"></block>\n' +
        '</xml>'
    });

    apmCBlockyStore.customSettings.value.getField('show').setValue(false);
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown($event: KeyboardEvent) {
    if ($event.altKey && $event.key === 'q') {
      const showField = this._listStore.getStoreByUniqueId<ApmCStore<ApmComponent>>('__ApmCBlocklyComponent')
        .customSettings.value.getField('show');

      showField.setValue(!showField.value);
    }
  }
}
