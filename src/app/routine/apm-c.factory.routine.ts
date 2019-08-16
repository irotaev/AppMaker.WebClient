import {ComponentFactoryResolver, ComponentRef, Injectable, Type, ViewContainerRef} from '@angular/core';
import {ApmComponent} from '../apm-c.abstract/apm-c';
import {TypeFromStrRoutine} from './type-from-str.routine';

@Injectable({
  providedIn: 'root',
})
export class ApmCFactoryRoutine {
  constructor(private _componentFactoryResolver: ComponentFactoryResolver, private _typeFromStrRoutine: TypeFromStrRoutine) {
  }

  createComponentByType<T>(componentTypeLinkStr: Type<T>, to: ApmComponent, insertToView: ViewContainerRef = null): ComponentRef<T> {
    insertToView = insertToView || to.childComponentsContainer;

    const factory = this._componentFactoryResolver.resolveComponentFactory<T>(componentTypeLinkStr);
    const component = insertToView.createComponent<T>(factory);

    // component.instance.componentSettings.parentComponentStoreUniqueId.setValue(to.uniqueId);
    // to.componentSettings.childComponentStoreUniqueIds.value.push(component.instance.uniqueId);

    component.changeDetectorRef.detectChanges();

    return component;
  }

  createComponentByStr<T>(componentTypeLinkStr: string, to: ApmComponent, insertToView: ViewContainerRef = null): ComponentRef<T> {
    return this.createComponentByType(this._typeFromStrRoutine.getType(componentTypeLinkStr), to, insertToView);
  }
}
