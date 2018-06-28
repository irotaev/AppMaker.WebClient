import {AbstractComponent} from '../../abstract/abstract.component';
import {JsonConvert, JsonObject, JsonProperty} from 'json2typescript';
import {ComponentRef, ElementRef} from '@angular/core';

@JsonObject
export class ComponentBranch {

    @JsonProperty('childBranches', [ComponentBranch])
    public childBranches: ComponentBranch[] = [];

    public parentBranch?: ComponentBranch = null;

    @JsonProperty('component', String)
    public componentJson: string = null;

    private _component: AbstractComponent;
    get component(): AbstractComponent {
        return this._component;
    }

    private _componentRef: ComponentRef<AbstractComponent>;
    get componentRef(): ComponentRef<AbstractComponent> {
        return this._componentRef;
    }

    private _elementRef: ElementRef;
    get elementRef(): ElementRef {
        return this._elementRef;
    }

    @JsonProperty('componentType', String)
    public componentType: string = null;

    @JsonProperty('componentCode', String)
    public componentCode: string = null;

    public static deserialize(json: string): ComponentBranch {
        const branch = new JsonConvert().deserializeObject(json, ComponentBranch);

        const setParentBranch = (b: ComponentBranch) => {
            b.childBranches.forEach(chB => {
                chB.parentBranch = branch;

                setParentBranch(chB);
            });
        };

        setParentBranch(branch);

        return branch;
    }

    public serialize(): string {
        return new JsonConvert().serializeObject(this);
    }

    constructor() {
    }

    public addComponent(component: AbstractComponent) {
        this.componentJson = JSON.stringify(new JsonConvert().serializeObject(component));
        this.componentType = component.typeStr;
        this.componentCode = component.code;
        this._component = component;
        this._elementRef = component.el;
    }

    public addComponentRef<T extends AbstractComponent>(componentRef: ComponentRef<T>) {
        this.addComponent(componentRef.instance);

        this._componentRef = componentRef;
    }

    public addElementRef(elementRef: ElementRef, code: string) {
        this._elementRef = elementRef;
        this.componentCode = code;
    }

    public addChildBranch(branch: ComponentBranch) {
        this.childBranches.push(branch);
    }

    public addParentBranch(branch: ComponentBranch) {
        this.parentBranch = branch;
    }
}
