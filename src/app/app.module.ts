import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ArtboardComponent} from './artboard/artboard.component';

import {NgDragDropModule} from 'ng-drag-drop';

@NgModule({
    declarations: [
        AppComponent,
        ArtboardComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        NgDragDropModule.forRoot(),

        MatToolbarModule,
        MatIconModule,
        MatButtonModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
