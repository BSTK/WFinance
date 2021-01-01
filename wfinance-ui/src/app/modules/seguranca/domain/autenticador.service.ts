import {Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {Usuario} from "./usuario.model";
import {JwtHelperService} from "@auth0/angular-jwt";
import {notEmpty} from "../../../shared/utils/object-utils";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {
  Api,
  HTTP_HEADER_APPLICATION_FORM_URLENCODED,
  HTTP_HEADER_AUTHORIZATION,
  HTTP_HEADER_CONTENT_TYPE
} from "../../../api";

@Injectable({
  providedIn: 'root'
})
export class AutenticadorService implements OnInit {

  private readonly PARAM_ACCESS_TOKEN = 'access_token';
  private readonly KEY_OAUTH_ACCESS_TOKEN = 'KEY_OAUTH_ACCESS_TOKEN';

  readonly jwtPayload = { payload: '' };
  readonly eventUsuarioLogado: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private readonly httpClient: HttpClient,
              private readonly jwtHelperService: JwtHelperService) { }

  ngOnInit(): void {
    this.carregarTokenOAuth();
  }

  /// TODO: REMOVER STRINGS EM HARDCODE
  login(usuario: Usuario): Observable<any> {
    if (usuario) {
      const headers = new HttpHeaders()
        .append(HTTP_HEADER_AUTHORIZATION, 'Basic d2ViLWFuZ3VsYXI6d2ViLWFuZ3VsYXItcHdk')
        .append(HTTP_HEADER_CONTENT_TYPE, HTTP_HEADER_APPLICATION_FORM_URLENCODED);

      /// TODO: REFATORAR PARA FUNÇÃO
      const body = `username=${ usuario.email }&password=${ usuario.senha }&grant_type=password`;
      const observable = this.httpClient.post(Api.URLS.oauth.token, body,{ headers });

      observable.subscribe((accessTokenResponse: any) => {
        if (accessTokenResponse && accessTokenResponse[this.PARAM_ACCESS_TOKEN]) {
          this.armazenarToken(accessTokenResponse[this.PARAM_ACCESS_TOKEN]);
        }
      });

      return observable;
    }

    return of ({});
  }

  private carregarTokenOAuth() {
    const token = localStorage.getItem(this.KEY_OAUTH_ACCESS_TOKEN);
    if (token) {
      this.armazenarToken(token);
    }
  }

  private armazenarToken(accessToken: string) {
    if (notEmpty(accessToken)) {
      this.jwtPayload.payload = this.jwtHelperService.decodeToken(accessToken);
      localStorage.setItem(this.KEY_OAUTH_ACCESS_TOKEN, accessToken);
    }
  }

}
