import {ComponentFactoryResolver, ComponentRef, Injectable, Type, ViewContainerRef} from '@angular/core';
import {ApmComponent} from '../apm-c.abstract/apm-c';
import {TypeFromStrRoutine} from './type-from-str.routine';

@Injectable({
  providedIn: 'root',
})
export class ApmCFactoryRoutine {
  constructor(private _componentFactoryResolver: ComponentFactoryResolver, private _typeFromStrRoutine: TypeFromStrRoutine) {
  }

  createComponent<T>(componentTypeLinkStr: Type<T> | string, to: ApmComponent | ViewContainerRef): ComponentRef<T> {
    if (componentTypeLinkStr instanceof String) {
      componentTypeLinkStr = this._typeFromStrRoutine.getType(componentTypeLinkStr as string);
    }

    const factory = this._componentFactoryResolver.resolveComponentFactory<T>(componentTypeLinkStr as Type<T>);
    const component = to instanceof ApmComponent
      ? (to as ApmComponent).childComponentsContainer.createComponent<T>(factory)
      : (to as ViewContainerRef).createComponent<T>(factory);

    component.changeDetectorRef.detectChanges();

    return component;
  }
}
