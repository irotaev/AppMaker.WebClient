import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ApmComponent} from '../apm-c.abstract/apm-c';
import {UniqueElementService} from '../routine/unique-element.service';
import {ComponentDispatcher} from '../apm-c.abstract/c-dispatcher';
import {StoreField} from '../store.abstract/store-field';

@Component({
  selector: 'apm-c-flexbox',
  templateUrl: './amp-c-flexbox.component.html',
  styleUrls: ['./amp-c-flexbox.component.scss']
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
