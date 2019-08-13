import {Component, ElementRef, HostListener, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ComponentDispatcher} from '../apm-c.abstract/c-dispatcher';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {IComponent} from '../apm-c.abstract/IComponent';
import {ApmComponent} from '../apm-c.abstract/apm-c';
import {UniqueElementService} from '../routine/unique-element.service';

@Component({
  selector: 'apm-artboard',
  templateUrl: './artboard.component.html',
  styleUrls: ['./artboard.component.scss']
})
export class ArtboardComponent extends ApmComponent implements OnInit {
  constructor(private componentDispatcher: ComponentDispatcher,
              _uniqueElementService: UniqueElementService) {
    super(_uniqueElementService);
  }

  artboarSize = 'laptop';
  artboardScale = 1;

  droppedComponents: IComponent[] = [];

  component = this as Component;
  @ViewChild('artboardContainer', {read: ViewContainerRef, static: false}) componentContainer: ViewContainerRef;

  ngOnInit() {
    // @ts-ignore
    window.document.componentDispatcher = this.componentDispatcher;
    // @ts-ignore
    window.document.storeDispatcher = this._storeDispatcher;
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
    this.componentDispatcher.addComponent(event.item.data, this.component as IComponent);
  }
}
