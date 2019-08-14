import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ApmComponent} from '../apmC.abstract/apmC';
import {UniqueElementService} from '../abstract/uniqueElement.service';
import {ComponentDispatcher} from '../apmC.abstract/cDispatcher';
import {StoreField} from '../store.abstract/storeField';
import {Store} from '../store.abstract/store';
import {StoreToClassAdapter} from '../routine/storeToClassAdapter.service';

@Component({
  selector: 'apm-c-flexbox',
  templateUrl: './ampCFlexbox.component.html',
  styleUrls: ['./ampCFlexbox.component.scss']
})
export class AmpCFlexboxComponent extends ApmComponent implements OnInit {

  constructor(
    private _componentDispatcher: ComponentDispatcher,
    storeToClassAdapter: StoreToClassAdapter,
    uniqueElementService: UniqueElementService) {
    super(storeToClassAdapter, uniqueElementService);
  }

  cssStyles = {};

  component: Component = this as Component;
  componentContainer: ViewContainerRef;

  ngOnInit() {
    const width = new StoreField<string>('width');
    width.value = '200px';
    this._componentSettings
      .getField<Store>('cssSettingsCurrent').value
      .getField<Store>('settings').value
      .addField(width)
      .field.subscribe(($value) => {
      this.cssStyles = this._componentSettings
        .getField<Store>('cssSettingsCurrent').value
        .getField<Store>('settings').value
        .toNameValueJson();

      this._componentDispatcher.getComponent(this.uniqueId).changeDetectorRef.detectChanges();

      this.onResize($value);
    });

    const height = new StoreField<string>('height');
    height.value = '50px';
    this._componentSettings
      .getField<Store>('cssSettingsCurrent').value
      .getField<Store>('settings').value
      .addField(height)
      .field.subscribe(() => {
      this.cssStyles = this._componentSettings
        .getField<Store>('cssSettingsCurrent').value
        .getField<Store>('settings').value
        .toNameValueJson();

      this._componentDispatcher.getComponent(this.uniqueId).changeDetectorRef.detectChanges();
    });
  }

  onResize($event: any) {
    console.log($event);
  }
}
