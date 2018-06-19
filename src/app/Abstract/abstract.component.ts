import {Component, ComponentFactoryResolver, ElementRef, Renderer2, ViewContainerRef} from '@angular/core';

@Component({})
export abstract class AbstractComponent {

    private tar: ViewContainerRef;

    constructor(private el: ElementRef) {
    }
}
