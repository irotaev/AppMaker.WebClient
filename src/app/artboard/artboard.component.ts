import {
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    HostListener,
    Injector,
    OnInit,
    Type,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {DynamicComponent} from '../abstract/dynamic.component';
import {FlexboxSettingsEditorComponent} from '../flexbox.settingseditor/flexbox.settingseditor.component';
import {ComponentUiFactory} from '../service/component-uifactory-resolver.service';
import {FlexboxComponent} from '../flexbox/flexbox.component';
import {ComponentBranch} from '../service/dynamic-component-tree.service/component-branch';
import {DynamicComponentTreeService} from '../service/dynamic-component-tree.service/dynamic-component-tree.service';
import {ElementRefSetting} from '../abstract/component-setting/element-ref-setting';

@Component({
    selector: 'am-artboard',
    templateUrl: './artboard.component.html',
    styleUrls: ['./artboard.component.scss']
})
export class ArtboardComponent extends FlexboxComponent implements OnInit {

    public readonly code = ArtboardComponent.name;

    elementRefSettings: ElementRefSetting[] = [];

    settingsEditorComponent: { type: Type<DynamicComponent>; settingsEditorComponent: ComponentRef<DynamicComponent> }[] = [{
        type: FlexboxSettingsEditorComponent,
        settingsEditorComponent: null
    }];

    @ViewChild('artboard', {read: ElementRef}) artboard: ElementRef;
    @ViewChild('artboardContainer', {read: ViewContainerRef}) artboardContainerRef: ViewContainerRef;
    private _scaleStep = 0.05;
    scale = 100;


    constructor(private elRef: ElementRef,
                private _dynamicComponentTree: DynamicComponentTreeService,
                private compiler: ComponentFactoryResolver,
                dynamicComponentTreeService: DynamicComponentTreeService,
                componentFactoryResolver: ComponentFactoryResolver,
                private componentUiFactory: ComponentUiFactory,
                injector: Injector) {

        super(elRef, dynamicComponentTreeService, componentFactoryResolver, injector);

        this.width = 'inherit';
        this.height = 'inherit';

        const componentBranch = new ComponentBranch();
        componentBranch.addComponent(this);
        this._dynamicComponentTree.addBranch(componentBranch);
    }

    ngOnInit() {
        if (!this.checkOverScale(this.scale)) {
            this.changeScale(-this._scaleStep);
        }

        this.el = this.artboard;
    }

    //#region Scale

    private changeScale(delta: number) {
        const deltaAbs = Math.abs(delta);

        if (deltaAbs >= 0.5 || deltaAbs <= 0.01) {
            return;
        }

        const scale = this.scale + delta;

        if (scale <= 0.3) {
            this.scale = 0.3;
            return;
        }

        if (!this.checkOverScale(scale)) {
            return;
        }

        if (scale >= 1) {
            this.scale = 1;
            return;
        }

        this.scale += delta;
    }

    private checkOverScale(scale: number, fix: boolean = true): boolean {
        if (this.artboard.nativeElement.offsetWidth * scale >= this.elRef.nativeElement.offsetWidth
            || this.artboard.nativeElement.offsetHeight * scale >= this.elRef.nativeElement.offsetHeight) {

            if (fix) {
                const fixScaleX: number = Number((this.elRef.nativeElement.offsetWidth / this.artboard.nativeElement.offsetWidth).toFixed(2)) - 0.01;
                const fixScaleY: number = Number((this.elRef.nativeElement.offsetHeight / this.artboard.nativeElement.offsetHeight).toFixed(2)) - 0.01;
                this.scale = fixScaleX <= fixScaleY ? fixScaleX : fixScaleY;
            }

            return false;
        }

        return true;
    }

    @HostListener('window:keydown', ['$event'])
    onKeydown(event: KeyboardEvent) {
        if (event.code === 'Equal') {
            this.changeScale(this._scaleStep);
        } else if (event.code === 'Minus') {
            this.changeScale(-this._scaleStep);
        }
    }

    @HostListener('window:mousewheel', ['$event'])
    onMouseWheel(event: MouseWheelEvent) {
        event.deltaY > 0 ? this.changeScale(this._scaleStep) : this.changeScale(-this._scaleStep);
    }

    //#endregion

    //#region Artboard format
    changeFormat(format: string) {
        if (format === 'desktop') {
            this.artboard.nativeElement.style.width = 1920 + 'px';
            this.artboard.nativeElement.style.height = 1080 + 'px';
        } else if (format === 'tablet') {
            this.artboard.nativeElement.style.width = 1024 + 'px';
            this.artboard.nativeElement.style.height = 768 + 'px';
        } else if (format === 'mobile') {
            this.artboard.nativeElement.style.width = 360 + 'px';
            this.artboard.nativeElement.style.height = 640 + 'px';
        }

        this.scale = 1;

        if (!this.checkOverScale(this.scale)) {
            this.changeScale(-this._scaleStep);
        }
    }

    //#endregion
}
