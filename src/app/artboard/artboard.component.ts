import {Component, Host, HostListener, OnInit, ViewChild} from '@angular/core';
import {ComponentFlexboxComponent} from '../component-flexbox/component-flexbox.component';
import {ComponentDispatcher} from '../Abstract.Component/ComponentDispatcher';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {IComponent} from '../Abstract.Component/IComponent';

@Component({
  selector: 'apm-artboard',
  templateUrl: './artboard.component.html',
  styleUrls: ['./artboard.component.scss']
})
export class ArtboardComponent implements OnInit {

  artboarSize = 'laptop-l';
  artboardScale = 0.9;

  droppedComponents: IComponent[] = [];

  // @ViewChild('firstComponent', { static: true }) firstComponent: ComponentFlexboxComponent;

  constructor(private componentDispatcher: ComponentDispatcher) {
  }

  ngOnInit() {

  }

  @HostListener('document:keydown', ['$event'])
  onKeydown($event: KeyboardEvent) {
    if ($event.altKey && ($event.key === '+' || $event.key === '=') && this.artboardScale < 1) {
      this.artboardScale += 0.1;
    } else if ($event.altKey && ($event.key === '-' || $event.key === '_') && this.artboardScale > 0.6) {
      this.artboardScale -= 0.1;
    }
  }

  drop(event: CdkDragDrop<IComponent>) {
    this.droppedComponents.push(event.item.data);
  }
}
