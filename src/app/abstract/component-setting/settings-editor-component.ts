import {ISettingsEditorComponent} from '../i-settingse-editor-component';
import {Component, ComponentFactoryResolver, ComponentRef, ElementRef, Injector} from '@angular/core';
import {DynamicComponent} from '../dynamic.component';
import {DynamicComponentTreeService} from '../../service/dynamic-component-tree.service/dynamic-component-tree.service';
import {ElementRefSetting} from './element-ref-setting';

@Component({})
export abstract class SettingsEditorComponent extends DynamicComponent implements ISettingsEditorComponent {

    uiComponent: ComponentRef<DynamicComponent> = null;

    elementRefSettings: ElementRefSetting[] = [];

    constructor(el: ElementRef, dynamicComponentTreeService: DynamicComponentTreeService, componentFactoryResolver: ComponentFactoryResolver, injector: Injector) {
        super(el, dynamicComponentTreeService, componentFactoryResolver, injector);

        (<any>el.nativeElement).onclick = null;
    }
}
