import {Component, OnInit, Type} from '@angular/core';
import {IComponent} from '../apmC.abstract/iComponent';
import {AmpCFlexboxComponent} from '../apmC.flexbox/ampCFlexbox.component';

@Component({
  selector: 'apm-c-list',
  templateUrl: './cList.component.html',
  styleUrls: ['./cList.component.scss']
})
export class CListComponent implements OnInit {

  draggableComponents: Type<IComponent>[] = [];

  constructor() { }

  ngOnInit() {
    this.draggableComponents.push(AmpCFlexboxComponent);
  }

}
