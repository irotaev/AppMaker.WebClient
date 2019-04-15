import {ElementRef, HostListener, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentResizeService {

  fontSize = 18;
  private _el: ElementRef;

  private _isChangeable = false;
  private _clickedEl: HTMLElement;
  private _clickedElDirection: ArrowDirection;

  constructor() {
  }

  public makeResizable(el: ElementRef) {
    this._el = el;

    // this.appendResizeArrow(el.nativeElement, ArrowDirection.TopRight);
    // this.appendResizeArrow(el.nativeElement, ArrowDirection.TopLeft);
    this.appendResizeArrow(ArrowDirection.BottomRight);
    // this.appendResizeArrow(el.nativeElement, ArrowDirection.BottomLeft);

    document.onmouseup = (event: MouseEvent) => {
      this._isChangeable = false;
      this._clickedEl = null;
      this._clickedElDirection = null;

      event.stopImmediatePropagation();
      event.stopPropagation();
    };

    document.onmousemove = (event: MouseEvent) => {
      if (!this._isChangeable) {
        return;
      }

      this.resizeElement(event);
    };
  }

  private appendResizeArrow(direction: ArrowDirection): HTMLElement {

    const iconEl = this.createArrow(direction);

    this.recalculateArrowPosition(iconEl, direction);

    this._el.nativeElement.appendChild(iconEl);

    iconEl.onmousedown = (event: MouseEvent) => {
      this._isChangeable = true;
      this._clickedEl = event.target as HTMLElement;
      this._clickedElDirection = direction;

      event.stopImmediatePropagation();
      event.stopPropagation();
      event.preventDefault();
    };

    return iconEl;
  }

  private recalculateArrowPosition(arrow: HTMLElement, direction: ArrowDirection) {
    if (direction === ArrowDirection.TopLeft) {
      arrow.style.top = 0 - this.fontSize / 2 + 'px';
      arrow.style.left = 0 - this.fontSize / 2 + 'px';
    } else if (direction === ArrowDirection.BottomLeft) {
      arrow.style.top = this._el.nativeElement.clientHeight - this.fontSize / 2 + 'px';
      arrow.style.left = 0 - this.fontSize / 2 + 'px';
    } else if (direction === ArrowDirection.BottomRight) {
      arrow.style.top = this._el.nativeElement.clientHeight - this.fontSize / 2 + 'px';
      arrow.style.left = this._el.nativeElement.clientWidth - this.fontSize / 2 + 'px';
    } else if (direction === ArrowDirection.TopRight) {
      arrow.style.top = 0 - this.fontSize / 2 + 'px';
      arrow.style.left = this._el.nativeElement.clientWidth - this.fontSize / 2 + 'px';
    }
  }

  private createArrow(direction: ArrowDirection): HTMLElement {
    const iconEl = document.createElement('i');
    iconEl.className = 'material-icons';
    iconEl.innerText = 'unfold_more';

    iconEl.style.position = 'absolute';
    iconEl.style.fontSize = this.fontSize + 'px';
    iconEl.style.cursor = 'hand';

    if (direction === ArrowDirection.TopRight) {
      iconEl.style.transform = 'rotate(45deg)';
      iconEl.className += ' top-right';
    } else if (direction === ArrowDirection.TopLeft) {
      iconEl.style.transform = 'rotate(-45deg)';
      iconEl.className += ' top-left';
    } else if (direction === ArrowDirection.BottomRight) {
      iconEl.style.transform = 'rotate(120deg)';
      iconEl.className += ' bottom-right';
    } else if (direction === ArrowDirection.BottomLeft) {
      iconEl.style.transform = 'rotate(-120deg)';
      iconEl.className += ' bottom-left';
    }

    return iconEl;
  }

  private resizeElement(event: MouseEvent) {

    if (this._clickedElDirection === ArrowDirection.BottomRight) {
      this._el.nativeElement.style.width = parseInt(this._el.nativeElement.style.width, 10) + event.movementX + 'px';
      this._el.nativeElement.style.height = parseInt(this._el.nativeElement.style.height, 10) + event.movementY + 'px';
    }

    this.recalculateArrowPosition(this._clickedEl, this._clickedElDirection);
  }
}

enum ArrowDirection {
  TopLeft,
  TopRight,
  BottomLeft,
  BottomRight
}
