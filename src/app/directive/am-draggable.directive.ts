import {Directive, ElementRef, Input, NgZone, OnInit, Renderer2} from '@angular/core';
import {Draggable} from 'ng-drag-drop/src/directives/draggable.directive';
import {NgDragDropService} from 'ng-drag-drop/src/services/ng-drag-drop.service';
import {DraganddropService} from '../service/draganddrop.service';

@Directive({
    selector: '[amDraggable]',
    providers: [DraganddropService]
})
export class AmDraggableDirective extends Draggable implements OnInit {

    @Input() amDraggableDragComponent: HTMLElement;

    IsChangeLocation = true;

    private _lastDragStartEvent?: DragEvent;

    constructor(el: ElementRef, renderer: Renderer2, ng2DragDropService: NgDragDropService, zone: NgZone) {
        super(el, renderer, ng2DragDropService, zone);

        this.onDragStart.subscribe(event => this.fillStartDragState(event));
        this.onDragEnd.subscribe(event => this.changeLocation(event));
    }

    ngOnInit() {
        this.amDraggableDragComponent = this.amDraggableDragComponent || this.el.nativeElement;
    }

    //#region Change current element location

    private fillStartDragState(event: DragEvent) {
        this._lastDragStartEvent = event;
    }

    private changeLocation(event: DragEvent) {
        if (!this.IsChangeLocation) {
            return;
        }

        const deltaX = event.clientX - this._lastDragStartEvent.clientX;
        const deltaY = event.clientY - this._lastDragStartEvent.clientY;

        const style = window.getComputedStyle(this.amDraggableDragComponent, null);

        this.amDraggableDragComponent.style.left = parseInt(style.left, 10) + deltaX + 'px';
        this.amDraggableDragComponent.style.top = parseInt(style.top, 10) + deltaY + 'px';
    }

    //#endregion
}
