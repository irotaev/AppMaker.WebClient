import {ISettingsEditorComponent} from './i-settingse-editor-component';
import {Component, ComponentFactoryResolver, ComponentRef, ElementRef, Injector, ViewRef} from '@angular/core';
import {DynamicComponent} from './dynamic.component';
import {ComponentListService} from '../service/componentlist.service';

@Component({})
export abstract class SettingsEditorComponent extends DynamicComponent implements ISettingsEditorComponent {
    component: ComponentRef<DynamicComponent>;
    uiComponent: ComponentRef<DynamicComponent> = null;

    constructor(el: ElementRef, elementListService: ComponentListService, componentFactoryResolver: ComponentFactoryResolver, injector: Injector) {
        super(el, elementListService, componentFactoryResolver, injector);

        (<any>el.nativeElement).onclick = null;
    }

    onCLick(event: MouseEvent) {
    }

    // setDimensions() {
    // }
}
