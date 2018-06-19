import {Component, ElementRef, OnInit, Renderer2, Type} from '@angular/core';
import {AbstractComponent} from '../Abstract/abstract.component';

@Component({
    selector: 'am-flexbox',
    templateUrl: './flexbox.component.html',
    styleUrls: ['./flexbox.component.scss']
})
export class FlexboxComponent extends AbstractComponent implements OnInit {

    constructor(el: ElementRef) {
        super(el);
    }

    ngOnInit() {
    }

}
