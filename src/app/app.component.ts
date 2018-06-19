import {Component, ViewChild} from '@angular/core';
import {ArtboardComponent} from './artboard/artboard.component';
import {FlexboxComponent} from './flexbox/flexbox.component';

@Component({
    selector: 'am-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    artboardFormat = 'desktop';

    flexBoxType = FlexboxComponent;

    @ViewChild('artboard', {read: ArtboardComponent}) artboard: ArtboardComponent;

    changeArtboardFormat(format: string) {
        this.artboardFormat = format;

        this.artboard.changeFormat(format);
    }

}
