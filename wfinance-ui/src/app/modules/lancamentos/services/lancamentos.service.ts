import {Observable} from 'rxjs';
import {Api} from '../../../api';
import {Injectable} from '@angular/core';
import {Paginacao} from '../../../shared';
import {HttpClient, HttpParams} from '@angular/common/http';
import {isNull, notEmpty} from '../../../shared/utils/object-utils';
import {Lancamento, LancamentoCategoria, LancamentoPessoa} from './lancamento.model';
import {LancamentosFiltro} from '../components/lancamentos-pesquisa/lancamentos-filtro.model';
import {ListagemDadosService} from '../../../shared/components/listagem-dados/listagem-dados.service';

@Injectable({
  providedIn: 'root'
})
export class LancamentosService implements ListagemDadosService {
  
  readonly PARAMS_PAGINA_ATUAL = 'page';
  readonly PARAMS_ITENS_POR_PAGINA = 'size';
  readonly PARAMS_DESCRICAO = 'descricao';
  readonly PARAMS_DATA_VENCIMENTO_DE = 'dataVencimentoDe';
  readonly PARAMS_DATA_VENCIMENTO_ATE = 'dataVencimentoAte';
  
  constructor(private httpClient: HttpClient) {
  }
  
  lancamento(lancamentoId: number): Observable<Lancamento> {
    return this.httpClient.get<Lancamento>(`${Api.URLS.lancamentos.lancamentos}/${lancamentoId}`);
  }
  
  carregar(paginacao: Paginacao): Observable<any[]> {
    const params = new HttpParams()
      .append(this.PARAMS_PAGINA_ATUAL, paginacao.pagina.toString())
      .append(this.PARAMS_ITENS_POR_PAGINA, paginacao.itensPorPagina.toString());
    
    return this.httpClient.get<any[]>(Api.URLS.lancamentos.lancamentos, {params});
  }
  
  resumo(filtro: LancamentosFiltro, paginacao: Paginacao): Observable<any[]> {
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
    
    return this.httpClient.get<any[]>(Api.URLS.lancamentos.lancamentos, {params});
  }
  
  excluir(lancamento: Lancamento): Observable<void> {
    return this.httpClient.delete<void>(`${Api.URLS.lancamentos.lancamentos}/${lancamento.id}`);
  }
  
  salvar(lancamento: Lancamento): Observable<Lancamento> {
    return (isNull(lancamento.id))
      ? this.httpClient.post<Lancamento>(Api.URLS.lancamentos.lancamentos, lancamento)
      : this.httpClient.put<Lancamento>(`${Api.URLS.lancamentos.lancamentos}/${lancamento.id}`, lancamento);
  }
  
  categorias(): Observable<LancamentoCategoria[]> {
    return this.httpClient.get<any[]>(Api.URLS.categorias.resumo);
  }
  
  pessoas(): Observable<LancamentoPessoa[]> {
    return this.httpClient.get<any[]>(Api.URLS.fornecedores.resumo);
  }
  
}
