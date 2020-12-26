import {ToastrService} from "ngx-toastr";
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Lancamento} from "../../domain/lancamento.model";
import {notEmpty} from "../../../../shared/utils/object-utils";
import {LancamentosService} from "../../domain/lancamentos.service";
import {NavigateQuery} from "../../../../shared/router/router-navigation";
import {LancamentosFiltro} from "../../components/lancamentos-pesquisa/lancamentos-filtro.model";
import {DataSourceTable, ResponseToDataSource} from "../../../../shared/components/data-table/data-source.model";
import {DataTablePaginacaoDefault} from "../../../../shared/components/data-table/data-table-paginacao-default.model";

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html'
})
export class LancamentosComponent implements OnInit {

  dataSource: DataSourceTable<Lancamento> = new DataSourceTable<Lancamento>();

  constructor(private router: Router,
              private toast: ToastrService,
              private activatedRoute: ActivatedRoute,
              private lancamentosService: LancamentosService) { }

  ngOnInit() {
    this.lancamentosService
        .lancamentos(DataTablePaginacaoDefault.pagina())
        .subscribe((response: any) => {
          if (response && response.content) {
            this.dataSource = ResponseToDataSource<Lancamento>(response);
          }
        });
  }

  pesquisar(filtro: LancamentosFiltro) {
    const observable = this.filtroValido(filtro)
      ? this.lancamentosService.resumo(filtro, DataTablePaginacaoDefault.pagina())
      : this.lancamentosService.lancamentos(DataTablePaginacaoDefault.pagina());

    observable.subscribe((response: any) => {
      if (response && response.content) {
        this.dataSource = ResponseToDataSource<Lancamento>(response);
      }
    });
  }

  paginacao(pagina: number) {
    const queryParam = this.activatedRoute.snapshot.queryParamMap.get('query');

    if (NavigateQuery.NAVIGATE_QUERY_TODOS === queryParam) {
      this.lancamentosService
        .lancamentos(DataTablePaginacaoDefault.pagina(pagina))
        .subscribe((response: any) => {
          if (response && response.content) {
            this.dataSource = ResponseToDataSource<Lancamento>(response);
          }
        });
    }

    if (NavigateQuery.NAVIGATE_QUERY_PESQUISA === queryParam) {
      const filtro: LancamentosFiltro = {
        descricao: this.activatedRoute.snapshot.queryParamMap.get('descricao'),
        dataVencimentoDe: this.activatedRoute.snapshot.queryParamMap.get('dataVencimentoDe'),
        dataVencimentoAte: this.activatedRoute.snapshot.queryParamMap.get('dataVencimentoAte')
      };

      this.lancamentosService
        .resumo(filtro, DataTablePaginacaoDefault.pagina(pagina))
        .subscribe((response: any) => {
          if (response && response.content) {
            this.dataSource = ResponseToDataSource<Lancamento>(response);
          }
        });
    }
  }

  /// TODO: ADICIONAR CONFIRM DIALOG
  /// TODO: CORRIGIR CARREGAMENTO DE PAGINAÇÃO
  excluir(lancamento: Lancamento) {
    if (lancamento) {
      this.lancamentosService.excluir(lancamento).subscribe(_ => {
        const index = this.dataSource.conteudo.indexOf(lancamento, 1);
        if (index >= 0) {
          this.dataSource.conteudo.splice(index, 1);
          this.toast.success(
            'Lançamento excluído com sucesso!',
            'Exclusão de lançamento'
          );
        }
      });
    }
  }

  /// TODO: IMPLEMENTAR MÉTODO DE ATUALIZAR
  editar(lancamento: Lancamento) {
    if (lancamento) {
      console.log('Editando lancamento : ', lancamento);
    }
  }

  private filtroValido(filtro: LancamentosFiltro) {
    return filtro && notEmpty(filtro.descricao)
      || notEmpty(filtro.dataVencimentoDe)
      || notEmpty(filtro.dataVencimentoAte);
  }

}
