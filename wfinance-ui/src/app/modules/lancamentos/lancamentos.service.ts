import {Observable} from "rxjs";
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AppApi, HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN} from "../../app.api";
import {LancamentosFiltro} from "./componentes/lancamentos-pesquisa/lancamentos-filtro.model";

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {

  constructor(private httpClient: HttpClient) { }

  lancamentos(): Observable<any[]> {
    const headers = new HttpHeaders()
      .append(HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN);

    return this.httpClient.get<any[]>(AppApi.API.lancamentos.lancamentos, { headers });
  }

  resumo(lancamentoFiltro: LancamentosFiltro): Observable<any[]> {
    const headers = new HttpHeaders()
      .append(HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN);

    const params = new HttpParams()
      .append('descricao', lancamentoFiltro.descricao);

    return this.httpClient.get<any[]>(AppApi.API.lancamentos.resumo, { headers, params });
  }

}
