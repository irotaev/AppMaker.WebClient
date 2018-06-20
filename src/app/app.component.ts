import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ArtboardComponent} from './artboard/artboard.component';
import {FlexboxComponent} from './flexbox/flexbox.component';
import {ComponentListService} from './service/componentlist.service';
import {PropertyEditorComponent} from './component-property/property-editor.component';

@Component({
    selector: 'am-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    artboardFormat = 'desktop';
    flexBoxType = FlexboxComponent;

    @ViewChild('artboard', {read: ArtboardComponent}) artboardComponent: ArtboardComponent;
    @ViewChild('artboardComponent', {read: ElementRef}) artboardElRef: ElementRef;

    @ViewChild('componentList', {read: ElementRef}) componentListElRef: ElementRef;

    @ViewChild('componentProperty', {read: ElementRef}) componentPropertyElRef: ElementRef;
    @ViewChild('componentProperty', {read: PropertyEditorComponent}) componentPropertyComponent: PropertyEditorComponent;

    constructor(private elementListService: ComponentListService) {
    }

    ngOnInit(): void {
        this.elementListService.addElement(null, this.componentListElRef, 'componentList');
        this.elementListService.addElement(this.artboardComponent, this.artboardElRef, 'artboard');
        this.elementListService.addElement(this.componentPropertyComponent, this.componentPropertyElRef, 'componentProperty');
    }

    changeArtboardFormat(format: string) {
        this.artboardFormat = format;

        this.artboardComponent.changeFormat(format);
    }
}
