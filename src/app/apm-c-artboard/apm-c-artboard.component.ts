import {AfterViewInit, Component, HostListener, Injector, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ApmComponent} from '../apm-c.abstract/apm-c';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {StoreEventField} from '../store.abstract/store-event-field';
import {ListStore} from '../store/list.store';
import {ApmCStore, StyleSettingsStore} from '../store/apm-c.store';

import * as _ from 'lodash';
import {StyleSettingsStoreFactoryRoutine} from '../routine/style-settings-store.factory.routine';

@Component({
  selector: 'apm-artboard',
  templateUrl: './apm-c-artboard.component.html',
  styleUrls: ['./apm-c-artboard.component.scss']
})
export class ApmCArtboardComponent extends ApmComponent implements OnInit, AfterViewInit {
  constructor(injector: Injector, private _listStore: ListStore, private _styleSettingsStoreFactoryRoutine: StyleSettingsStoreFactoryRoutine) {
    super(injector, '__ApmCArtboard');
  }

  private _artboarSize = 'tablet';

  private _artboardScale = 1;

  private _childApmComponentStoreIds: string[] = [];

  get artboardScale(): number {
    return this._artboardScale;
  }

  set artboardScale(value: number) {
    this._artboardScale = value;

    this.styleSettingsCurrent.getField('transform').setValue('scale(' + value + ')');
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

    this.styleSettingsCurrent.screenWidth.setValue(width);
    this.styleSettingsCurrent.settings.value.getField('width').setValue(width);

    _.forEach(this._childApmComponentStoreIds, id => {
      const store = this._listStore.getStoreByUniqueId<ApmCStore<ApmComponent>>(id);

      let styleSettings = _.find<StyleSettingsStore>(store.styleSettingsAll.value, x => x.screenWidth.value === width);
      if (!styleSettings) {
        styleSettings = this._styleSettingsStoreFactoryRoutine.createSettings(width);

        store.styleSettingsAll.value.push(styleSettings);
      }
    });
  }

  @ViewChild('artboardContainer', {read: ViewContainerRef, static: false}) childComponentsContainer: ViewContainerRef;
  @ViewChild('artboardContainerWrapper', {read: ViewContainerRef, static: false}) artboardContainerWrapper: ViewContainerRef;

  ngOnInit() {
  }

  ngAfterViewInit() {
    this._elementRef = this.artboardContainerWrapper.element;
  }

  apmOnComponentInit() {
    super.apmOnComponentInit();

    this._childApmComponentStoreIds = this._listStore.getStoreByUniqueId<ApmCStore<ApmComponent>>(this.uniqueId).childComponentStoreUniqueIds.value;

    this.addStyleSettingsField('width', '1024px');
    this.addStyleSettingsField('transform', 'scale(1)');

    this.events.value.addField(new StoreEventField('drop'));
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown($event: KeyboardEvent) {
    if ($event.altKey && ($event.key === '+' || $event.key === '=') && this._artboardScale < 1) {
      this.artboardScale += 0.1;
    } else if ($event.altKey && ($event.key === '-' || $event.key === '_') && this._artboardScale > 0.6) {
      this.artboardScale -= 0.1;
    }
  }

  drop($event: CdkDragDrop<ApmComponent>) {
    this.events.value.getField('drop').next($event);
  }
}
