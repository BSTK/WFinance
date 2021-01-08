import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {EventEmitter, Injectable, OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticadorService implements OnInit {

  /// TODO: REFATORAR SERVIÇOS
  private readonly PARAM_ACCESS_TOKEN = 'access_token';
  private readonly KEY_OAUTH_ACCESS_TOKEN = 'KEY_OAUTH_ACCESS_TOKEN';

  /// TODO: REFATORAR SERVIÇOS
  readonly jwtPayload = { payload: '' };
  readonly eventUsuarioLogado: EventEmitter<boolean> = new EventEmitter<boolean>();

  /// TODO: REFATORAR SERVIÇOS
  constructor(private readonly httpClient: HttpClient,
              private readonly jwtHelperService: JwtHelperService) { }

  /// TODO: REFATORAR SERVIÇOS
  ngOnInit(): void {
    //// this.carregarTokenOAuth();
  }

}
