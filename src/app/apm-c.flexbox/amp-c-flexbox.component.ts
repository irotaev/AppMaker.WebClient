import {Component, ElementRef, HostListener, Injector, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ApmComponent} from '../apm-c.abstract/apm-c';
import {StoreEventField} from '../store.abstract/store-event-field';
import {StoreFactoryRoutine} from '../routine/store.factory.routine';
import {DragdropRoutine} from '../routine/dragdrop.routine';

@Component({
  selector: 'apm-c-flexbox',
  templateUrl: './amp-c-flexbox.component.html',
  styleUrls: ['./amp-c-flexbox.component.scss']
})
export class AmpCFlexboxComponent extends ApmComponent implements OnInit {

  constructor(
    injector: Injector,
    private _storeFactoryRoutine: StoreFactoryRoutine,
    private _dragdropRoutine: DragdropRoutine) {
    super(injector);
  }

  component: Component = this as Component;
  @ViewChild('childComponentsContainer', {static: false}) childComponentsContainer: ViewContainerRef;

  ngOnInit() {
    // this._dragdropRoutine.createCdkDropListService(this.cLinkList, 'cLinkList');
  }

  apmOnComponentInit() {
    super.apmOnComponentInit();

    this.apmComponentSettingsStore.styleSettingsCurrent.value.settings.value
      .addField(this._storeFactoryRoutine.StoreValueField('width')).field.setValue('200px');
    this.apmComponentSettingsStore.styleSettingsCurrent.value.settings.value
      .addField(this._storeFactoryRoutine.StoreValueField('height')).field.setValue('50px');
    this.apmComponentSettingsStore.events.value.addField(new StoreEventField(this._queueRoutine, 'onClick'));

    this.makeDraggable();
  }

  private makeDraggable() {
    this._dragdropRoutine.createCdkDragService(this._elementRef);

    // const cLinkDropListRef = this._dragdropRoutine.getCdkDropListService('cLinkList');
    // const artboardDropListRef = this._dragdropRoutine.getCdkDropListService('artboardContainerWrapper');
    // cLinkDropListRef.connectedTo([artboardDropListRef]);
  }

  @HostListener('click', ['$event'])
  onClick($event: MouseEvent) {
    this.apmComponentSettingsStore.events.value.getField('onClick').next($event);
  }
}
