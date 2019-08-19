import * as Collections from 'typescript-collections';
import * as _ from 'lodash';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QueueRoutine {
  private readonly _routings = new Collections.Dictionary<string, Array<{ index: number, routing: (value: any) => void }>>();

  addRoutine(key: string, index: number, routine: (value: any) => void) {
    let exists = false;

    if (!this._routings.containsKey(key)) {
      this._routings[key] = [];
      exists = true;
    }

    this._routings.getValue(key).push({index, routing: routine});

    return exists;
  }

  next(key: string, value: any) {
    if (!this._routings.containsKey(key)) {
      return;
    }

    const getRouting = (index: number) => {
      const element = _.find(this._routings.getValue(key), x => x.index < index);

      if (!element) {
        return;
      }

      element.routing(value);
      getRouting(element.index);
    };

    getRouting(_.maxBy(this._routings.getValue(key), x => x.index).index + 1);
  }

  getLast(key: string): (value: any) => void {
    if (!this._routings.containsKey(key)) {
      return null;
    }

    return _.maxBy(this._routings.getValue(key), x => x.index).routing;
  }
}
