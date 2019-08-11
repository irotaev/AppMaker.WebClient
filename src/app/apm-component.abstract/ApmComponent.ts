import {IComponent} from './IComponent';
import {Component, ViewContainerRef} from '@angular/core';

export abstract class ApmComponent implements IComponent {
  component: Component;
  componentContainer: ViewContainerRef;

  get id() {
    return Math.random();
  }
}
