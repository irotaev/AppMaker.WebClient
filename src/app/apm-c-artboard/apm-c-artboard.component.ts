import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener, Injector,
  OnInit,
  Renderer2,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ComponentDispatcher} from '../apm-c.abstract/apm-c-dispatcher';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {IApmC} from '../apm-c.abstract/i-apm-c';
import {ApmComponent} from '../apm-c.abstract/apm-c';
import {UniqueElementService} from '../abstract/unique-element.service';
import {StoreToClassAdapter} from '../routine/storeToClassAdapter.service';

@Component({
  selector: 'apm-artboard',
  templateUrl: './apm-c-artboard.component.html',
  styleUrls: ['./apm-c-artboard.component.scss']
})
export class ApmCArtboardComponent extends ApmComponent implements OnInit, AfterViewInit {
  constructor(componentDispatcher: ComponentDispatcher,
              private cdref: ChangeDetectorRef,
              elementRef: ElementRef,
              viewContainerRef: ViewContainerRef,
              storeToClassAdapter: StoreToClassAdapter,
              uniqueElementService: UniqueElementService,
              renderer2: Renderer2,
              injector: Injector) {
    super(uniqueElementService, componentDispatcher, elementRef, viewContainerRef, renderer2, injector, null, '__ApmCArtboard');
  }

  private _artboarSize = 'tablet';

  private _artboardScale = 1;

  get artboardScale(): number {
    return this._artboardScale;
  }

  set artboardScale(value: number) {
    this._artboardScale = value;

    this._componentSettings.cssSettingsCurrent.value.settings.value.getField('transform').setValue('scale(' + value + ')');
  }

  get artboarSize(): string {
    return this._artboarSize;
  }

  set artboarSize(value: string) {
    this._artboarSize = value;

    let width = '1024px';
    switch (value) {
      case 'laptop-l':
        width = '1440px';
        break;
      case 'laptop':
        width = '1024px';
        break;
      case 'tablet':
        width = '768px';
        break;
      case 'mobile-l':
        width = '425px';
        break;
      case 'mobile-m':
        width = '375px';
        break;
      case 'mobile-s':
        width = '320px';
        break;
      default:
        width = value;
    }

    this._componentSettings.cssSettingsCurrent.value.screenWidth.setValue(width);
    this._componentSettings.cssSettingsCurrent.value.settings.value.getField('width').setValue(width);
  }

  droppedComponents: IApmC[] = [];

  @ViewChild('artboardContainer', {read: ViewContainerRef, static: false}) childComponentsContainer: ViewContainerRef;
  @ViewChild('artboardContainerWrapper', {read: ViewContainerRef, static: false}) artboardContainerWrapper: ViewContainerRef;

  ngOnInit() {
    // @ts-ignore
    window.document.componentDispatcher = this._componentDispatcher;
    // @ts-ignore
    window.document.storeDispatcher = this._storeDispatcher;
  }

  ngAfterViewInit() {
    this._elementRef = this.artboardContainerWrapper.element;

    this.addCssSettingsField('width', '1024px');
    this.addCssSettingsField('transform', 'scale(1)');
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown($event: KeyboardEvent) {
    if ($event.altKey && ($event.key === '+' || $event.key === '=') && this._artboardScale < 1) {
      this.artboardScale += 0.1;
    } else if ($event.altKey && ($event.key === '-' || $event.key === '_') && this._artboardScale > 0.6) {
      this.artboardScale -= 0.1;
    }
  }

  drop($event: CdkDragDrop<IApmC>) {
    this.droppedComponents.push($event.item.data);
    this._componentDispatcher.createComponent($event.item.data, this as IApmC);
  }
}
