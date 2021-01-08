import {Observable} from "rxjs";
import {Api} from "../../../api";
import {Injectable} from '@angular/core';
import {Categoria} from "./categoria.model";
import {Paginacao} from "../../../shared/components";
import {notEmpty} from "../../../shared/utils/object-utils";
import {HttpClient, HttpParams} from "@angular/common/http";
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
    return this.httpClient.get<Categoria>(`${Api.URLS.categorias.categorias}/${categoriaId}`);
  }

  categorias(paginacao: Paginacao): Observable<any[]> {
    const params = new HttpParams()
      .append(this.PARAMS_PAGINA_ATUAL, paginacao.pagina.toString())
      .append(this.PARAMS_ITENS_POR_PAGINA, paginacao.itensPorPagina.toString());

    return this.httpClient.get<any[]>(Api.URLS.categorias.categorias, { params });
  }

  resumo(filtro: CategoriasFiltro, paginacao: Paginacao): Observable<any[]> {
    let params = new HttpParams()
      .append(this.PARAMS_PAGINA_ATUAL, paginacao.pagina.toString())
      .append(this.PARAMS_ITENS_POR_PAGINA, paginacao.itensPorPagina.toString());

    if (notEmpty(filtro.nome)) {
      params = params.append(this.PARAMS_NOME, filtro.nome);
    }

    return this.httpClient.get<any[]>(Api.URLS.categorias.categorias, { params });
  }

  excluir(categoria: Categoria): Observable<void> {
    return this.httpClient.delete<void>(`${Api.URLS.categorias.categorias}/${categoria.id}`);
  }

  salvar(categoria: Categoria): Observable<Categoria> {
    return this.httpClient.post<Categoria>(Api.URLS.categorias.categorias, categoria);
  }
}
