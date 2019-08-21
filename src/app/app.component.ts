import {AfterViewInit, Component, ComponentRef, Injector, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ApmCArtboardComponent} from './apm-c-artboard/apm-c-artboard.component';
import {ApmComponent} from './apm-c.abstract/apm-c';
import {ListStore} from './store/list.store';
import {ApmCFactoryRoutine} from './routine/apm-c.factory.routine';
import {ApmCStoreFactoryRoutine} from './routine/apm-c-store.factory.routine';
import {ApmCStore} from './store/apm-c.store';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material';
import {ApmCPropertyEditorComponent} from './apm-c-property-editor/apm-c-property-editor.component';
import {ApmCBlockyComponent} from './apm-c.blocky/apm-c-blocky.component';

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

    // ApmCBlocky
    //
    const apmCBlockyStore = this._apmStoreFactoryRoutine.createApmComponentStoreCustom(ApmCBlockyComponent, this.apmCBlockyContainer);

    // ------------------------------------------------------------------------------
    // Application Events
    //
    this.bindEvents();
  }

  private bindEvents() {
    const apmCAppStore = this._listStore.getStoreByUniqueId<ApmCStore<ApmCArtboardComponent>>('__AppComponent');
    const apmCArtboardStore = this._listStore.getStoreByUniqueId<ApmCStore<ApmCArtboardComponent>>('__ApmCArtboard');

    apmCArtboardStore.events.value.getField('drop').subscribe(($dropEvent: CdkDragDrop<ApmComponent>) => {
      if (!$dropEvent) {
        return;
      }

      const componentFlexboxStore = this._apmStoreFactoryRoutine.createApmComponentStore($dropEvent.item.data, apmCArtboardStore.uniqueId);

      this.apmCPropertyListContainer.clear();
      const apmCPropertyEditorComponentStore = this._apmStoreFactoryRoutine
        .createApmComponentStoreCustom(ApmCPropertyEditorComponent, this.apmCPropertyListContainer);
      apmCPropertyEditorComponentStore.styleSettingsAll.setValue(componentFlexboxStore.styleSettingsAll.value);
      apmCPropertyEditorComponentStore.styleSettingsCurrent.setValue(componentFlexboxStore.styleSettingsCurrent.value);
    });
  }
}
