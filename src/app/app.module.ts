import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ArtboardComponent} from './artboard/artboard.component';
import {ComponentListComponent} from './component-list/component-list.component';
import {ComponentFlexboxComponent} from './component-flexbox/component-flexbox.component';


@NgModule({
  declarations: [
    AppComponent,
    ArtboardComponent,
    ComponentListComponent,
    ComponentFlexboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
