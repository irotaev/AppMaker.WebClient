import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ArtboardComponent} from './artboard/artboard.component';
import {CListComponent} from './cList/cList.component';
import {AmpCFlexboxComponent} from './apmC.flexbox/ampCFlexbox.component';
import {CPropertyListComponent} from './cPropertyList/cPropertyList.component';
import {ApmCPropertyEditorComponent} from './apm-c-property-editor/apm-c-property-editor.component';


@NgModule({
  declarations: [
    AppComponent,
    ArtboardComponent,
    CListComponent,
    AmpCFlexboxComponent,
    CPropertyListComponent,
    ApmCPropertyEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonToggleModule
  ],
  entryComponents: [AmpCFlexboxComponent, CPropertyListComponent, ApmCPropertyEditorComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
