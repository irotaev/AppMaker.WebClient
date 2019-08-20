import * as Collections from 'typescript-collections';
import * as _ from 'lodash';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QueueRoutine {
  private readonly _routines = new Collections.Dictionary<string, Array<{ index: number, routing: (value: any) => void }>>();

  addRoutine(key: string, index: number, routine: (value: any) => void) {
    let exists = false;

    if (!this._routines.containsKey(key)) {
      this._routines.setValue(key, []);
      exists = true;
    }

    this._routines.getValue(key).push({index, routing: routine});

    return exists;
  }

  next(key: string, value: any) {
    if (!this._routines.containsKey(key)) {
      return;
    }

    const routines = _.sortBy(this._routines.getValue(key), x => x.index);

    _.forEach(routines, element => {
      element.routing(value);
    });
  }

  getLast(key: string): (value: any) => void {
    if (!this._routines.containsKey(key)) {
      return null;
    }

    return _.maxBy(this._routines.getValue(key), x => x.index).routing;
  }
}
