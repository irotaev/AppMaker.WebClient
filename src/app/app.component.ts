import {AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ComponentDispatcher} from './apm-c.abstract/apm-c-dispatcher';
import {IApmC} from './apm-c.abstract/i-apm-c';
import {ApmCPropertyListComponent} from './apm-c-property-list/apm-c-property-list.component';
import {ApmCArtboardComponent} from './apm-c-artboard/apm-c-artboard.component';
import {ApmComponent} from './apm-c.abstract/apm-c';
import {UniqueElementService} from './abstract/unique-element.service';

@Component({
  selector: 'apm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends ApmComponent implements OnInit, AfterViewInit {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private _componentDispatcher: ComponentDispatcher,
    uniqueElementService: UniqueElementService) {
    super(uniqueElementService, null, '__AppComponent');
  }

  title = 'AppMaker';

  isComponentListDisplayed = true;

  private _isPropertyListDisplayed;
  get isPropertyListDisplayed() {
    return this._isPropertyListDisplayed;
  }

  set isPropertyListDisplayed(value: boolean) {
    this._isPropertyListDisplayed = value;
    this._cPropertyListComponent.isDisplayed = value;
  }

  private _cPropertyListComponent: ApmCPropertyListComponent;

  @ViewChild('childComponentsContainer', {read: ViewContainerRef, static: false}) childComponentsContainer: ViewContainerRef;
  @ViewChild('apmCPropertyListContainer', {read: ViewContainerRef, static: false}) apmCPropertyListContainer: ViewContainerRef;
  @ViewChild('apmCArtboard', {read: ViewContainerRef, static: false}) apmCArtboard: ViewContainerRef;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._cPropertyListComponent = this._componentDispatcher
      .createComponent(ApmCPropertyListComponent, this as IApmC, this.apmCPropertyListContainer).instance as ApmCPropertyListComponent;

    this._componentDispatcher.createComponent(ApmCArtboardComponent, this as IApmC);
  }
}
