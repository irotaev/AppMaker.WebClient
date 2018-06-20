import {ElementRef, Injectable} from '@angular/core';

@Injectable()
export class DraganddropService {

    private _lastDragStartEvent?: DragEvent;
    private _changeLocation = false;

    private _draggableElement: HTMLElement;

    constructor() {
    }

    makeDraggable(el: ElementRef, changeLocation = true) {
        this._draggableElement = el.nativeElement;
        this._changeLocation = changeLocation;

        if (changeLocation) {
            this._draggableElement.style.position = 'absolute';

            const style = window.getComputedStyle(this._draggableElement, null);
            this._draggableElement.style.top = this._draggableElement.offsetHeight + 'px';
            this._draggableElement.style.left = this._draggableElement.offsetWidth + 'px';
        }

        el.nativeElement.setAttribute('draggable', 'true');
        (<any>el).nativeElement.ondragstart = (event) => {
            this.onDragStart(event);
        };

        (<any>el).nativeElement.ondragend = (event) => {
            this.onDragEnd(event);
        };
    }

    onDragStart(event: DragEvent) {
        if (this._changeLocation) {
            this.fillStartDragState(event);
        }
    }

    onDragEnd(event: DragEvent) {
        if (this._changeLocation) {
            this.changeLocation(event);
        }
    }

    //#region Change current element location

    public fillStartDragState(event: DragEvent) {
        this._lastDragStartEvent = event;
    }

    public changeLocation(event: DragEvent) {

        const deltaX = event.clientX - this._lastDragStartEvent.clientX;
        const deltaY = event.clientY - this._lastDragStartEvent.clientY;

        const style = window.getComputedStyle(this._draggableElement, null);

        this._draggableElement.style.left = parseInt(style.left, 10) + deltaX + 'px';
        this._draggableElement.style.top = parseInt(style.top, 10) + deltaY + 'px';
    }

    //#endregion
}
