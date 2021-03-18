import {OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {isEmpty} from '../../utils/object-utils';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ListagemDadosService} from './listagem-dados.service';
import {DataSourceTable, DataTablePaginacaoDefault, ResponseToDataSource} from '..';

export abstract class ListagemDadosComponent<T, F = any> implements OnInit {
  
  dataSource: DataSourceTable<T> = new DataSourceTable<T>();
  
  protected constructor(readonly title: Title,
                        readonly tituloPagina: string = '',
                        readonly activatedRoute: ActivatedRoute,
                        readonly dadosService: ListagemDadosService) {
  }
  
  ngOnInit(): void {
    const pagina = this.activatedRoute.snapshot.queryParamMap.get('pagina') || '';
    const paginaAtual = isEmpty(pagina) ? 1 : Number(pagina);
    this.paginacao(paginaAtual);
    this.title.setTitle(this.tituloPagina);
  }
  
  protected carregar(pagina: number) {
    this.dadosService
      .carregar(DataTablePaginacaoDefault.pagina(pagina))
      .subscribe((response: any) => {
        if (response && response.content) {
          this.dataSource = ResponseToDataSource<T>(response);
        }
      });
  }
  
  protected carregarPesquisa(pagina: number, queryParam: { (queryParamMap: ParamMap): F }) {
    const filtro: F = queryParam(this.activatedRoute.snapshot.queryParamMap);
    this.dadosService.resumo(filtro, DataTablePaginacaoDefault.pagina(pagina))
      .subscribe((response: any) => {
        if (response && response.content) {
          this.dataSource = ResponseToDataSource<T>(response);
        }
      });
  }
  
  abstract pesquisar(filtro: F);
  
  abstract paginacao(pagina: number);
  
  abstract excluir(entidade: T);
  
  abstract editar(entidade: T);
  
}
