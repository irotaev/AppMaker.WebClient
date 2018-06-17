import {Directive, ElementRef, NgZone, Renderer2} from '@angular/core';
import {Draggable} from 'ng-drag-drop/src/directives/draggable.directive';
import {NgDragDropService} from 'ng-drag-drop/src/services/ng-drag-drop.service';

@Directive({
    selector: '[amDraggable]'
})
export class AmDraggableDirective extends Draggable {

    constructor(el: ElementRef, renderer: Renderer2, ng2DragDropService: NgDragDropService, zone: NgZone) {
        super(el, renderer, ng2DragDropService, zone);

        this.onDragStart.subscribe(event => {
            console.log(event);
            this.el.nativeElement.style.opacity = 0;
        });

        this.onDragEnd.subscribe(event => {
            console.log(event);
            this.el.nativeElement.style.opacity = 1;
        });
    }
}
