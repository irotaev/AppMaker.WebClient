import {Component, ComponentFactoryResolver, ComponentRef, ElementRef, OnInit, Type} from '@angular/core';
import {AbstractUiComponent} from '../Abstract/abstract-uicomponent';
import {DraganddropService} from '../service/draganddrop.service';
import {ElementResizeService} from '../service/resize.service';
import {FlexboxSettingsEditorComponent} from '../flexbox.settingseditor/flexbox.settingseditor.component';
import {IComponent} from '../Abstract/i-component';
import {ComponentListService} from '../service/componentlist.service';

@Component({
    selector: 'am-flexbox',
    templateUrl: './flexbox.component.html',
    styleUrls: ['./flexbox.component.scss'],
    providers: [DraganddropService, ElementResizeService]
})
export class FlexboxComponent extends AbstractUiComponent implements OnInit {

    settingsEditorComponent: { type: Type<IComponent>, settingsEditorComponent: ComponentRef<IComponent> }[] = [{
        type: FlexboxSettingsEditorComponent,
        settingsEditorComponent: null
    }]

    constructor(el: ElementRef,
                private _draganddropService: DraganddropService,
                private _resizeService: ElementResizeService,
                elementListService: ComponentListService,
                componentFactoryResolver: ComponentFactoryResolver) {
        super(el, elementListService, componentFactoryResolver);
    }

    ngOnInit() {
        this._draganddropService.makeDraggable(this.el, true);

        // this._resizeService.makeResizable(this.el);
    }

}
