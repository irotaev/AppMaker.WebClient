import {Injectable, Type} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TypeListService {
    private readonly types: { type: Type<any>, name: string }[] = [];

    public addType(name: string, type: Type<any>) {
        if (this.findType(name) != null) {
            return;
        }

        this.types.push({type: type, name: name});
    }

    public findType(name: string) {
        return this.types.find(t => t.name === name);
    }
}