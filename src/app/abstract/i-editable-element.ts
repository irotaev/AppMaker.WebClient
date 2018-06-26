import {ElementRef} from '@angular/core';

export interface IEditableElement {
    el: ElementRef;

    setAttribute(name: string, value: string);

    setStyle(name: string, value: string);
}
