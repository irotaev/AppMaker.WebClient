import {ChangeDetectorRef, ElementRef, Injectable} from '@angular/core';
import {CdkDropList, CdkDropListGroup, DragDrop, DragRef} from '@angular/cdk/drag-drop';
import * as Collections from 'typescript-collections';
import {UniqueElementRoutine} from './unique-element.routine';

@Injectable({
  providedIn: 'root',
})
export class DragdropRoutine {
  private readonly _dragRefs = new Collections.Dictionary<string, DragRef<any>>();
  private readonly _dropListRefs = new Collections.Dictionary<string, CdkDropList>();

  constructor(private _dragDrop: DragDrop, private _uniqueElementRoutine: UniqueElementRoutine) {
  }

  createCdkDropList(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, cdkDropListGroup: CdkDropListGroup<any> | undefined) {
    const dropList = new CdkDropList(elementRef, this._dragDrop, changeDetectorRef, undefined, cdkDropListGroup);

    this._dropListRefs.setValue(this._uniqueElementRoutine.generateUniqueId(), dropList);

    return dropList;
  }

  getDropListService(elementRef: ElementRef<HTMLElement> | HTMLElement) {
    return this._dragDrop.createDropList(elementRef);
  }
}
