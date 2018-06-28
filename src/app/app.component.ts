import {Component, ElementRef, Injector, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ArtboardComponent} from './artboard/artboard.component';
import {FlexboxComponent} from './flexbox/flexbox.component';
import {PropertyEditorComponent} from './component-property/property-editor.component';
import {ComponentUiFactory} from './service/component-uifactory-resolver.service';
import {AbstractComponent} from './abstract/abstract.component';
import {StaticInjector} from './service/static-injector';
import {ComponentBranch} from './service/dynamic-component-tree.service/component-branch';
import {DynamicComponentTreeService} from './service/dynamic-component-tree.service/dynamic-component-tree.service';

@Component({
    selector: 'am-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent extends AbstractComponent implements OnInit {

    artboardFormat = 'desktop';
    flexBoxType = FlexboxComponent;

    appComponent = this;

    @ViewChild('componentList', {read: ElementRef}) componentListElRef: ElementRef;

    @ViewChild('componentProperty', {read: ElementRef}) componentPropertyElRef: ElementRef;
    @ViewChild('componentProperty', {read: PropertyEditorComponent}) componentPropertyComponent: PropertyEditorComponent;

    @ViewChild('artboarContainer', {read: ViewContainerRef}) artboarContainer: ViewContainerRef;

    constructor(elRef: ElementRef,
                private _dynamicComponentTreeService: DynamicComponentTreeService,
                private componentUiFactory: ComponentUiFactory,
                injector: Injector) {
        super(elRef, injector);

        StaticInjector.injector = injector;
    }

    ngOnInit(): void {
        const componentListBranch = new ComponentBranch();
        componentListBranch.addElement(this.componentListElRef, 'componentList');
        this._dynamicComponentTreeService.addBranch(componentListBranch);

        const componentPropertyBranch = new ComponentBranch();
        componentPropertyBranch.addComponent(this.componentPropertyComponent);
        this._dynamicComponentTreeService.addBranch(componentPropertyBranch);

        // this.elementListService.addElement(null, this.componentListElRef, 'componentList');
        // this.elementListService.addElement(this.componentPropertyComponent, this.componentPropertyElRef, 'componentProperty');

        const artboardComponentRef = this.componentUiFactory.createComponent(ArtboardComponent, this.artboarContainer);

        // this.elementListService.addElement(artboardComponent.instance, null, 'artboard');

        const componentArtboardBranch = new ComponentBranch();
        componentArtboardBranch.addComponentRef(artboardComponentRef);
        this._dynamicComponentTreeService.addBranch(componentArtboardBranch);
    }

    changeArtboardFormat(format: string) {
        this.artboardFormat = format;

        const artboardComponentBranch = this._dynamicComponentTreeService.findBranchByComponentType(ArtboardComponent.constructor.name);
        (artboardComponentBranch.component as ArtboardComponent).changeFormat(format);
    }
}
