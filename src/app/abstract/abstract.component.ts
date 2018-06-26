import {ElementRef, Injector, Renderer2} from '@angular/core';
import {IEditableElement} from './i-editable-element';

export class AbstractComponent extends ElementRef<HTMLElement> implements IEditableElement {
    protected _renderer: Renderer2;

    constructor(public el: ElementRef, protected injector: Injector) {
        super(el.nativeElement);

        this._renderer = injector.get(Renderer2);
    }

    setAttribute(name: string, value: string) {
        this._renderer.setAttribute(this.el, name, value);
    }

    setStyle(name: string, value: string) {
        this._renderer.setStyle(this.el, name, value);
    }
}
