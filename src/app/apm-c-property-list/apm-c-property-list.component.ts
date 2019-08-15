import {Component, ElementRef, OnInit, Renderer2, ViewChild, ViewContainerRef} from '@angular/core';
import {ApmComponent} from '../apm-c.abstract/apm-c';
import {StoreToClassAdapter} from '../routine/storeToClassAdapter.service';
import {UniqueElementService} from '../abstract/unique-element.service';

@Component({
  selector: 'apm-c-property-list',
  templateUrl: './apm-c-property-list.component.html',
  styleUrls: ['./apm-c-property-list.component.scss']
})
export class ApmCPropertyListComponent extends ApmComponent implements OnInit {

  constructor(
    private _er: ElementRef,
    private _renderer: Renderer2,
    storeToClassAdapter: StoreToClassAdapter,
    uniqueElementService: UniqueElementService) {
    super(uniqueElementService, null, '__CPropertyList');
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
    this._renderer.setStyle(this._er.nativeElement, 'display', this._isDisplayed ? 'block' : 'none');
  }
}