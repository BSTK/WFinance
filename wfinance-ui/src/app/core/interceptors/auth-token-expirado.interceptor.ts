import {Api} from "../../api";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AutenticadorService} from "../../modules/seguranca/domain/autenticador.service";
import {KEY_OAUTH_ACCESS_TOKEN} from "../../shared/utils/constants/seguranca.constants";
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER} from "../../shared/utils/constants/http-headers.constants";

@Injectable({
  providedIn: 'root'
})
export class AuthTokenExpiradoInterceptor implements HttpInterceptor {

  constructor(private readonly autenticadorService: AutenticadorService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request && request.url !== Api.URLS.oauth.token && this.autenticadorService.accessTokenExpirado()) {
      this.autenticadorService.novoAccessToken()
        .subscribe((_) => {
          const headers = new HttpHeaders()
            .append(HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER.concat(localStorage.getItem(KEY_OAUTH_ACCESS_TOKEN)));

          const newRequest = request.clone({ headers });
          return next.handle(newRequest);
        });
    }

    return next.handle(request);
  }

}
