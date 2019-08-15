import {Component, OnInit, Type} from '@angular/core';
import {IApmC} from '../apm-c.abstract/i-apm-c';
import {AmpCFlexboxComponent} from '../apm-c.flexbox/amp-c-flexbox.component';

@Component({
  selector: 'apm-c-list',
  templateUrl: './c-list.component.html',
  styleUrls: ['./c-list.component.scss']
})
export class CListComponent implements OnInit {

  draggableComponents: Type<IApmC>[] = [];

  constructor() { }

  ngOnInit() {
    this.draggableComponents.push(AmpCFlexboxComponent);
  }

}