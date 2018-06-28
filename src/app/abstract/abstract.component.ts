import {ElementRef, Injector, Renderer2} from '@angular/core';
import {IEditableElement} from './i-editable-element';
import {Guid} from 'guid-typescript';
import {JsonObject, JsonProperty} from 'json2typescript';
import {TypeListService} from '../service/type-list.service';

@JsonObject
export class AbstractComponent extends ElementRef<HTMLElement> implements IEditableElement {
    protected _renderer: Renderer2;

    @JsonProperty('type', String)
    public type: string = this.constructor.name;

    /**
     * Unique componentJson code
     */
    @JsonProperty('code', String)
    public code: string = Guid.create().toString();

    constructor(public el: ElementRef, protected injector: Injector) {
        super(el.nativeElement);

        this._renderer = injector.get(Renderer2);

        injector.get(TypeListService).addType(this.constructor.name, this.constructor.prototype);
    }

    setAttribute(name: string, value: string) {
        this._renderer.setAttribute(this.el, name, value);
    }

    setStyle(name: string, value: string) {
        this._renderer.setStyle(this.el, name, value);
    }
}
