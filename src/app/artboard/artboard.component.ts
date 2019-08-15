import {Component, HostListener, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ComponentDispatcher} from '../apm-c.abstract/apm-c-dispatcher';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {IApmC} from '../apm-c.abstract/i-apm-c';
import {ApmComponent} from '../apm-c.abstract/apm-c';
import {UniqueElementService} from '../abstract/unique-element.service';
import {StoreToClassAdapter} from '../routine/storeToClassAdapter.service';

@Component({
  selector: 'apm-artboard',
  templateUrl: './artboard.component.html',
  styleUrls: ['./artboard.component.scss']
})
export class ArtboardComponent extends ApmComponent implements OnInit {
  constructor(private _componentDispatcher: ComponentDispatcher,
              storeToClassAdapter: StoreToClassAdapter,
              uniqueElementService: UniqueElementService) {
    super(storeToClassAdapter, uniqueElementService);
  }

  artboarSize = 'laptop';
  artboardScale = 1;

  droppedComponents: IApmC[] = [];

  component = this as Component;
  @ViewChild('artboardContainer', {read: ViewContainerRef, static: false}) componentContainer: ViewContainerRef;

  ngOnInit() {
    // @ts-ignore
    window.document.componentDispatcher = this._componentDispatcher;
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

  drop(event: CdkDragDrop<IApmC>) {
    this.droppedComponents.push(event.item.data);
    this._componentDispatcher.createComponent(event.item.data, this.component as IApmC);
  }
}
