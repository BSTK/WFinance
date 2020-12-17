import {Observable} from "rxjs";
import {Injectable} from '@angular/core';
import {Pessoa, PessoasFiltro} from "./pessoa.model";
import {notEmpty} from "../../../shared/utils/object-utils";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Api, HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN} from "../../../api";

@Injectable({
  providedIn: 'root'
})
/// TODO: REFATORAR PARA O USO DE 'FORNECEDORES'
export class PessoasService {

  readonly PARAMS_NOME = 'nome';

  constructor(private httpClient: HttpClient) { }

  pessoas(): Observable<Pessoa[]> {
    const headers = new HttpHeaders()
      .append(HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN);

    return this.httpClient.get<Pessoa[]>(Api.URLS.fornecedores.fornecedores, { headers });
  }

  /// TODO: IMPLEMENTAR PAGINAÇÃO PARA PESQUISA DE PESSOAS
  /// TODO: let params = new HttpParams()
  /// TODO:      .append(this.PARAMS_PAGE, filtro.pagina)
  /// TODO:      .append(this.PARAMS_SIZE, filtro.itensPorPagina);
  pessoasPorNome(filtro: PessoasFiltro): Observable<Pessoa[]> {
    const headers = new HttpHeaders()
      .append(HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN);

    let params = new HttpParams();

    if (notEmpty(filtro.nome)) {
      params = params.set(this.PARAMS_NOME, filtro.nome);
    }

    return this.httpClient.get<Pessoa[]>(Api.URLS.fornecedores.fornecedores, { headers, params });
  }

}
