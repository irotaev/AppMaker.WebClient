import {
    Component, ComponentFactoryResolver, ComponentRef, ElementRef, Injector, Input, OnInit,
    Type
} from '@angular/core';
import {DynamicComponent} from '../abstract/dynamic.component';
import {ElementResizeService} from '../service/resize.service';
import {FlexboxSettingsEditorComponent} from '../flexbox.settingseditor/flexbox.settingseditor.component';
import {ComponentListService} from '../service/componentlist.service';

@Component({
    selector: 'am-flexbox',
    templateUrl: './flexbox.component.html',
    styleUrls: ['./flexbox.component.scss'],
    providers: [ElementResizeService]
})
export class FlexboxComponent extends DynamicComponent implements OnInit {

    settingsEditorComponent: { type: Type<DynamicComponent>, settingsEditorComponent: ComponentRef<DynamicComponent> }[] = [{
        type: FlexboxSettingsEditorComponent,
        settingsEditorComponent: null
    }]

    constructor(el: ElementRef,
                private _resizeService: ElementResizeService,
                elementListService: ComponentListService,
                componentFactoryResolver: ComponentFactoryResolver,
                injector: Injector) {
        super(el, elementListService, componentFactoryResolver, injector);
    }

    ngOnInit() {
        super.ngOnInit();

        // if (this.isMakeDraggable) {
        //     this._draganddropService.makeDraggable(this.component, true);
        // }

        // this._resizeService.makeResizable(this.el);
    }

}
