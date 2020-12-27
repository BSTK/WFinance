import {Observable} from "rxjs";
import {Injectable} from '@angular/core';
import {Paginacao} from "../../../shared";
import {Lancamento} from "./lancamento.model";
import {notEmpty} from "../../../shared/utils/object-utils";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Api, HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN} from "../../../api";
import {LancamentosFiltro} from "../components/lancamentos-pesquisa/lancamentos-filtro.model";

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {

  readonly PARAMS_PAGINA_ATUAL = 'page';
  readonly PARAMS_ITENS_POR_PAGINA = 'size';
  readonly PARAMS_DESCRICAO = 'descricao';
  readonly PARAMS_DATA_VENCIMENTO_DE = 'dataVencimentoDe';
  readonly PARAMS_DATA_VENCIMENTO_ATE = 'dataVencimentoAte';

  constructor(private httpClient: HttpClient) { }

  lancamentos(paginacao: Paginacao): Observable<any[]> {
    console.log('lancamentos() => paginacao: ', paginacao);
    const headers = new HttpHeaders()
      .append(HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN);

    let params = new HttpParams()
      .append(this.PARAMS_PAGINA_ATUAL, paginacao.pagina.toString())
      .append(this.PARAMS_ITENS_POR_PAGINA, paginacao.itensPorPagina.toString());

    return this.httpClient.get<any[]>(Api.URLS.lancamentos.lancamentos, { headers, params });
  }

  resumo(filtro: LancamentosFiltro, paginacao: Paginacao): Observable<any[]> {
    const headers = new HttpHeaders()
      .append(HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN);

    let params = new HttpParams()
      .append(this.PARAMS_PAGINA_ATUAL, paginacao.pagina.toString())
      .append(this.PARAMS_ITENS_POR_PAGINA, paginacao.itensPorPagina.toString());

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

  excluir(lancamento: Lancamento): Observable<void> {
    const headers = new HttpHeaders()
      .append(HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN);

    return this.httpClient.delete<void>(`${Api.URLS.lancamentos.lancamentos}/${lancamento.id}`, { headers });
  }

}
