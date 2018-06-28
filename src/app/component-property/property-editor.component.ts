import {Component, ElementRef, Injector, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ISettingsEditorComponent} from '../abstract/i-settingse-editor-component';
import {IComponentSetting} from '../abstract/i-component-setting';
import {DynamicComponent} from '../abstract/dynamic.component';
import {SettingsEditorComponent} from '../abstract/component-setting/settings-editor-component';
import {AbstractComponent} from '../abstract/abstract.component';

@Component({
    selector: 'am-component-property',
    templateUrl: './property-editor.component.html',
    styleUrls: ['./property-editor.component.scss']
})
export class PropertyEditorComponent extends AbstractComponent implements OnInit {

    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

    public code: string = PropertyEditorComponent.name;

    componentPropertyEl: HTMLElement = null;

    shownSettingsComponents: SettingsEditorComponent[] = [];

    constructor(elRef: ElementRef, injector: Injector) {
        super(elRef, injector);
    }

    ngOnInit() {
        const componentProperty = this._dynamicComponentTreeService.findBranchByComponentCode(PropertyEditorComponent.name);
        this.componentPropertyEl = componentProperty.component.el.nativeElement;
    }

    deleteSettings() {
        this.shownSettingsComponents.forEach(c => {
            ((c as ISettingsEditorComponent).uiComponent.instance as IComponentSetting).isSettingsEditorShown = false;
            (c as DynamicComponent).componentRef.destroy();
            (c as ISettingsEditorComponent).uiComponent.destroy();
        });

        this.shownSettingsComponents = [];
    }
}
