import {Observable} from "rxjs";
import {Injectable} from '@angular/core';
import {Pessoa, PessoasFiltro} from "./pessoa.model";
import {Paginacao} from "../../../shared/components";
import {isNull, notEmpty} from "../../../shared/utils/object-utils";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {
  Api,
  HTTP_HEADER_APPLICATION_JSON,
  HTTP_HEADER_AUTHORIZATION,
  HTTP_HEADER_BEARER_TOKEN,
  HTTP_HEADER_CONTENT_TYPE
} from "../../../api";

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  readonly PARAMS_NOME = 'nome';
  readonly PARAMS_PAGINA_ATUAL = 'page';
  readonly PARAMS_ITENS_POR_PAGINA = 'size';

  constructor(private httpClient: HttpClient) { }

  pessoa(pessoaId: number): Observable<Pessoa> {
    const headers = new HttpHeaders()
      .append(HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN);

    return this.httpClient.get<Pessoa>(`${Api.URLS.fornecedores.fornecedores}/${pessoaId}`, { headers });
  }

  pessoas(paginacao: Paginacao): Observable<any[]> {
    const headers = new HttpHeaders()
      .append(HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN);

    let params = new HttpParams()
      .append(this.PARAMS_PAGINA_ATUAL, paginacao.pagina.toString())
      .append(this.PARAMS_ITENS_POR_PAGINA, paginacao.itensPorPagina.toString());

    return this.httpClient.get<any[]>(Api.URLS.fornecedores.fornecedores, { headers, params });
  }

  resumo(filtro: PessoasFiltro, paginacao: Paginacao): Observable<any[]> {
    const headers = new HttpHeaders()
      .append(HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN);

    let params = new HttpParams()
      .append(this.PARAMS_PAGINA_ATUAL, paginacao.pagina.toString())
      .append(this.PARAMS_ITENS_POR_PAGINA, paginacao.itensPorPagina.toString());

    if (notEmpty(filtro.nome)) {
      params = params.append(this.PARAMS_NOME, filtro.nome);
    }

    return this.httpClient.get<any[]>(Api.URLS.fornecedores.fornecedores, { headers, params });
  }

  excluir(pessoa: Pessoa): Observable<void> {
    const headers = new HttpHeaders()
      .append(HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN);

    return this.httpClient.delete<void>(`${Api.URLS.fornecedores.fornecedores}/${pessoa.id}`, { headers });
  }

  salvar(pessoa: Pessoa): Observable<Pessoa> {
    const headers = new HttpHeaders()
      .append(HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN);

    return (isNull(pessoa.id))
      ? this.httpClient.post<Pessoa>(Api.URLS.fornecedores.fornecedores, pessoa, { headers })
      : this.httpClient.put<Pessoa>(`${Api.URLS.fornecedores.fornecedores}/${pessoa.id}`, pessoa, { headers });
  }

  ativar(pessoa: Pessoa): Observable<Pessoa> {
    const headers = new HttpHeaders()
      .append(HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN)
      .append(HTTP_HEADER_CONTENT_TYPE, HTTP_HEADER_APPLICATION_JSON);

    const body = !pessoa.ativo;
    return this.httpClient.put<Pessoa>(`${Api.URLS.fornecedores.fornecedores}/${pessoa.id}/ativo`, body, { headers });
  }
}
