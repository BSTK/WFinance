import {Observable} from "rxjs";
import {Api} from "../../../api";
import {Injectable} from '@angular/core';
import {Pessoa, PessoasFiltro} from "./pessoa.model";
import {Paginacao} from "../../../shared/components";
import {HttpClient, HttpParams} from "@angular/common/http";
import {isNull, notEmpty} from "../../../shared/utils/object-utils";
import {ListagemDadosService} from '../../../shared/components/listagem-dados/listagem-dados.service';

@Injectable({
  providedIn: 'root'
})
export class PessoasService implements ListagemDadosService {

  readonly PARAMS_NOME = 'nome';
  readonly PARAMS_PAGINA_ATUAL = 'page';
  readonly PARAMS_ITENS_POR_PAGINA = 'size';

  constructor(private httpClient: HttpClient) { }

  pessoa(pessoaId: number): Observable<Pessoa> {
    return this.httpClient.get<Pessoa>(`${Api.URLS.fornecedores.fornecedores}/${pessoaId}`);
  }

  carregar(paginacao: Paginacao): Observable<any[]> {
    const params = new HttpParams()
      .append(this.PARAMS_PAGINA_ATUAL, paginacao.pagina.toString())
      .append(this.PARAMS_ITENS_POR_PAGINA, paginacao.itensPorPagina.toString());

    return this.httpClient.get<any[]>(Api.URLS.fornecedores.fornecedores, { params });
  }

  resumo(filtro: PessoasFiltro, paginacao: Paginacao): Observable<any[]> {
    let params = new HttpParams()
      .append(this.PARAMS_PAGINA_ATUAL, paginacao.pagina.toString())
      .append(this.PARAMS_ITENS_POR_PAGINA, paginacao.itensPorPagina.toString());

    if (notEmpty(filtro.nome)) {
      params = params.append(this.PARAMS_NOME, filtro.nome);
    }

    return this.httpClient.get<any[]>(Api.URLS.fornecedores.fornecedores, { params });
  }

  excluir(pessoa: Pessoa): Observable<void> {
    return this.httpClient.delete<void>(`${Api.URLS.fornecedores.fornecedores}/${pessoa.id}`);
  }

  salvar(pessoa: Pessoa): Observable<Pessoa> {
    return (isNull(pessoa.id))
      ? this.httpClient.post<Pessoa>(Api.URLS.fornecedores.fornecedores, pessoa)
      : this.httpClient.put<Pessoa>(`${Api.URLS.fornecedores.fornecedores}/${pessoa.id}`, pessoa);
  }

  ativar(pessoa: Pessoa): Observable<Pessoa> {
    const body = !pessoa.ativo;
    return this.httpClient.put<Pessoa>(`${Api.URLS.fornecedores.fornecedores}/${pessoa.id}/ativo`, body);
  }
}
