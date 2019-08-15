import {Component, ElementRef, OnInit, Renderer2, ViewChild, ViewContainerRef} from '@angular/core';
import {ApmComponent} from '../apmC.abstract/apmC';
import {StoreToClassAdapter} from '../routine/storeToClassAdapter.service';
import {UniqueElementService} from '../abstract/uniqueElement.service';

@Component({
  selector: 'apm-c-property-list',
  templateUrl: './cPropertyList.component.html',
  styleUrls: ['./cPropertyList.component.scss']
})
export class CPropertyListComponent extends ApmComponent implements OnInit {

  constructor(
    private _er: ElementRef,
    private _renderer: Renderer2,
    storeToClassAdapter: StoreToClassAdapter,
    uniqueElementService: UniqueElementService) {
    super(storeToClassAdapter, uniqueElementService, null, '__CPropertyList');
  }

  @ViewChild('componentContainer', {read: ViewContainerRef, static: false}) componentContainer: ViewContainerRef;

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
