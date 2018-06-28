import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {DataTransferStore} from './amdraggable.datatransferstore';
import {AbstractComponent} from '../abstract/abstract.component';

@Directive({
    selector: '[amDraggable]'
})
export class AmDraggableDirective implements OnInit {

    @Input() amDraggable_El: HTMLElement;
    @Input() amDraggable_ComponentCode: string;
    @Input() amDraggable_DragScope: string;
    @Input() amDraggable_DragData: any;
    @Input() amDraggable_ChangeLocation: boolean;

    element: HTMLElement;
    private _lastDragStartEvent?: DragEvent;

    constructor(private _renderer: Renderer2, private _element: ElementRef) {
    }

    ngOnInit() {
        this.apply();
    }

    get isAxisXAllowed() {
        if (this.element.style.width === '100%') {
            return false;
        }

        return true;
    }

    get isAxisYAllowed() {
        if (this.element.style.height === '100%') {
            return false;
        }

        return true;
    }

    apply() {

        this.element = this.amDraggable_El || this._element.nativeElement;

        this._renderer.setAttribute(this._element.nativeElement, 'draggable', 'true');

        if (this.amDraggable_ChangeLocation) {
            this._renderer.setStyle(this.element, 'position', 'absolute');

            // this._renderer.setStyle(this.element, 'top', this.element.offsetHeight + 'px');
            // this._renderer.setStyle(this.element, 'left', this.element.offsetWidth + 'px');
        }

        (<any>this._element.nativeElement).ondragstart = (event) => {
            this.onDragStart(event);

            event.stopPropagation();
            event.stopImmediatePropagation();
        };

        (<any>this._element.nativeElement).ondragend = (event) => {
            this.onDragEnd(event);

            event.stopPropagation();
            event.stopImmediatePropagation();
        };

        (<any>this._element.nativeElement).ondrag = (event) => {
            this.onDrag(event);

            event.stopPropagation();
            event.stopImmediatePropagation();
        };
    }

    onDragStart(event: any) {
        if (this.amDraggable_ChangeLocation) {
            this.fillStartDragState(event);
        }

        event.dataTransfer.setData('data', JSON.stringify(new DataTransferStore(
            this.amDraggable_DragScope,
            this.amDraggable_DragData,
            this.amDraggable_ComponentCode)));
    }

    onDragEnd(event: DragEvent) {
        if (this.amDraggable_ChangeLocation) {
            this.changeLocation(event);
        }
    }

    onDrag(event: any) {

    }

    //#region Change current element location

    public fillStartDragState(event: DragEvent) {
        this._lastDragStartEvent = event;
    }

    public changeLocation(event: DragEvent) {

        const deltaX = event.clientX - this._lastDragStartEvent.clientX;
        const deltaY = event.clientY - this._lastDragStartEvent.clientY;

        const style = window.getComputedStyle(this.element, null);

        if (this.isAxisXAllowed) {
            this.element.style.left = parseInt(style.left, 10) + deltaX + 'px';
        }

        if (this.isAxisYAllowed) {
            this.element.style.top = parseInt(style.top, 10) + deltaY + 'px';
        }
    }

    //#endregion
}
