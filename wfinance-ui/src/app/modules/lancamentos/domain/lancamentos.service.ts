import {Observable} from "rxjs";
import {Injectable} from '@angular/core';
import {notEmpty} from "../../../shared/utils/object-utils";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Api, HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN} from "../../../api";
import {LancamentosFiltro} from "../components/lancamentos-pesquisa/lancamentos-filtro.model";

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {

  readonly PARAMS_SIZE = 'size';
  readonly PARAMS_PAGE = 'page';
  readonly PARAMS_DESCRICAO = 'descricao';
  readonly PARAMS_DATA_VENCIMENTO_DE = 'dataVencimentoDe';
  readonly PARAMS_DATA_VENCIMENTO_ATE = 'dataVencimentoAte';

  constructor(private httpClient: HttpClient) { }

  lancamentos(): Observable<any[]> {
    const headers = new HttpHeaders()
      .append(HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN);

    return this.httpClient.get<any[]>(Api.URLS.lancamentos.lancamentos, { headers });
  }

  resumo(filtro: LancamentosFiltro): Observable<any[]> {
    const headers = new HttpHeaders()
      .append(HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN);

    let params = new HttpParams()
          .append(this.PARAMS_PAGE, filtro.pagina)
          .append(this.PARAMS_SIZE, filtro.itensPorPagina);

    if (notEmpty(filtro.descricao)) {
      params = params.append(this.PARAMS_DESCRICAO, filtro.descricao);
    }

    if (notEmpty(filtro.dataVencimentoDe)) {
      params = params.append(this.PARAMS_DATA_VENCIMENTO_DE, filtro.dataVencimentoDe);
    }

    if (notEmpty(filtro.dataVencimentoAte)) {
      params = params.append(this.PARAMS_DATA_VENCIMENTO_ATE, filtro.dataVencimentoAte);
    }

    return this.httpClient.get<any[]>(Api.URLS.lancamentos.resumo, { headers, params });
  }

}
