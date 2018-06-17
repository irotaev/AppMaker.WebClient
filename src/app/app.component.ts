import {Component, ComponentRef, ElementRef, HostListener, ViewChild} from '@angular/core';
import {ArtboardComponent} from './artboard/artboard.component';

@Component({
    selector: 'am-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    artboardFormat = 'desktop';

    @ViewChild('artboard', {read: ArtboardComponent}) artboard: ArtboardComponent;

    changeArtboardFormat(format: string) {
        this.artboardFormat = format;

        this.artboard.changeFormat(format);
    }

}
