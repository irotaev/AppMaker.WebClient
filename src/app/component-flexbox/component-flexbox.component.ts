import {Component, OnInit} from '@angular/core';
import {IComponent} from '../Abstract.Component/IComponent';

@Component({
  selector: 'apm-component-flexbox',
  templateUrl: './component-flexbox.component.html',
  styleUrls: ['./component-flexbox.component.scss']
})
export class ComponentFlexboxComponent implements OnInit, IComponent {

  constructor() {
  }

  ngOnInit() {
  }

}
