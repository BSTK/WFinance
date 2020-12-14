import {Observable} from "rxjs";
import {Injectable} from '@angular/core';
import {notEmpty} from "../../shared/utils/object-validate";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Api, HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN} from "../../api";
import {LancamentosFiltro} from "./componentes/lancamentos-pesquisa/lancamentos-filtro.model";

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {

  constructor(private httpClient: HttpClient) { }

  lancamentos(): Observable<any[]> {
    const headers = new HttpHeaders()
      .append(HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN);

    return this.httpClient.get<any[]>(Api.URLS.lancamentos.lancamentos, { headers });
  }

  resumo(filtro: LancamentosFiltro): Observable<any[]> {
    const headers = new HttpHeaders()
      .append(HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN);

    let params = new HttpParams();

    if (notEmpty(filtro.descricao)) {
      params = params.append('descricao', filtro.descricao);
    }

    if (notEmpty(filtro.dataVencimentoDe)) {
      params = params.append('dataVencimentoDe', filtro.dataVencimentoDe);
    }

    if (notEmpty(filtro.dataVencimentoAte)) {
      params = params.append('dataVencimentoAte', filtro.dataVencimentoAte);
    }

    return this.httpClient.get<any[]>(Api.URLS.lancamentos.resumo, { headers, params });
  }

}
