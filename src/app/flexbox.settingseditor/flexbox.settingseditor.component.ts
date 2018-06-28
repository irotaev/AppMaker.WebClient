import {Component, ComponentFactoryResolver, ComponentRef, ElementRef, Injector, OnInit, Type} from '@angular/core';
import {SettingsEditorComponent} from '../abstract/settings-editor-component';
import {FlexboxComponent} from '../flexbox/flexbox.component';
import {DynamicComponent} from '../abstract/dynamic.component';
import {DynamicComponentTreeService} from '../service/dynamic-component-tree.service/dynamic-component-tree.service';

@Component({
    selector: 'am-flexbox.editorsettings',
    templateUrl: './flexbox.settingseditor.component.html',
    styleUrls: ['./flexbox.settingseditor.component.scss']
})
export class FlexboxSettingsEditorComponent extends SettingsEditorComponent implements OnInit {

    settingsEditorComponent: { type: Type<DynamicComponent>; settingsEditorComponent: ComponentRef<DynamicComponent> }[] = [];

    //#region height, width
    get isFullWidth() {
        return (this.uiComponent.instance as FlexboxComponent).width === '100%';
    }

    set isFullWidth(value: boolean) {
        if (value) {
            this.width = '100%';
        } else {
            this.width = this._lastWidth || '150px';
        }
    }

    private _lastWidth?: string;

    get width() {
        return (this.uiComponent.instance as FlexboxComponent).width;
    }

    get widthPx(): number {
        return parseInt(this.width, 10);
    }

    set width(value) {
        this._lastWidth = this.width;

        (this.uiComponent.instance as FlexboxComponent).width = value;
    }


    get isFullHeight() {
        return (this.uiComponent.instance as FlexboxComponent).height === '100%';
    }

    set isFullHeight(value: boolean) {
        if (value) {
            this.height = '100%';
        } else {
            this.height = this._lastHeight || '50px';
        }
    }

    private _lastHeight?: string;

    get height() {
        return (this.uiComponent.instance as FlexboxComponent).height;
    }

    get heightPx(): number {
        return parseInt(this.height, 10);
    }

    set height(value) {
        this._lastHeight = this.height;

        (this.uiComponent.instance as FlexboxComponent).height = value;
    }

    //#endregion

    justifyContent: string;

    private _lastTop?: number;
    get lastTop() {
        return this._lastTop || parseInt((this.uiComponent.instance as DynamicComponent).el.nativeElement.style.top, 10);
    }

    private _lastLeft?: number;
    get lastLeft() {
        return this._lastLeft || parseInt((this.uiComponent.instance as DynamicComponent).el.nativeElement.style.left, 10);
    }

    position = 'absolute';

    constructor(el: ElementRef, dynamicComponentTreeService: DynamicComponentTreeService, componentFactoryResolver: ComponentFactoryResolver, injector: Injector) {
        super(el, dynamicComponentTreeService, componentFactoryResolver, injector);
    }

    ngOnInit() {
    }

    toggleFullWidth() {
        this.isFullWidth = !this.isFullWidth;
    }

    toggleFullHeight() {
        this.isFullHeight = !this.isFullHeight;
    }

    setJustifyContent(value: string) {
        (this.uiComponent.instance as DynamicComponent).el.nativeElement.style.justifyContent = value;
        this.justifyContent = value;
    }

    setPosition(value: string) {
        (this.uiComponent.instance as DynamicComponent).el.nativeElement.style.position = value;

        if (value === 'relative') {
            this._lastTop = (this.uiComponent.instance as DynamicComponent).el.nativeElement.style.top;
            (this.uiComponent.instance as DynamicComponent).el.nativeElement.style.top = 0;

            this._lastLeft = (this.uiComponent.instance as DynamicComponent).el.nativeElement.style.left;
            (this.uiComponent.instance as DynamicComponent).el.nativeElement.style.left = 0;
        } else if (value === 'absolute') {
            (this.uiComponent.instance as DynamicComponent).el.nativeElement.style.top = this._lastTop;
            (this.uiComponent.instance as DynamicComponent).el.nativeElement.style.left = this._lastLeft;
        }

        this.position = value;
    }

}
