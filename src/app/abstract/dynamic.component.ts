import {Component, ComponentFactoryResolver, ComponentRef, ElementRef, Injector, OnInit, Type} from '@angular/core';
import {IComponentSetting} from './i-component-setting';
import {PropertyEditorComponent} from '../component-property/property-editor.component';
import {FlexboxSettingsEditorComponent} from '../flexbox.settingseditor/flexbox.settingseditor.component';
import {ISettingsEditorComponent} from './i-settingse-editor-component';
import {SettingsEditorComponent} from './settings-editor-component';
import {AbstractComponent} from './abstract.component';
import {AmDraggableDirective} from '../directive/amdraggable.directive';
import {DynamicComponentTreeService} from '../service/dynamic-component-tree.service/dynamic-component-tree.service';
import {ComponentBranch} from '../service/dynamic-component-tree.service/component-branch';
import {DataTransferStore} from '../directive/amdraggable.datatransferstore';

@Component({})
export abstract class DynamicComponent extends AbstractComponent implements IComponentSetting, OnInit {

    abstract settingsEditorComponent: { type: Type<DynamicComponent>, settingsEditorComponent: ComponentRef<DynamicComponent> }[];

    /**
     * Ref to componentJson view if exist
     * @typeStr {any}
     */
    componentRef: ComponentRef<DynamicComponent> = null;

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
                protected _dynamicComponentTreeService: DynamicComponentTreeService,
                protected componentFactoryResolver: ComponentFactoryResolver,
                injector: Injector) {
        super(el, injector);

        (<any>el.nativeElement).onclick = event => this.onClick(event);
    }

    ngOnInit() {
        this.setDimensions();

        const draggableDirective = new AmDraggableDirective(this._renderer, this.el);
        draggableDirective.amDraggable_ChangeLocation = true;
        draggableDirective.amDraggable_ComponentCode = this.code;
        draggableDirective.amDraggable_DragScope = 'component';
        draggableDirective.apply();

        // this._draggableRoutine.makeDraggable(this.componentJson, false);
    }

    setDimensions() {
        this.width = '150px';
        this.height = '50px';
    }

    public onDrop(event: any) {
        if (this.viewContainerRef != null) {
            const droppableComponentBranch = this._dynamicComponentTreeService.findBranchByComponentCode(this.code);

            const transferStore = DataTransferStore.fromEventDataTransfer(event);
            const draggableComponentBranch = this._dynamicComponentTreeService.findBranchByComponentCode(transferStore.componentCode);

            const component = this._componentUiFactory.createComponentRef(
                <Type<any>>draggableComponentBranch.component.constructor,
                droppableComponentBranch.component.viewContainerRef);

            const componentBranch = new ComponentBranch();
            componentBranch.addComponent(component.instance);

            this._dynamicComponentTreeService.addBranch(componentBranch, droppableComponentBranch.componentCode);
        }
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

        const componentPropertyRef = this._dynamicComponentTreeService.findBranchByComponentType(PropertyEditorComponent.name);
        (componentPropertyRef.component as PropertyEditorComponent).container.clear();


        const componentEditorSettingsFactory = this.componentFactoryResolver.resolveComponentFactory(this.settingsEditorComponent[0].type);
        const editorSettingsComponent = (componentPropertyRef.component as PropertyEditorComponent).container.createComponent(componentEditorSettingsFactory);

        (editorSettingsComponent.instance as DynamicComponent).componentRef = editorSettingsComponent;
        (editorSettingsComponent.instance as SettingsEditorComponent).uiComponent = this.componentRef;

        this.settingsEditorComponent[0].settingsEditorComponent = editorSettingsComponent;

        (componentPropertyRef.component as PropertyEditorComponent).shownSettingsComponents.forEach(c => {
            ((c as ISettingsEditorComponent).uiComponent.instance as IComponentSetting).isSettingsEditorShown = false;
        });
        (componentPropertyRef.component as PropertyEditorComponent).shownSettingsComponents = [];

        (componentPropertyRef.component as PropertyEditorComponent).shownSettingsComponents.push(editorSettingsComponent.instance as FlexboxSettingsEditorComponent);

        this.isSettingsEditorShown = true;
    }
}
