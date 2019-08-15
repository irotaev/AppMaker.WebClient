import {ComponentDispatcher} from '../apm-c.abstract/apm-c-dispatcher';
import {ApmCPropertyEditorComponent} from '../apm-c-property-editor/apm-c-property-editor.component';
import {ComponentSettingsStore} from '../store/component-settings.store';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
// tslint:disable-next-line:class-name
export class __CreateApmCPropertyEditorRoutine {
  constructor(
    private _componentDispatcher: ComponentDispatcher) {
  }

  public Do(componentSettingsStore: ComponentSettingsStore) {
    const cPropertyList = this._componentDispatcher.getComponent('__CPropertyList');
    cPropertyList.instance.childComponentsContainer.clear();

    const componentEditor = this._componentDispatcher.createComponent(ApmCPropertyEditorComponent, cPropertyList.instance);

    componentEditor.instance.componentSettings = componentSettingsStore;
  }
}
