import {AfterViewInit, Component, ComponentRef, Injector, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ApmCArtboardComponent} from './apm-c-artboard/apm-c-artboard.component';
import {ApmComponent} from './apm-c.abstract/apm-c';
import {ListStore} from './store/list.store';
import {ApmCFactoryRoutine} from './routine/apm-c.factory.routine';
import {ApmStoreFactoryRoutine} from './routine/apm-store.factory.routine';
import {ApmCStore} from './store/apm-c.store';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

@Component({
  selector: 'apm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends ApmComponent implements OnInit, AfterViewInit {
  constructor(injector: Injector,
              private _listStore: ListStore,
              private _apmCFactoryRoutine: ApmCFactoryRoutine,
              private _apmStoreFactoryRoutine: ApmStoreFactoryRoutine) {
    super(injector, '__AppComponent');
  }

  @ViewChild('childComponentsContainer', {read: ViewContainerRef, static: false}) childComponentsContainer: ViewContainerRef;
  @ViewChild('apmCArtboard', {read: ViewContainerRef, static: false}) apmCArtboard: ViewContainerRef;

  ngOnInit(): void {
    // @ts-ignore
    window.document.ListStore = this._listStore;
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    const apmCAppComponentStore = this._apmStoreFactoryRoutine.createStore<AppComponent>({instance: this} as ComponentRef<AppComponent>);

    const apmCArtboard = this._apmCFactoryRoutine.createComponentByType(ApmCArtboardComponent, this, this.apmCArtboard);
    const apmCArtboardStore = this._apmStoreFactoryRoutine.createStore<ApmCArtboardComponent>(apmCArtboard);

    apmCArtboardStore.parentComponentStoreUniqueId.setValue(apmCAppComponentStore.uniqueId);
    apmCAppComponentStore.childComponentStoreUniqueIds.value.push(apmCArtboardStore.uniqueId);


    // ------------------------------------------------------------------------------
    // Application Events
    //
    this.bindEvents();
  }

  private bindEvents() {
    const apmCArtboardStore = this._listStore.getStoreByUniqueId<ApmCStore<ApmCArtboardComponent>>('__ApmCArtboard');

    apmCArtboardStore.events.value.getField('drop').subscribe(($dropEvent: CdkDragDrop<ApmComponent>) => {
      if (!$dropEvent) {
        return;
      }

      const componentStore = this._apmStoreFactoryRoutine.createStore($dropEvent.item.data, false);
      componentStore.parentComponentStoreUniqueId.setValue(apmCArtboardStore.uniqueId);
      componentStore.componentType = $dropEvent.item.data;
      componentStore.initComponent();
    });
  }
}
