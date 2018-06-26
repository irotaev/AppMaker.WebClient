import {Component, ComponentFactoryResolver, ComponentRef, ElementRef, Injector, OnInit, Type} from '@angular/core';
import {IComponentSetting} from './i-component-setting';
import {ComponentListService} from '../service/componentlist.service';
import {PropertyEditorComponent} from '../component-property/property-editor.component';
import {FlexboxSettingsEditorComponent} from '../flexbox.settingseditor/flexbox.settingseditor.component';
import {ISettingsEditorComponent} from './i-settingse-editor-component';
import {SettingsEditorComponent} from './settings-editor-component';
import {AbstractComponent} from './abstract.component';
import {AmDraggableDirective} from '../directive/amdraggable.directive';

@Component({})
export abstract class DynamicComponent extends AbstractComponent implements IComponentSetting, OnInit {

    abstract settingsEditorComponent: { type: Type<DynamicComponent>, settingsEditorComponent: ComponentRef<DynamicComponent> }[];

    component: ComponentRef<DynamicComponent> = null;

    isSettingsEditorShown = false;

    //#region width, height

    get width() {
        return this.el.nativeElement.style.width;
    }

    set width(value) {
        this.el.nativeElement.style.width = value;

        if (value === '100%') {
            this.el.nativeElement.style.left = 0;
        }
    }

    get height() {
        return this.el.nativeElement.style.height;
    }

    set height(value) {
        this.el.nativeElement.style.height = value;

        if (value === '100%') {
            this.el.nativeElement.style.top = 0;
        }
    }

    //#endregion

    constructor(el: ElementRef,
                protected elementListService: ComponentListService,
                protected componentFactoryResolver: ComponentFactoryResolver,
                injector: Injector) {
        super(el, injector);

        (<any>el.nativeElement).onclick = event => this.onClick(event);
    }

    ngOnInit() {
        this.setDimensions();

        const draggableDirective = new AmDraggableDirective(this._renderer, this.el);
        draggableDirective.amDraggable_ChangeLocation = true;
        draggableDirective.apply();

        // this._draggableRoutine.makeDraggable(this.component, false);
    }

    setDimensions() {
        this.width = '150px';
        this.height = '50px';
    }

    protected onClick(event: MouseEvent) {
        this.showSettingsEditor();

        event.stopPropagation();
        event.stopImmediatePropagation();
    }

    protected showSettingsEditor() {
        if (this.isSettingsEditorShown) {
            return;
        }

        const componentPropertyRef = this.elementListService.findComponent('componentProperty');
        (componentPropertyRef.component as PropertyEditorComponent).container.clear();


        const componentEditorSettingsFactory = this.componentFactoryResolver.resolveComponentFactory(this.settingsEditorComponent[0].type);
        const editorSettingsComponent = (componentPropertyRef.component as PropertyEditorComponent).container.createComponent(componentEditorSettingsFactory);

        (editorSettingsComponent.instance as DynamicComponent).component = editorSettingsComponent;
        (editorSettingsComponent.instance as SettingsEditorComponent).uiComponent = this.component;

        this.settingsEditorComponent[0].settingsEditorComponent = editorSettingsComponent;

        (componentPropertyRef.component as PropertyEditorComponent).shownSettingsComponents.forEach(c => {
            ((c as ISettingsEditorComponent).uiComponent.instance as IComponentSetting).isSettingsEditorShown = false;
        });
        (componentPropertyRef.component as PropertyEditorComponent).shownSettingsComponents = [];

        (componentPropertyRef.component as PropertyEditorComponent).shownSettingsComponents.push(editorSettingsComponent.instance as FlexboxSettingsEditorComponent);

        this.isSettingsEditorShown = true;
    }
}
