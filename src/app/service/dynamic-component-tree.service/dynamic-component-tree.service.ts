import {Injectable} from '@angular/core';
import {ComponentBranch} from './component-branch';

@Injectable({
    providedIn: 'root'
})
export class DynamicComponentTreeService {

    private readonly _componentList: Array<ComponentBranch> = [];

    public addBranch(branch: ComponentBranch, childOfName?: string) {
        this._componentList.push(branch);

        const parentBranch = childOfName != null ? this.findBranchByComponentCode(childOfName) : null;

        if (parentBranch != null) {
            parentBranch.addChildBranch(branch);
            branch.parentBranch = parentBranch;
        }
    }

    public findBranchByComponentCode(code: string): ComponentBranch {
        if (this._componentList.length === 0) {
            return null;
        }

        return this._componentList.find(c => c.componentCode === code);
    }

    public findBranchByComponentType(type: string): ComponentBranch {
        if (this._componentList.length === 0) {
            return null;
        }

        return this._componentList.find(c => c.componentType === type);
    }
}
