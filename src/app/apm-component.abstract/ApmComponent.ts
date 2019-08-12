import {IComponent} from './IComponent';
import {Component, ViewContainerRef} from '@angular/core';
import {UniqueElementService} from '../routine/unique-element.service';

export abstract class ApmComponent implements IComponent {
  constructor(private _uniqueElementService: UniqueElementService) {
    this._id = _uniqueElementService.generateUniqueId();
  }

  private readonly _id: number;

  component: Component;
  componentContainer: ViewContainerRef;

  get id() {
    return this._id;
  }
}
