import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ApmComponent} from '../apm-c.abstract/apm-c';
import {UniqueElementService} from '../abstract/unique-element.service';
import {ComponentDispatcher} from '../apm-c.abstract/apm-c-dispatcher';
import {ApmCPropertyEditorComponent} from '../apm-c-property-editor/apm-c-property-editor.component';

@Component({
  selector: 'apm-c-flexbox',
  templateUrl: './amp-c-flexbox.component.html',
  styleUrls: ['./amp-c-flexbox.component.scss']
})
export class AmpCFlexboxComponent extends ApmComponent implements OnInit {

  constructor(
    componentDispatcher: ComponentDispatcher,
    uniqueElementService: UniqueElementService) {
    super(uniqueElementService, componentDispatcher);
  }

  component: Component = this as Component;
  @ViewChild('componentContainer', {static: false}) childComponentsContainer: ViewContainerRef;

  ngOnInit() {
    this.addCssSettingsField('width', '200px');
    this.addCssSettingsField('height', '50px');
  }

  onClick($event: MouseEvent) {
    const cPropertyList = this._componentDispatcher.getComponent('__CPropertyList');
    cPropertyList.instance.childComponentsContainer.clear();
    const componentEditor = this._componentDispatcher.createComponent(ApmCPropertyEditorComponent, cPropertyList.instance);

    componentEditor.instance.componentSettings = this._componentSettings;
  }
}
