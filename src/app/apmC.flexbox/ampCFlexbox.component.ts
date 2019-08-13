import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ApmComponent} from '../apmC.abstract/apmC';
import {UniqueElementService} from '../abstract/uniqueElement.service';
import {ComponentDispatcher} from '../apmC.abstract/cDispatcher';
import {StoreField} from '../store.abstract/storeField';

@Component({
  selector: 'apm-c-flexbox',
  templateUrl: './ampCFlexbox.component.html',
  styleUrls: ['./ampCFlexbox.component.scss']
})
export class AmpCFlexboxComponent extends ApmComponent implements OnInit {

  constructor(
    private _componentDispatcher: ComponentDispatcher,
    _uniqueElementService: UniqueElementService) {
    super(_uniqueElementService);
  }

  cssStyles = {};

  component: Component = this as Component;
  componentContainer: ViewContainerRef;

  ngOnInit() {
    const width = new StoreField<string>('width');
    width.value = '200px';
    this._cssSettingsStore.addField(width);

    const height = new StoreField<string>('height');
    height.value = '50px';
    this._cssSettingsStore.addField(height);

    this._cssSettingsStore.getField('width').subscribe(() => {
      this.cssStyles = this._cssSettingsStore.toNameValueJson();
      this._componentDispatcher.getComponent(this.uniqueId).changeDetectorRef.detectChanges();
    });
  }
}
