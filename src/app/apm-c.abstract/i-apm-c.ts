import {Component, ViewContainerRef} from '@angular/core';
import {IUniqueElement} from '../abstract/i-unique-element';
import {Store} from '../store.abstract/store';

export interface IApmC extends IUniqueElement {
  childComponentsContainer: ViewContainerRef;
  componentSettings: Store;
}
