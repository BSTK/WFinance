import {Observable} from "rxjs";
import {Injectable} from '@angular/core';
import {Categoria} from "./categoria.model";
import {Paginacao} from "../../../shared/components";
import {notEmpty} from "../../../shared/utils/object-utils";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Api, HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN} from "../../../api";
import {CategoriasFiltro} from "../components/categorias-pesquisa/categorias-filtro.model";

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  readonly PARAMS_NOME = 'nome';
  readonly PARAMS_PAGINA_ATUAL = 'page';
  readonly PARAMS_ITENS_POR_PAGINA = 'size';

  constructor(private readonly httpClient: HttpClient) { }

  categoria(categoriaId: number): Observable<Categoria> {
    const headers = new HttpHeaders()
      .append(HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN);

    return this.httpClient.get<Categoria>(`${Api.URLS.categorias.categorias}/${categoriaId}`, { headers });
  }

  categorias(paginacao: Paginacao): Observable<any[]> {
    const headers = new HttpHeaders()
      .append(HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN);

    let params = new HttpParams()
      .append(this.PARAMS_PAGINA_ATUAL, paginacao.pagina.toString())
      .append(this.PARAMS_ITENS_POR_PAGINA, paginacao.itensPorPagina.toString());

    return this.httpClient.get<any[]>(Api.URLS.categorias.categorias, { headers, params });
  }

  resumo(filtro: CategoriasFiltro, paginacao: Paginacao): Observable<any[]> {
    const headers = new HttpHeaders()
      .append(HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN);

    let params = new HttpParams()
      .append(this.PARAMS_PAGINA_ATUAL, paginacao.pagina.toString())
      .append(this.PARAMS_ITENS_POR_PAGINA, paginacao.itensPorPagina.toString());

    if (notEmpty(filtro.nome)) {
      params = params.append(this.PARAMS_NOME, filtro.nome);
    }

    return this.httpClient.get<any[]>(Api.URLS.categorias.categorias, { headers, params });
  }

  excluir(categoria: Categoria): Observable<void> {
    const headers = new HttpHeaders()
      .append(HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN);

    return this.httpClient.delete<void>(`${Api.URLS.categorias.categorias}/${categoria.id}`, { headers });
  }

  salvar(categoria: Categoria): Observable<Categoria> {
    const headers = new HttpHeaders()
      .append(HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN);

    return this.httpClient.post<Categoria>(Api.URLS.categorias.categorias, categoria, { headers });
  }
}
