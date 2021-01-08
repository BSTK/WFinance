import {Api} from "../../../api";
import {tap} from "rxjs/operators";
import {Usuario} from "./usuario.model";
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {isNull, notEmpty, notNull} from "../../../shared/utils/object-utils";
import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {
  KEY_OAUTH_ACCESS_TOKEN,
  PARAM_ACCESS_TOKEN,
  REFRESH_TOKEN_PAYLOAD
} from "../../../shared/utils/constants/seguranca.constants";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AutenticadorService implements OnInit {

  readonly jwtPayload = { payload: '' };
  readonly eventUsuarioLoginInvalido: EventEmitter<any> = new EventEmitter<any>();
  readonly eventUsuarioLogado: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private readonly httpClient: HttpClient,
              private readonly jwtHelperService: JwtHelperService) { }

  ngOnInit(): void {
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
