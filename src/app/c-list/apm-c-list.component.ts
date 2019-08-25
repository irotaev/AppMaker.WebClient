import {AfterViewInit, Component, ElementRef, Injector, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {AmpCFlexboxComponent} from '../apm-c.flexbox/amp-c-flexbox.component';
import {ApmComponent} from '../apm-c.abstract/apm-c';
import {DragdropRoutine} from '../routine/dragdrop.routine';

import * as _ from 'lodash';
import {DragRef, DropListRef} from '@angular/cdk/drag-drop';
import {StoreFactoryRoutine} from '../routine/store.factory.routine';
import {StoreValueArray} from '../store.abstract/store-value-array';
import {ApmCStore} from '../store/apm-c.store';

@Component({
  selector: 'apm-c-list',
  templateUrl: './apm-c-list.component.html',
  styleUrls: ['./apm-c-list.component.scss']
})
export class ApmCListComponent extends ApmComponent implements OnInit, AfterViewInit {
  draggableComponents: Type<ApmComponent>[] = [];

  get dynamicComponentStores(): ApmCStore<ApmComponent>[] {
    if (!this.apmComponentSettingsStore) {
      return [];
    }

    return this.apmComponentSettingsStore.customSettings.value
      .getField<StoreValueArray<ApmCStore<ApmComponent>>>('dynamicComponentStores').value;
  }

  private _dragRefs = new Array<DragRef>();
  private _dropListRef: DropListRef;

  constructor(
    injector: Injector,
    private _dragdropRoutine: DragdropRoutine,
    private _storeFactoryRoutine: StoreFactoryRoutine) {
    super(injector, '__ApmCList');
  }

  @ViewChild('cLinkList', {static: false}) cLinkList: ElementRef;
  @ViewChild('childComponentsContainer', {static: false}) childComponentsContainer: ViewContainerRef;

  ngOnInit() {
    this.draggableComponents.push(AmpCFlexboxComponent);
  }

  ngAfterViewInit(): void {
    this._dropListRef = this._dragdropRoutine.createCdkDropListService(this.cLinkList, 'cLinkList');

    _.forEach(this.cLinkList.nativeElement.querySelectorAll('.static-component'), element => {
      this.makeDraggable(element, this.draggableComponents[0]);
    });

    setTimeout(() => {
      this.configLinkDropList();
    }, 1000);

  }

  private makeDraggable(element: ElementRef, data: any) {
    const dragRef = this._dragdropRoutine.createCdkDragService(element);
    dragRef.data = data;
    this._dragRefs.push(dragRef);
    this._dropListRef.withItems(this._dragRefs);
  }

  apmOnComponentInit() {
    super.apmOnComponentInit();

    this.apmComponentSettingsStore.customSettings.value.addField(
      this._storeFactoryRoutine
        .StoreValueField<StoreValueArray<ApmCStore<ApmComponent>>>('dynamicComponentStores')
        .setValue(this._storeFactoryRoutine.StoreValueArray()).storeField);

    return this.apmComponentSettingsStore.customSettings.value
      .getField<StoreValueArray<ApmCStore<ApmComponent>>>('dynamicComponentStores').value.subscribe(store => {
        if (!store) {
          return;
        }
        setTimeout(() => {
          _.forEach(this.cLinkList.nativeElement.querySelectorAll('.dynamic-component'), element => {
            this.makeDraggable(element, store);
          });
        }, 500);
      });
  }

  configLinkDropList() {
    const cLinkDropListRef = this._dragdropRoutine.getCdkDropListService('cLinkList');
    const artboardDropListRef = this._dragdropRoutine.getCdkDropListService('artboardContainerWrapper');
    cLinkDropListRef.connectedTo([artboardDropListRef]);
  }
}
