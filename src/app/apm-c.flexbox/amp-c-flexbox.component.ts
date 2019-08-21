import {Component, HostListener, Injector, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ApmComponent} from '../apm-c.abstract/apm-c';
import {StoreEventField} from '../store.abstract/store-event-field';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {StoreFactoryRoutine} from '../routine/store.factory.routine';

@Component({
  selector: 'apm-c-flexbox',
  templateUrl: './amp-c-flexbox.component.html',
  styleUrls: ['./amp-c-flexbox.component.scss']
})
export class AmpCFlexboxComponent extends ApmComponent implements OnInit {

  constructor(injector: Injector, private _storeFactoryRoutine: StoreFactoryRoutine) {
    super(injector);
  }

  component: Component = this as Component;
  @ViewChild('childComponentsContainer', {static: false}) childComponentsContainer: ViewContainerRef;

  ngOnInit() {
  }

  apmOnComponentInit() {
    super.apmOnComponentInit();

    this.apmComponentSettingsStore.styleSettingsCurrent.value.settings.value
      .addField(this._storeFactoryRoutine.StoreValueField('width')).field.setValue('200px');
    this.apmComponentSettingsStore.styleSettingsCurrent.value.settings.value
      .addField(this._storeFactoryRoutine.StoreValueField('height')).field.setValue('50px');
    this.apmComponentSettingsStore.events.value.addField(new StoreEventField(this._queueRoutine, 'onClick'));
  }

  @HostListener('click', ['$event'])
  onClick($event: MouseEvent) {
    this.apmComponentSettingsStore.events.value.getField('onClick').next($event);
  }

  drop($event: CdkDragDrop<any>) {
    console.log($event);
  }
}
