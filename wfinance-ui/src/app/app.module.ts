import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {APP_ROUTING_PROVIDER, ROUTING} from './app.routing';
import {AppComponent} from './app.component';
import {CoreModule} from "./core/core.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ROUTING,
    CoreModule,
    NgbModule
  ],
  providers: [
    APP_ROUTING_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
