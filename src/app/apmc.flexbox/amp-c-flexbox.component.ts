import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ApmComponent} from '../apm-component.abstract/ApmComponent';
import {StoreDispatcher} from '../store.abstract/store-dispatcher';
import {CssPropertyBaseStore} from '../store.css-property/css-property-base.store';

@Component({
  selector: 'apm-c-flexbox',
  templateUrl: './amp-c-flexbox.component.html',
  styleUrls: ['./amp-c-flexbox.component.scss']
})
export class AmpCFlexboxComponent
  extends ApmComponent implements OnInit {

  constructor(private _storeDispatcher: StoreDispatcher) {
    super();
  }

  cssStyles: {};

  component: Component = this as Component;
  componentContainer: ViewContainerRef;

  ngOnInit() {
    const store = new CssPropertyBaseStore();
    this._storeDispatcher.addStore(store);

    this.cssStyles = store.toStyleObject();
  }

}
