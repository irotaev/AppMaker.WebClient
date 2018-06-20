import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ArtboardComponent} from './artboard/artboard.component';

import {NgDragDropModule} from 'ng-drag-drop';
import {AmDraggableDirective} from './directive/am-draggable.directive';
import { FlexboxComponent } from './flexbox/flexbox.component';
import { FlexboxSettingsEditorComponent } from './flexbox.settingseditor/flexbox.settingseditor.component';
import { PropertyEditorComponent } from './component-property/property-editor.component';

@NgModule({
    declarations: [
        AppComponent,
        ArtboardComponent,
        AmDraggableDirective,
        FlexboxComponent,
        FlexboxSettingsEditorComponent,
        PropertyEditorComponent
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
    bootstrap: [AppComponent],
    entryComponents: [FlexboxComponent, FlexboxSettingsEditorComponent]
})
export class AppModule {
}
