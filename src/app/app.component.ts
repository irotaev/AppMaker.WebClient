import {AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ComponentDispatcher} from './apm-c.abstract/apm-c-dispatcher';
import {IApmC} from './apm-c.abstract/i-apm-c';
import {ApmCPropertyListComponent} from './apm-c-property-list/apm-c-property-list.component';

@Component({
  selector: 'apm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private _componentDispatcher: ComponentDispatcher) {

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

  @ViewChild('cPropertyListContainer', {read: ViewContainerRef, static: false}) cPropertyListContainer: ViewContainerRef;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const factory = this.componentFactoryResolver.resolveComponentFactory(ApmCPropertyListComponent);
    const component = this.cPropertyListContainer.createComponent<IApmC>(factory);

    this._cPropertyListComponent = component.instance as ApmCPropertyListComponent;

    this._componentDispatcher.addComponent(component);
  }
}
