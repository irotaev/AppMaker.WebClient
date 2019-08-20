import {AfterViewInit, Component, ElementRef, OnInit, Type, ViewChild} from '@angular/core';
import {AmpCFlexboxComponent} from '../apm-c.flexbox/amp-c-flexbox.component';
import {ApmComponent} from '../apm-c.abstract/apm-c';
import {DragdropRoutine} from '../routine/dragdrop.routine';

@Component({
  selector: 'apm-c-list',
  templateUrl: './c-list.component.html',
  styleUrls: ['./c-list.component.scss']
})
export class CListComponent implements OnInit, AfterViewInit {

  draggableComponents: Type<ApmComponent>[] = [];

  constructor(private _elementRef: ElementRef, private _dragdropRoutine: DragdropRoutine) {
  }

  @ViewChild('cLinkList', {static: false}) cLinkList: ElementRef;

  ngOnInit() {
    this.draggableComponents.push(AmpCFlexboxComponent);
  }

  ngAfterViewInit(): void {
    // const dropList = this._dragdropRoutine.createCdkDropList(undefined);
    // dropList.id = 'cLinkList';
    // dropList.connectedTo = 'artboardContainer';
  }
}
