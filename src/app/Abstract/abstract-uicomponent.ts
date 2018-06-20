import {Component, ComponentFactoryResolver, ComponentRef, ElementRef, Type} from '@angular/core';
import {IComponentSetting} from './i-component-setting';
import {IUiComponent} from './i-uicomponent';
import {IComponent} from './i-component';
import {ComponentListService} from '../service/componentlist.service';
import {PropertyEditorComponent} from '../component-property/property-editor.component';
import {IDynamicComponent} from './i-dynamic-component';
import {FlexboxSettingsEditorComponent} from '../flexbox.settingseditor/flexbox.settingseditor.component';
import {ISettingsEditorComponent} from './i-settingse-editor-component';

@Component({})
export abstract class AbstractUiComponent implements IComponentSetting, IUiComponent {

    abstract settingsEditorComponent: { type: Type<IComponent>, settingsEditorComponent: ComponentRef<IComponent> }[];

    component: ComponentRef<IComponent> = null;

    isSettingsEditorShown = false;

    constructor(protected el: ElementRef, protected elementListService: ComponentListService, protected componentFactoryResolver: ComponentFactoryResolver) {
        (<any>el.nativeElement).onclick = event => this.onClick(event);
    }

    protected onClick(event: MouseEvent) {
        this.showSettingsEditor();
    }

    protected showSettingsEditor() {
        if (this.isSettingsEditorShown) {
            return;
        }

        const componentEditorSettingsFactory = this.componentFactoryResolver.resolveComponentFactory(this.settingsEditorComponent[0].type);
        const componentPropertyRef = this.elementListService.findComponent('componentProperty');

        (componentPropertyRef.component as PropertyEditorComponent).container.clear();
        const editorSettingsComponent = (componentPropertyRef.component as PropertyEditorComponent).container.createComponent(componentEditorSettingsFactory);

        (editorSettingsComponent.instance as IDynamicComponent).component = editorSettingsComponent;
        (editorSettingsComponent.instance as ISettingsEditorComponent).uiComponent = this.component;
        this.settingsEditorComponent[0].settingsEditorComponent = editorSettingsComponent;

        (componentPropertyRef.component as PropertyEditorComponent).shownSettingsComponents.forEach(c => {
            ((c as ISettingsEditorComponent).uiComponent.instance as IComponentSetting).isSettingsEditorShown = false;
        });
        (componentPropertyRef.component as PropertyEditorComponent).shownSettingsComponents = [];

        (componentPropertyRef.component as PropertyEditorComponent).shownSettingsComponents.push(editorSettingsComponent.instance as FlexboxSettingsEditorComponent);

        this.isSettingsEditorShown = true;
    }
}
