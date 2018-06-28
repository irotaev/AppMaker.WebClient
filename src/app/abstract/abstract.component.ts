import {ElementRef, Injector, Renderer2, ViewChild, ViewContainerRef} from '@angular/core';
import {IEditableElement} from './i-editable-element';
import {Guid} from 'guid-typescript';
import {JsonObject, JsonProperty} from 'json2typescript';
import {ComponentUiFactory} from '../service/component-uifactory-resolver.service';
import {DynamicComponentTreeService} from '../service/dynamic-component-tree.service/dynamic-component-tree.service';

@JsonObject
export class AbstractComponent extends ElementRef<HTMLElement> implements IEditableElement {
    protected _renderer: Renderer2;

    @JsonProperty('typeStr', String)
    public typeStr: string = this.constructor.name;

    @ViewChild('viewContainerRef', {read: ViewContainerRef}) viewContainerRef: ViewContainerRef;
    @ViewChild('containerWrapperElementRef', {read: ElementRef}) containerWrapperElementRef: ElementRef;

    /**
     * Unique componentJson code
     */
    @JsonProperty('code', String)
    public code: string = Guid.create().toString();

    protected readonly _componentUiFactory: ComponentUiFactory;
    protected readonly _dynamicComponentTreeService: DynamicComponentTreeService;

    constructor(public el: ElementRef, protected injector: Injector) {
        super(el.nativeElement);

        this._renderer = injector.get(Renderer2);
        this._componentUiFactory = injector.get(ComponentUiFactory);
        this._dynamicComponentTreeService = injector.get(DynamicComponentTreeService);

        // injector.get(TypeListService).addType(this.constructor.name, this.constructor);
    }

    setAttribute(name: string, value: string) {
        this._renderer.setAttribute(this.el, name, value);
    }

    setStyle(name: string, value: string) {
        this._renderer.setStyle(this.el, name, value);
    }
}
