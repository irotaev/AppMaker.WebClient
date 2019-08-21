import {AfterViewInit, Component, ElementRef, OnInit, Type, ViewChild} from '@angular/core';
import {AmpCFlexboxComponent} from '../apm-c.flexbox/amp-c-flexbox.component';
import {ApmComponent} from '../apm-c.abstract/apm-c';
import {DragdropRoutine} from '../routine/dragdrop.routine';

import * as _ from 'lodash';
import {DragRef} from '@angular/cdk/drag-drop';

@Component({
  selector: 'apm-c-list',
  templateUrl: './c-list.component.html',
  styleUrls: ['./c-list.component.scss']
})
export class CListComponent implements OnInit, AfterViewInit {

  draggableComponents: Type<ApmComponent>[] = [];

  constructor(private _dragdropRoutine: DragdropRoutine) {
  }

  @ViewChild('cLinkList', {static: false}) cLinkList: ElementRef;

  ngOnInit() {
    this.draggableComponents.push(AmpCFlexboxComponent);
  }

  ngAfterViewInit(): void {
    const dropListRef = this._dragdropRoutine.createCdkDropListService(this.cLinkList, 'cLinkList');

    const dragRefs = new Array<DragRef>();

    _.forEach(this.cLinkList.nativeElement.querySelectorAll('.component-link'), element => {
      const dragRef = this._dragdropRoutine.createCdkDragService(element);
      dragRef._withDropContainer(dropListRef);
      dragRef.data = this.draggableComponents[0];
      dragRefs.push(dragRef);
    });

    dropListRef.withItems(dragRefs);

    setTimeout(() => {
      this.configLinkDropList();
    }, 1000);

  }

  configLinkDropList() {
    const cLinkDropListRef = this._dragdropRoutine.getCdkDropListService('cLinkList');
    const artboardDropListRef = this._dragdropRoutine.getCdkDropListService('artboardContainerWrapper');
    cLinkDropListRef.connectedTo([artboardDropListRef]);
  }
}
