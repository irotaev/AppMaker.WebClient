import {Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2} from '@angular/core';
import {DataTransferStore} from './amdraggable.datatransferstore';

@Directive({
    selector: '[amDroppable]'
})
export class AmDroppableDirective implements OnInit {

    @Input() amDroppable_DropScope: string;
    @Output() amDroppable_OnDrop: EventEmitter<any> = new EventEmitter<any>();

    constructor(private _renderer: Renderer2, private _elRef: ElementRef) {
    }

    ngOnInit(): void {
        this.apply();
    }

    apply() {
        this._renderer.setAttribute(this._elRef.nativeElement, 'droppable', 'true');

        (<any>this._elRef.nativeElement).ondrop = (event) => {
            this.onDrop(event);
        };

        (<any>this._elRef.nativeElement).ondragenter = (event) => {
            event.preventDefault();
        };
        (<any>this._elRef.nativeElement).ondragover = (event) => {
            event.preventDefault();
        };
    }

    onDrop(event: any) {
        if ((JSON.parse(event.dataTransfer.getData('data')) as DataTransferStore).scope !== this.amDroppable_DropScope) {
            return;
        }

        this.amDroppable_OnDrop.emit(event);
    }
}

