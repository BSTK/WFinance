import {Api} from "../../../api";
import {tap} from "rxjs/operators";
import {Usuario} from "./usuario.model";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {EventEmitter, Injectable} from '@angular/core';
import {isNull, notEmpty} from "../../../shared/utils/object-utils";
import {
  KEY_AUTHORITIES,
  KEY_OAUTH_ACCESS_TOKEN,
  PARAM_ACCESS_TOKEN,
  REFRESH_TOKEN_PAYLOAD
} from "../../../shared/utils/constants/seguranca.constants";

@Injectable({
  providedIn: 'root'
})
export class AutenticadorService {

  readonly jwtPayload = { payload: '' };
  readonly eventUsuarioLoginInvalido: EventEmitter<any> = new EventEmitter<any>();
  readonly usuarioLogado: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private readonly httpClient: HttpClient,
              private readonly jwtHelperService: JwtHelperService) {
    this.carregarTokenOAuth();
  }

  login(usuario: Usuario): Observable<any> {
    const body = `username=${ usuario.email }&password=${ usuario.senha }&grant_type=password`;
    return this.httpClient.post(Api.URLS.oauth.token, body, { withCredentials: true })
      .pipe(
        tap((accessTokenResponse: any) => {
          if (accessTokenResponse && accessTokenResponse[PARAM_ACCESS_TOKEN]) {
            this.armazenarToken(accessTokenResponse[PARAM_ACCESS_TOKEN]);
          }
        })
      );
  }

  logout(): void {
    console.log('logout()');
    this.httpClient.delete(Api.URLS.oauth.logout,{ withCredentials: true });
    this.removerAccessToken();
    this.usuarioLogado.next(false);
  }

  novoAccessToken(): Observable<any> {
    return this.httpClient
      .post(Api.URLS.oauth.token, REFRESH_TOKEN_PAYLOAD, { withCredentials: true })
      .pipe(
        tap((accessTokenResponse: any) => {
          if (accessTokenResponse && accessTokenResponse[PARAM_ACCESS_TOKEN]) {
            this.armazenarToken(accessTokenResponse[PARAM_ACCESS_TOKEN]);
          }
        })
      );
  }

  accessTokenExpirado(): boolean {
    const token = localStorage.getItem(KEY_OAUTH_ACCESS_TOKEN);
    return isNull(token) || this.jwtHelperService.isTokenExpired(token);
  }

  temPermissao(permissao: string) {
    return this.jwtPayload.payload[KEY_AUTHORITIES]
        && this.jwtPayload.payload[KEY_AUTHORITIES].includes(permissao);
  }

  temPermissoes(permissoes: string[]): boolean {
    for (const permissao of permissoes) {
      if (this.temPermissao(permissao)) {
        return true;
      }
    }

    return false;
  }

  verificaUsuarioLogado() {
    if (!this.accessTokenExpirado()) {
      this.usuarioLogado.next(true);
    }
  }

  private removerAccessToken() {
    this.jwtPayload.payload = null;
    localStorage.removeItem(KEY_OAUTH_ACCESS_TOKEN);
  }

  private carregarTokenOAuth() {
    const token = localStorage.getItem(KEY_OAUTH_ACCESS_TOKEN);
    if (token) {
      this.armazenarToken(token);
    }
  }

  private armazenarToken(accessToken: string) {
    if (notEmpty(accessToken)) {
      this.jwtPayload.payload = this.jwtHelperService.decodeToken(accessToken);
      localStorage.setItem(KEY_OAUTH_ACCESS_TOKEN, accessToken);
    }
  }

}
