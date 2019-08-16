import {Component, OnInit, Type} from '@angular/core';
import {AmpCFlexboxComponent} from '../apm-c.flexbox/amp-c-flexbox.component';
import {ApmComponent} from '../apm-c.abstract/apm-c';

@Component({
  selector: 'apm-c-list',
  templateUrl: './c-list.component.html',
  styleUrls: ['./c-list.component.scss']
})
export class CListComponent implements OnInit {

  draggableComponents: Type<ApmComponent>[] = [];

  constructor() { }

  ngOnInit() {
    this.draggableComponents.push(AmpCFlexboxComponent);
  }
}
