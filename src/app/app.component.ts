import {Component, ElementRef, Injector, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ArtboardComponent} from './artboard/artboard.component';
import {FlexboxComponent} from './flexbox/flexbox.component';
import {ComponentListService} from './service/componentlist.service';
import {PropertyEditorComponent} from './component-property/property-editor.component';
import {ComponentUiFactory} from './service/component-uifactory-resolver.service';
import {AbstractComponent} from './abstract/abstract.component';

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
                private elementListService: ComponentListService,
                private componentUiFactory: ComponentUiFactory,
                injector: Injector) {
        super(elRef, injector);
    }

    ngOnInit(): void {
        this.elementListService.addElement(null, this.componentListElRef, 'componentList');
        this.elementListService.addElement(this.componentPropertyComponent, this.componentPropertyElRef, 'componentProperty');

        const artboardComponent = this.componentUiFactory.createComponent(ArtboardComponent, this.artboarContainer);

        this.elementListService.addElement(artboardComponent.instance, null, 'artboard');
    }

    changeArtboardFormat(format: string) {
        this.artboardFormat = format;

        const artboardComponent = this.elementListService.findComponent('artboard');

        (artboardComponent.component as ArtboardComponent).changeFormat(format);
    }
}
