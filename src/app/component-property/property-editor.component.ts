import {Component, ElementRef, Injector, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ISettingsEditorComponent} from '../abstract/i-settingse-editor-component';
import {IComponentSetting} from '../abstract/i-component-setting';
import {ComponentListService} from '../service/componentlist.service';
import {DynamicComponent} from '../abstract/dynamic.component';
import {SettingsEditorComponent} from '../abstract/settings-editor-component';
import {AbstractComponent} from '../abstract/abstract.component';

@Component({
    selector: 'am-component-property',
    templateUrl: './property-editor.component.html',
    styleUrls: ['./property-editor.component.scss']
})
export class PropertyEditorComponent extends AbstractComponent implements OnInit {

    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

    componentPropertyEl: HTMLElement = null;

    shownSettingsComponents: SettingsEditorComponent[] = [];

    constructor(elRef: ElementRef, private componentListservice: ComponentListService, injector: Injector) {
        super(elRef, injector);
    }

    ngOnInit() {
        const componentProperty = this.componentListservice.findComponent('componentProperty');
        this.componentPropertyEl = componentProperty.element.nativeElement;
    }

    deleteSettings() {
        this.shownSettingsComponents.forEach(c => {
            ((c as ISettingsEditorComponent).uiComponent.instance as IComponentSetting).isSettingsEditorShown = false;
            (c as DynamicComponent).component.destroy();
            (c as ISettingsEditorComponent).uiComponent.destroy();
        });

        this.shownSettingsComponents = [];
    }
}
