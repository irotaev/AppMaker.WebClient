import {AfterViewInit, Component, HostListener, Injector, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ApmComponent} from '../apm-c.abstract/apm-c';

@Component({
  selector: 'apm-artboard',
  templateUrl: './apm-c-artboard.component.html',
  styleUrls: ['./apm-c-artboard.component.scss']
})
export class ApmCArtboardComponent extends ApmComponent implements OnInit, AfterViewInit {
  constructor(injector: Injector) {
    super(injector, '__ApmCArtboard');
  }

  private _artboarSize = 'tablet';

  private _artboardScale = 1;

  get artboardScale(): number {
    return this._artboardScale;
  }

  set artboardScale(value: number) {
    this._artboardScale = value;

    this.styleSettings.getField('transform').setValue('scale(' + value + ')');
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

    this.styleSettings.screenWidth.setValue(width);
    this.styleSettings.settings.value.getField('width').setValue(width);
  }

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
  }

  apmOnComponentInit() {
    super.apmOnComponentInit();

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

  // drop($event: CdkDragDrop<IApmC>) {
  //   this.droppedComponents.push($event.item.data);
  //   this._componentDispatcher.createComponent($event.item.data, this as IApmC);
  // }
}
