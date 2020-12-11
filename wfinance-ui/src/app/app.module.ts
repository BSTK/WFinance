import {AppComponent} from './app.component';
import {LOCALE_ID, NgModule} from '@angular/core';
import {CoreModule} from "./core/core.module";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserModule} from '@angular/platform-browser';
import {APP_ROUTING_PROVIDER, ROUTING} from './app.routing';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from "@angular/common";
registerLocaleData(ptBr);

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
    APP_ROUTING_PROVIDER,
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
