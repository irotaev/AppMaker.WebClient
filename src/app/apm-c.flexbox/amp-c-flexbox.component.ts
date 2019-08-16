import {Component, Injector, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ApmComponent} from '../apm-c.abstract/apm-c';

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
  @ViewChild('componentContainer', {static: false}) childComponentsContainer: ViewContainerRef;

  ngOnInit() {
  }

  apmOnComponentInit() {
    super.apmOnComponentInit();

    this.addStyleSettingsField('width', '200px');
    this.addStyleSettingsField('height', '50px');
  }
}
