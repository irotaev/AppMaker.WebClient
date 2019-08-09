import { Component, OnInit } from '@angular/core';
import {IComponent} from '../Abstract.Component/IComponent';
import {ComponentFlexboxComponent} from '../component-flexbox/component-flexbox.component';

@Component({
  selector: 'apm-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.scss']
})
export class ComponentListComponent implements OnInit {

  draggableComponents: IComponent[] = [];

  constructor() { }

  ngOnInit() {
    this.draggableComponents.push(new ComponentFlexboxComponent());
  }

}
