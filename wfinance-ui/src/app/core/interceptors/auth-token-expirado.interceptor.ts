import {Api} from "../../api";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AutenticadorService} from "../../modules/seguranca/domain/autenticador.service";
import {KEY_OAUTH_ACCESS_TOKEN} from "../../shared/utils/constants/seguranca.constants";
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER} from "../../shared/utils/constants/http-headers.constants";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthTokenExpiradoInterceptor implements HttpInterceptor {

  constructor(private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute,
              private readonly autenticadorService: AutenticadorService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.autenticadorService
        .usuarioLogado.subscribe((usuarioLogado: boolean) => {
          if (usuarioLogado) {
            const isUrlToken: boolean = request && request.url !== Api.URLS.oauth.token;
            const isTokenExpirado: boolean = this.autenticadorService.accessTokenExpirado();

            if (isUrlToken && isTokenExpirado) {
              console.log('11 - NOVO_ACCESS_TOKEN');

              this.autenticadorService
                .novoAccessToken()
                .subscribe((_) => {
                  const headers = new HttpHeaders()
                    .append(HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER.concat(localStorage.getItem(KEY_OAUTH_ACCESS_TOKEN)));

                  const novaRequest = request.clone({ headers });
                  return next.handle(novaRequest);
                });
            }
          } else {
            console.log('1 - CONTINUANDO REQUEST - USUARIO NÃO-LOGADO!');
            return next.handle(request);
          }
    });

    console.log('2 - CONTINUANDO REQUEST - USUARIO NÃO-LOGADO!');
    return next.handle(request);
  }

}
