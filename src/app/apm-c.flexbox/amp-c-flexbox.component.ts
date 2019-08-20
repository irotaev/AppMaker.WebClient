import {Component, HostListener, Injector, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ApmComponent} from '../apm-c.abstract/apm-c';
import {StoreEventField} from '../store.abstract/store-event-field';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

@Component({
  selector: 'apm-c-flexbox',
  templateUrl: './amp-c-flexbox.component.html',
  styleUrls: ['./amp-c-flexbox.component.scss']
})
export class AmpCFlexboxComponent extends ApmComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
  }

  component: Component = this as Component;
  @ViewChild('childComponentsContainer', {static: false}) childComponentsContainer: ViewContainerRef;

  ngOnInit() {
  }

  apmOnComponentInit() {
    super.apmOnComponentInit();

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
