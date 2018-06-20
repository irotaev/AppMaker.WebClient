import {ElementRef} from '@angular/core';
import {IComponent} from '../Abstract/i-component';

export class AppElement {
    constructor(public component: IComponent, public element: ElementRef, public elementId: string) {

    }
}
