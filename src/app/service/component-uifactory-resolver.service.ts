import {
    ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, Injector, NgModuleRef,
    Type, ViewContainerRef
} from '@angular/core';
import {DynamicComponent} from '../abstract/dynamic.component';

@Injectable({
    providedIn: 'root'
})
export class ComponentUiFactory {

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    }

    resolveComponentFactory<T>(component: Type<T>): ComponentFactory<T> {
        return this.componentFactoryResolver.resolveComponentFactory(component);
    }

    createComponentRef<C>(componentType: Type<DynamicComponent>,
                          acceptorRef: ViewContainerRef,
                          index?: number,
                          injector?: Injector,
                          projectableNodes?: any[][],
                          ngModule?: NgModuleRef<any>): ComponentRef<DynamicComponent> {

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        const componentRef = acceptorRef.createComponent(componentFactory);

        (componentRef.instance as DynamicComponent).componentRef = componentRef;

        return componentRef;
    }

    createComponent<C>(componentType: Type<DynamicComponent>, injector: Injector) {
        return this.componentFactoryResolver.resolveComponentFactory(componentType).create(injector);
    }
}
