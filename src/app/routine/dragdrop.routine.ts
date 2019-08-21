import {ElementRef, Injectable} from '@angular/core';
import {DragDrop, DragRef, DropListRef} from '@angular/cdk/drag-drop';
import * as Collections from 'typescript-collections';
import {UniqueElementRoutine} from './unique-element.routine';

@Injectable({
  providedIn: 'root',
})
export class DragdropRoutine {
  private readonly _dragRefs = new Collections.Dictionary<string, DragRef>();
  private readonly _dropListRefs = new Collections.Dictionary<string, DropListRef>();

  constructor(private _dragDrop: DragDrop, private _uniqueElementRoutine: UniqueElementRoutine) {
  }

  createCdkDropListService(elementRef: ElementRef<HTMLElement> | HTMLElement, name: string = null) {
    const dropList = this._dragDrop.createDropList(elementRef);

    if (name) {
      this._dropListRefs.setValue(name, dropList);
    }

    return dropList;
  }

  getCdkDropListService(name: string): DropListRef {
    return this._dropListRefs.getValue(name);
  }

  createCdkDragService(elementRef: ElementRef<HTMLElement> | HTMLElement, name: string = null) {
    const drag = this._dragDrop.createDrag(elementRef);

    if (name) {
      this._dragRefs.setValue(name, drag);
    }

    return drag;
  }

  getCdkDragService(name: string): DragRef {
    return this._dragRefs.getValue(name);
  }
}
