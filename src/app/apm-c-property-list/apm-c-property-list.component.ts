import {Component, ElementRef, Injector, OnInit, Renderer2, ViewChild, ViewContainerRef} from '@angular/core';
import {ApmComponent} from '../apm-c.abstract/apm-c';
import {StoreToClassAdapter} from '../routine/storeToClassAdapter.service';
import {UniqueElementService} from '../abstract/unique-element.service';
import {ComponentDispatcher} from '../apm-c.abstract/apm-c-dispatcher';

@Component({
  selector: 'apm-c-property-list',
  templateUrl: './apm-c-property-list.component.html',
  styleUrls: ['./apm-c-property-list.component.scss']
})
export class ApmCPropertyListComponent extends ApmComponent implements OnInit {

  constructor(
    private _renderer: Renderer2,
    storeToClassAdapter: StoreToClassAdapter,
    uniqueElementService: UniqueElementService,
    componentDispatcher: ComponentDispatcher,
    elementRef: ElementRef,
    viewContainerRef: ViewContainerRef,
    renderer2: Renderer2,
    injector: Injector) {
    super(uniqueElementService, componentDispatcher, elementRef, viewContainerRef, renderer2, injector, null, '__CPropertyList');
  }

  @ViewChild('componentContainer', {read: ViewContainerRef, static: false}) childComponentsContainer: ViewContainerRef;

  private _isDisplayed = false;
  get isDisplayed() {
    return this._isDisplayed;
  }

  set isDisplayed(value: boolean) {
    this._isDisplayed = value;
    this.tryDisplayComponent();
  }

  ngOnInit() {
    this.tryDisplayComponent();
  }

  tryDisplayComponent() {
    this._renderer.setStyle(this._elementRef.nativeElement, 'display', this._isDisplayed ? 'block' : 'none');
  }
}
