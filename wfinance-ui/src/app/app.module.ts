import {ToastrModule} from 'ngx-toastr';
import {AppComponent} from './app.component';
import {CoreModule} from "./core/core.module";
import ptBr from '@angular/common/locales/pt';
import {LOCALE_ID, NgModule} from '@angular/core';
import {registerLocaleData} from "@angular/common";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {BrowserModule} from '@angular/platform-browser';
import {APP_ROUTING_PROVIDER, ROUTING} from './app.routing';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpErrorInterceptor} from "./core/interceptors/http-error-interceptor";
import {DatePickerCustomAdapter, DatePickerCustomDateParserFormatter} from "./shared";
import {NgbDateAdapter, NgbDateParserFormatter, NgbModule} from '@ng-bootstrap/ng-bootstrap';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ROUTING,
    NgbModule,
    CoreModule,
    BrowserModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    APP_ROUTING_PROVIDER,
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: NgbDateAdapter, useClass: DatePickerCustomAdapter },
    { provide: NgbDateParserFormatter, useClass: DatePickerCustomDateParserFormatter },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
