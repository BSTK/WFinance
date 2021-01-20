import {Api} from './api';
import {ToastrModule} from 'ngx-toastr';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import ptBr from '@angular/common/locales/pt';
import {LOCALE_ID, NgModule} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {environment} from '../environments/environment';
import {BrowserModule} from '@angular/platform-browser';
import {APP_ROUTING_PROVIDER, ROUTING} from './app.routing';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpErrorInterceptor} from './core/interceptors/http-error.interceptor';
import {AuthTokenInterceptor} from './core/interceptors/auth-token.interceptor';
import {AutenticadorGuard} from './modules/seguranca/domain/autenticador.guard';
import {AutenticadorService} from './modules/seguranca/domain/autenticador.service';
import {KEY_OAUTH_ACCESS_TOKEN} from './shared/utils/constants/seguranca.constants';
import {DatePickerCustomAdapter, DatePickerCustomDateParserFormatter} from './shared';
import {NgbDateAdapter, NgbDateParserFormatter, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthTokenExpiradoInterceptor} from './core/interceptors/auth-token-expirado.interceptor';

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
    BrowserAnimationsModule,

    /// TODO: 1 - Mover provider JwtModule para o módulo de de segurança e autenticação
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem(KEY_OAUTH_ACCESS_TOKEN),
        allowedDomains: [environment.httpWfinanceHost],
        disallowedRoutes: [Api.URLS.oauth.token]
      }
    })
  ],
  providers: [

    /// TODO: 2 - Mover providers AutenticadorService, AutenticadorGuard e JwtHelperService para o módulo de de segurança e autenticação
    AutenticadorService,
    AutenticadorGuard,
    JwtHelperService,

    APP_ROUTING_PROVIDER,
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: NgbDateAdapter, useClass: DatePickerCustomAdapter },
    { provide: NgbDateParserFormatter, useClass: DatePickerCustomDateParserFormatter },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenExpiradoInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
