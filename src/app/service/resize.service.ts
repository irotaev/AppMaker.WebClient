import {ElementRef, Injectable} from '@angular/core';

@Injectable()
export class ElementResizeService {

    private _resizeEl: ElementRef;
    private _captureArea = 10;

    private _resizeStartPositionX?: number;
    private _resizeStartPositionY?: number;

    private _isSizeChanging = false;

    constructor() {

    }

    makeResizable(el: ElementRef) {
        this._resizeEl = el;

        (<any>this._resizeEl).nativeElement.onmousemove = (event) => {
            this.onMouseMove(event);
        };
    }

    onMouseMove(event: MouseEvent) {

        const domRect = this._resizeEl.nativeElement.getBoundingClientRect();

        if (event.clientX >= domRect.x - this._captureArea && event.clientX <= domRect.x + this._captureArea) {
            this._resizeEl.nativeElement.style.cursor = 'ew-resize';

            this.enableMove('X', -1);
        } else if (event.clientX >= domRect.x + domRect.width - this._captureArea && event.clientX <= domRect.x + domRect.width + this._captureArea) {
            this._resizeEl.nativeElement.style.cursor = 'ew-resize';

            this.enableMove('X', 1);
        } else if (event.clientY >= domRect.y - this._captureArea && event.clientY <= domRect.y + this._captureArea) {
            this._resizeEl.nativeElement.style.cursor = 'ns-resize';
        } else if (event.clientY >= domRect.y + domRect.height - this._captureArea && event.clientY <= domRect.y + domRect.height + this._captureArea) {
            this._resizeEl.nativeElement.style.cursor = 'ns-resize';
        } else {
            this._resizeEl.nativeElement.style.cursor = 'default';
        }
    }

    enableMove(axis: string, sign: number) {
        const style = window.getComputedStyle(this._resizeEl.nativeElement, null);

        window.onmousedown = (event) => {
            window.onmousemove = (eventmove) => {
                if (this._resizeStartPositionX != null && this._resizeStartPositionY != null) {

                    if (axis === 'X') {
                        let delta = this._resizeStartPositionX - eventmove.clientX;

                        if (Math.sign(sign) === Math.sign(delta)) {
                            delta = Math.abs(delta) * sign;
                        } else {
                            delta = -Math.abs(delta) * sign;
                        }

                        this._resizeEl.nativeElement.style.width = parseInt(style.width, 10) + delta + 'px';
                        console.log(delta);
                    }
                }
            };

            this._resizeStartPositionX = event.clientX;
            this._resizeStartPositionY = event.clientY;
        };

        window.onmouseup = (event) => {
            window.onmousedown = null;
            window.onmousemove = null;
        };
    }
}
