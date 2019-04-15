import {Component, ComponentFactoryResolver, ComponentRef, ElementRef, Injector, OnInit, Type} from '@angular/core';
import {DynamicComponent} from '../abstract/dynamic.component';
import {FlexboxSettingsEditorComponent} from '../flexbox.settingseditor/flexbox.settingseditor.component';
import {DynamicComponentTreeService} from '../service/dynamic-component-tree.service/dynamic-component-tree.service';
import {ElementRefSetting} from '../abstract/component-setting/element-ref-setting';
import {ComponentResizeService} from '../service/component-resize.service';

@Component({
  selector: 'am-flexbox',
  templateUrl: './flexbox.component.html',
  styleUrls: ['./flexbox.component.scss'],
  providers: [ComponentResizeService]
})
export class FlexboxComponent extends DynamicComponent implements OnInit {

  elementRefSettings: ElementRefSetting[] = [];

  settingsEditorComponent: { type: Type<DynamicComponent>, settingsEditorComponent: ComponentRef<DynamicComponent> }[] = [{
    type: FlexboxSettingsEditorComponent,
    settingsEditorComponent: null
  }];

  constructor(el: ElementRef,
              dynamicComponentTreeService: DynamicComponentTreeService,
              componentFactoryResolver: ComponentFactoryResolver,
              injector: Injector,
              private componentResizeService: ComponentResizeService) {
    super(el, dynamicComponentTreeService, componentFactoryResolver, injector);
  }

  ngOnInit() {
    super.ngOnInit();

    this.componentResizeService.makeResizable(this.el);
  }

  setJustifyContent(value: string) {
    this.containerWrapperElementRef.nativeElement.style.justifyContent = value;
  }
}
