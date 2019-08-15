import {Component, ElementRef, Injector, OnInit, Renderer2, ViewChild, ViewContainerRef} from '@angular/core';
import {ApmComponent} from '../apm-c.abstract/apm-c';
import {UniqueElementService} from '../abstract/unique-element.service';
import {ComponentDispatcher} from '../apm-c.abstract/apm-c-dispatcher';

@Component({
  selector: 'apm-c-flexbox',
  templateUrl: './amp-c-flexbox.component.html',
  styleUrls: ['./amp-c-flexbox.component.scss']
})
export class AmpCFlexboxComponent extends ApmComponent implements OnInit {

  constructor(
    componentDispatcher: ComponentDispatcher,
    uniqueElementService: UniqueElementService,
    elementRef: ElementRef,
    viewContainerRef: ViewContainerRef,
    renderer2: Renderer2,
    injector: Injector) {
    super(uniqueElementService, componentDispatcher, elementRef, viewContainerRef, renderer2, injector);
  }

  component: Component = this as Component;
  @ViewChild('componentContainer', {static: false}) childComponentsContainer: ViewContainerRef;

  ngOnInit() {
    this.addCssSettingsField('width', '200px');
    this.addCssSettingsField('height', '50px');
  }
}
