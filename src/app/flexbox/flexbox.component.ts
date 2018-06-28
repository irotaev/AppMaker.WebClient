import {Component, ComponentFactoryResolver, ComponentRef, ElementRef, Injector, OnInit, Type} from '@angular/core';
import {DynamicComponent} from '../abstract/dynamic.component';
import {FlexboxSettingsEditorComponent} from '../flexbox.settingseditor/flexbox.settingseditor.component';
import {DynamicComponentTreeService} from '../service/dynamic-component-tree.service/dynamic-component-tree.service';

@Component({
    selector: 'am-flexbox',
    templateUrl: './flexbox.component.html',
    styleUrls: ['./flexbox.component.scss']
})
export class FlexboxComponent extends DynamicComponent implements OnInit {

    settingsEditorComponent: { type: Type<DynamicComponent>, settingsEditorComponent: ComponentRef<DynamicComponent> }[] = [{
        type: FlexboxSettingsEditorComponent,
        settingsEditorComponent: null
    }]

    constructor(el: ElementRef,
                dynamicComponentTreeService: DynamicComponentTreeService,
                componentFactoryResolver: ComponentFactoryResolver,
                injector: Injector) {
        super(el, dynamicComponentTreeService, componentFactoryResolver, injector);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    setJustifyContent(value: string) {
        this.containerWrapperElementRef.nativeElement.style.justifyContent = value;
    }
}
