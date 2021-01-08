import {Api} from "../../../api";
import {tap} from "rxjs/operators";
import {Usuario} from "./usuario.model";
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {notEmpty} from "../../../shared/utils/object-utils";
import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {KEY_OAUTH_ACCESS_TOKEN, PARAM_ACCESS_TOKEN} from "../../../shared/utils/constants/seguranca.constants";

@Injectable({
  providedIn: 'root'
})
export class AutenticadorService implements OnInit {

  readonly eventUsuarioLoginInvalido: EventEmitter<any> = new EventEmitter<any>();
  readonly eventUsuarioLogado: EventEmitter<boolean> = new EventEmitter<boolean>();

  private readonly jwtPayload = { payload: '' };

  constructor(private readonly httpClient: HttpClient,
              private readonly jwtHelperService: JwtHelperService) { }

  ngOnInit(): void {
    this.carregarTokenOAuth();
  }

  login(usuario: Usuario) {
    const body = `username=${ usuario.email }&password=${ usuario.senha }&grant_type=password`;
    return this.httpClient.post(Api.URLS.oauth.token, body)
      .pipe(
        tap((accessTokenResponse: any) => {
          if (accessTokenResponse && accessTokenResponse[PARAM_ACCESS_TOKEN]) {
            this.armazenarToken(accessTokenResponse[PARAM_ACCESS_TOKEN]);
          }
        })
      );
  }

  /// TODO: CHAMAR SEMPRE QUE CARREGAR A PÁGINA
  usuarioAutenticado() {
    const token = localStorage.getItem(KEY_OAUTH_ACCESS_TOKEN);
    if (token) {
      this.eventUsuarioLogado.emit(true);
    }
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
