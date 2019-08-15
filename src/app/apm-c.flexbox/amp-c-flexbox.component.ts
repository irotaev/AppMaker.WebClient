import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ApmComponent} from '../apm-c.abstract/apm-c';
import {UniqueElementService} from '../abstract/unique-element.service';
import {ComponentDispatcher} from '../apm-c.abstract/apm-c-dispatcher';
import {StoreField} from '../store.abstract/store-field';
import {Store} from '../store.abstract/store';
import {ApmCPropertyEditorComponent} from '../apm-c-property-editor/apm-c-property-editor.component';

@Component({
  selector: 'apm-c-flexbox',
  templateUrl: './amp-c-flexbox.component.html',
  styleUrls: ['./amp-c-flexbox.component.scss']
})
export class AmpCFlexboxComponent extends ApmComponent implements OnInit {

  constructor(
    private _componentDispatcher: ComponentDispatcher,
    uniqueElementService: UniqueElementService) {
    super(uniqueElementService);
  }

  cssStyles = {};

  component: Component = this as Component;
  @ViewChild('componentContainer', {static: false}) childComponentsContainer: ViewContainerRef;

  ngOnInit() {
    const width = new StoreField<string>('width').setValue('200px');

    this._componentSettings.cssSettingsCurrent.value.settings.value.addField(width.storeField)
      .field.subscribe(() => {
      this.cssStyles = this._componentSettings.cssSettingsCurrent.value.settings.value.toNameValueJson();

      this._componentDispatcher.getComponent(this.uniqueId).changeDetectorRef.detectChanges();
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

  onClick($event: MouseEvent) {
    const cPropertyList = this._componentDispatcher.getComponent('__CPropertyList');
    cPropertyList.instance.childComponentsContainer.clear();
    const componentEditor = this._componentDispatcher.createComponent(ApmCPropertyEditorComponent, cPropertyList.instance);

    componentEditor.instance.componentSettings = this._componentSettings;
  }
}
