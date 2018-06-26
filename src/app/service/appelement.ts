import {ElementRef} from '@angular/core';
import {AbstractComponent} from '../abstract/abstract.component';

export class AppElement {
    constructor(public component: AbstractComponent, public element: ElementRef, public elementId: string) {

    }
}
