import {AppComponent} from './app.component';
import {CoreModule} from "./core/core.module";
import ptBr from '@angular/common/locales/pt';
import {LOCALE_ID, NgModule} from '@angular/core';
import {registerLocaleData} from "@angular/common";
import {BrowserModule} from '@angular/platform-browser';
import {APP_ROUTING_PROVIDER, ROUTING} from './app.routing';
import {DatePickerCustomAdapter} from "./shared/utils/datepicker/date-picker-custom-adapter";
import {NgbDateAdapter, NgbDateParserFormatter, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DatePickerCustomDateParserFormatter} from "./shared/utils/datepicker/date-picker-custom-date-parser-formatter";

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ROUTING,
    NgbModule,
    CoreModule,
    BrowserModule
  ],
  providers: [
    APP_ROUTING_PROVIDER,
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: NgbDateAdapter, useClass: DatePickerCustomAdapter },
    { provide: NgbDateParserFormatter, useClass: DatePickerCustomDateParserFormatter }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
