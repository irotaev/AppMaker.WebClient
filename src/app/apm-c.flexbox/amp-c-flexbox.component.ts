import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ApmComponent} from '../apm-component.abstract/ApmComponent';
import {StoreDispatcher} from '../store.abstract/store-dispatcher';
import {CssPropertyBaseStore} from '../store.css-property/css-property-base.store';
import {UniqueElementService} from '../routine/unique-element.service';
import {ComponentDispatcher} from '../apm-component.abstract/ComponentDispatcher';

@Component({
  selector: 'apm-c-flexbox',
  templateUrl: './amp-c-flexbox.component.html',
  styleUrls: ['./amp-c-flexbox.component.scss']
})
export class AmpCFlexboxComponent
  extends ApmComponent implements OnInit {

  constructor(
    private _storeDispatcher: StoreDispatcher,
    private _componentDispatcher: ComponentDispatcher,
    _uniqueElementService: UniqueElementService) {
    super(_uniqueElementService);
  }

  cssStyles = {};

  component: Component = this as Component;
  componentContainer: ViewContainerRef;

  ngOnInit() {
    const store = new CssPropertyBaseStore();
    this._storeDispatcher.addStore(store);

    store.width.valueEvent.subscribe(val => {
      this.cssStyles = store.toStyleObject();
      this._componentDispatcher.getComponent(this.id).element.changeDetectorRef.detectChanges();
    });
  }

  onClick() {
    console.log('click!');
  }
}
