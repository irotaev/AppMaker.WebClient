import {Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2} from '@angular/core';
import {DataTransferStore} from './amdraggable.datatransferstore';
import {DynamicComponentTreeService} from '../service/dynamic-component-tree.service/dynamic-component-tree.service';
import {AbstractComponent} from '../abstract/abstract.component';

@Directive({
    selector: '[amDroppable]'
})
export class AmDroppableDirective implements OnInit {

    @Input() amDroppable_DropScope: string;
    @Input() amDroppable_Component: AbstractComponent;
    @Output() amDroppable_OnDrop: EventEmitter<any> = new EventEmitter<any>();

    constructor(private _renderer: Renderer2, private _elRef: ElementRef, private _dynamicComponentTreeService: DynamicComponentTreeService) {
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
        event.stopImmediatePropagation();
        event.preventDefault();

        const dataTransfer = DataTransferStore.fromEventDataTransfer(event);

        if (dataTransfer.scope !== this.amDroppable_DropScope) {
            return;
        }

        const draggableComponentBranch = this._dynamicComponentTreeService.findBranchByComponentCode(dataTransfer.componentCode);
        const droppableComponentBranch = this.amDroppable_Component != null
            ? this._dynamicComponentTreeService.findBranchByComponentCode(this.amDroppable_Component.code)
            : null;

        if (draggableComponentBranch.parentBranch != null) {
            return;
        }

        if (draggableComponentBranch.componentCode === droppableComponentBranch.componentCode) {
            return;
        }

        if (draggableComponentBranch != null
            && droppableComponentBranch != null
            && droppableComponentBranch.childBranches.find(b => b.componentCode === draggableComponentBranch.componentCode)) {
            return;
        }

        this.amDroppable_OnDrop.emit(event);
    }
}

