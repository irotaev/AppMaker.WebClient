import {AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ComponentDispatcher} from './apmC.abstract/cDispatcher';
import {IComponent} from './apmC.abstract/iComponent';
import {CPropertyListComponent} from './cPropertyList/cPropertyList.component';

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

  private _cPropertyListComponent: CPropertyListComponent;

  @ViewChild('cPropertyListContainer', {read: ViewContainerRef, static: false}) cPropertyListContainer: ViewContainerRef;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const factory = this.componentFactoryResolver.resolveComponentFactory(CPropertyListComponent);
    const component = this.cPropertyListContainer.createComponent<IComponent>(factory);

    this._cPropertyListComponent = component.instance as CPropertyListComponent;

    this._componentDispatcher.addComponent(component);
  }
}
