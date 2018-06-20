import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ISettingsEditorComponent} from '../Abstract/i-settingse-editor-component';
import {IDynamicComponent} from '../Abstract/i-dynamic-component';
import {IComponentSetting} from '../Abstract/i-component-setting';
import {ComponentListService} from '../service/componentlist.service';

@Component({
    selector: 'am-component-property',
    templateUrl: './property-editor.component.html',
    styleUrls: ['./property-editor.component.scss']
})
export class PropertyEditorComponent implements OnInit {

    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

    componentPropertyEl: HTMLElement = null;

    shownSettingsComponents: ISettingsEditorComponent[] = [];

    constructor(private componentListservice: ComponentListService) {
    }

    ngOnInit() {
        const componentProperty = this.componentListservice.findComponent('componentProperty');
        this.componentPropertyEl = componentProperty.element.nativeElement;
    }

    deleteSettings() {
        this.shownSettingsComponents.forEach(c => {
            ((c as ISettingsEditorComponent).uiComponent.instance as IComponentSetting).isSettingsEditorShown = false;
            (c as ISettingsEditorComponent).component.destroy();
            (c as ISettingsEditorComponent).uiComponent.destroy();
        });

        this.shownSettingsComponents = [];
    }
}
