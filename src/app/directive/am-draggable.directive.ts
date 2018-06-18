import {Directive, ElementRef, NgZone, Renderer2} from '@angular/core';
import {Draggable} from 'ng-drag-drop/src/directives/draggable.directive';
import {NgDragDropService} from 'ng-drag-drop/src/services/ng-drag-drop.service';

@Directive({
    selector: '[amDraggable]'
})
export class AmDraggableDirective extends Draggable {

    IsChangeLocation = true;

    constructor(el: ElementRef, renderer: Renderer2, ng2DragDropService: NgDragDropService, zone: NgZone) {
        super(el, renderer, ng2DragDropService, zone);

        // this.clientX = this.el.nativeElement.style.left;
        // this.clientY = this.el.nativeElement.style.top;

        this.onDragStart.subscribe(event => this.fillStartDragState(event));
        this.onDragEnd.subscribe(event => this.changeLocation(event));
    }

    //#region Change current element location

    private _lastDragStartEvent?: DragEvent;

    private fillStartDragState(event: DragEvent) {
        this._lastDragStartEvent = event;
    }

    private changeLocation(event: DragEvent) {
        if (!this.IsChangeLocation) {
            return;
        }

        const deltaX = event.clientX - this._lastDragStartEvent.clientX;
        const deltaY = event.clientY - this._lastDragStartEvent.clientY;

        const style = window.getComputedStyle(this.el.nativeElement, null);

        this.el.nativeElement.style.left = parseInt(style.left, 10) + deltaX + 'px';
        this.el.nativeElement.style.top = parseInt(style.top, 10) + deltaY + 'px';
    }

    //#endregion
}
