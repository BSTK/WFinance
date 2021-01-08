import {Router} from "@angular/router";
import {Usuario} from "../../domain/usuario.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Component, EventEmitter, OnInit} from '@angular/core';
import {notEmpty} from "../../../../shared/utils/object-utils";
import {
  Api,
  HTTP_HEADER_APPLICATION_FORM_URLENCODED,
  HTTP_HEADER_AUTHORIZATION,
  HTTP_HEADER_CONTENT_TYPE
} from "../../../../api";
import {JwtHelperService} from "@auth0/angular-jwt";
import {tap} from "rxjs/operators";

@Component({
  selector: 'wf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private readonly PARAM_ACCESS_TOKEN = 'access_token';
  private readonly KEY_OAUTH_ACCESS_TOKEN = 'KEY_OAUTH_ACCESS_TOKEN';

  readonly usuario: Usuario = new Usuario();
  readonly jwtPayload = { payload: '' };
  readonly eventUsuarioLogado: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private readonly router: Router,
              private readonly httpClient: HttpClient,
              private readonly jwtHelperService: JwtHelperService) { }

  /// TODO: REFATORAR PARA AUTORIZADOR_SERVICE
  ngOnInit(): void {
    this.carregarTokenOAuth();
  }

  /// TODO: REFATORAR PARA AUTORIZADOR_SERVICE
  login() {
    if (notEmpty(this.usuario.email) && notEmpty(this.usuario.senha)) {
      const headers = new HttpHeaders()
        .append(HTTP_HEADER_AUTHORIZATION, 'Basic d2ViLWFuZ3VsYXI6d2ViLWFuZ3VsYXItcHdk')
        .append(HTTP_HEADER_CONTENT_TYPE, HTTP_HEADER_APPLICATION_FORM_URLENCODED);

      /// TODO: REFATORAR PARA FUNÇÃO
      const body = `username=${ this.usuario.email }&password=${ this.usuario.senha }&grant_type=password`;
      this.httpClient
        .post(Api.URLS.oauth.token, body,{ headers })
        .subscribe((accessTokenResponse: any) => {
          /// TODO: CASO DE SUCESSO
          if (accessTokenResponse && accessTokenResponse[this.PARAM_ACCESS_TOKEN]) {
            console.log('======= LOGIN SUCESSO =======');
            this.armazenarToken(accessTokenResponse[this.PARAM_ACCESS_TOKEN]);
            this.eventUsuarioLogado.emit(true);
            this.router.navigate(['/lancamentos']);
          }
      });
    }
  }

  /// TODO: REFATORAR PARA AUTORIZADOR_SERVICE
  private carregarTokenOAuth() {
    const token = localStorage.getItem(this.KEY_OAUTH_ACCESS_TOKEN);
    if (token) {
      this.armazenarToken(token);
    }
  }

  /// TODO: REFATORAR PARA AUTORIZADOR_SERVICE
  private armazenarToken(accessToken: string) {
    if (notEmpty(accessToken)) {
      this.jwtPayload.payload = this.jwtHelperService.decodeToken(accessToken);
      localStorage.setItem(this.KEY_OAUTH_ACCESS_TOKEN, accessToken);
    }
  }

}
