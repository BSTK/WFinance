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
    const isUrlToken: boolean = request && request.url !== Api.URLS.oauth.token;
    const isTokenExpirado: boolean = this.autenticadorService.accessTokenExpirado();

    if (isUrlToken && isTokenExpirado) {
      this.autenticadorService
        .novoAccessToken()
        .subscribe((_) => {
          const headers = new HttpHeaders()
            .append(HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER.concat(localStorage.getItem(KEY_OAUTH_ACCESS_TOKEN)));

          const novaRequest = request.clone({ headers });
          return next.handle(novaRequest);
        });
    }

    return next.handle(request);
  }

}
