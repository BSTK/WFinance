import {Observable, of} from "rxjs";
import {Injectable} from '@angular/core';
import {Lancamento} from "./lancamento.model";
import {Paginacao} from "../../../shared/utils/paginacao";
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

  lancamentos(paginacao: Paginacao): Observable<any[]> {
    const headers = new HttpHeaders()
      .append(HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN);

    let params = new HttpParams()
      .append(this.PARAMS_PAGE, paginacao.pagina.toString())
      .append(this.PARAMS_SIZE, paginacao.itensPorPagina.toString());

    return this.httpClient.get<any[]>(Api.URLS.lancamentos.lancamentos, { headers, params });
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

  excluir(lancamento: Lancamento): Observable<void> {
    const headers = new HttpHeaders()
      .append(HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN);

    return this.httpClient.delete<void>(`${Api.URLS.lancamentos.lancamentos}/${lancamento.id}`, { headers });
  }

  paginacao(pagina: number): Observable<any[]> {
    const categoria = { id: 1, nome: 'categoria', cor: '' };
    const pessoa = { id: 1, nome: '', endereco: null, ativo: false };

    const dados1: Lancamento[] = [
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 1', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 1', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 1', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 1', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 1', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
    ];

    const dados2: Lancamento[] = [
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 2', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 2', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 2', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 2', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 2', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
    ];

    const dados3: Lancamento[] = [
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 3', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 3', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 3', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 3', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 3', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
    ];

    const dados4: Lancamento[] = [
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 4', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 4', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 4', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 4', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 4', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
    ];

    const dados5: Lancamento[] = [
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 5', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 5', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 5', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 5', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 5', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
    ];

    const dados6: Lancamento[] = [
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 6', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 6', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 6', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 6', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 6', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
    ];

    const dados7: Lancamento[] = [
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 7', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 7', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 7', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 7', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 7', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
    ];

    const dados8: Lancamento[] = [
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 8', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 8', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 8', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 8', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 8', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
    ];

    const dados9: Lancamento[] = [
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 9', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 9', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 9', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 9', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 9', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
    ];

    const dados10: Lancamento[] = [
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 10', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 10', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 10', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 10', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
      { id: 1, tipo: 'RECEITA', descricao: 'PAGINA 10', valor: 100, dataPagamento: '01/01/2020', dataVencimento: '01/01/2020', pessoa: pessoa, observacao: '', categoria: categoria },
    ];

    const mapa = new Map<string, Lancamento[]>([
      ['dados1', dados1],
      ['dados2', dados2],
      ['dados3', dados3],
      ['dados4', dados4],
      ['dados5', dados5],
      ['dados6', dados6],
      ['dados7', dados7],
      ['dados8', dados8],
      ['dados9', dados9],
      ['dados10', dados10],
    ]);

    return of(mapa.get('dados' + pagina));
  }

}
