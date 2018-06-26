import {ElementRef, Injectable} from '@angular/core';
import {AppElement} from './appelement';
import {AbstractComponent} from '../abstract/abstract.component';

@Injectable({
    providedIn: 'root'
})
export class ComponentListService {

    private _elements = new Array<AppElement>();

    addElement(component: AbstractComponent, el: ElementRef, elementId: string) {
        this._elements.push(new AppElement(component, el, elementId));
    }

    findComponent(elementId: string): AppElement {
        return this._elements.find(el => el.elementId === elementId);
    }
}
