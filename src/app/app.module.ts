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
import {CListComponent} from './c-list/c-list.component';
import {AmpCFlexboxComponent} from './apm-c.flexbox/amp-c-flexbox.component';
import { CPropertyListComponent } from './c-property-list/c-property-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ArtboardComponent,
    CListComponent,
    AmpCFlexboxComponent,
    CPropertyListComponent
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
  entryComponents: [AmpCFlexboxComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
