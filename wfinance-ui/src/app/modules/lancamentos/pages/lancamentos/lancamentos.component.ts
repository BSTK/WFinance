import {Component, OnInit} from '@angular/core';
import {Lancamento} from "../../domain/lancamento.model";
import {notEmpty} from "../../../../shared/utils/object-utils";
import {LancamentosService} from "../../domain/lancamentos.service";
import {LancamentosFiltro} from "../../components/lancamentos-pesquisa/lancamentos-filtro.model";
import {DataSourceTable, ResponseToDataSource} from "../../../../shared/components/data-table/data-source.model";
import {DataTablePaginacaoDefault} from "../../../../shared/components/data-table/data-table-paginacao-default.model";

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html'
})
export class LancamentosComponent implements OnInit {

  dataSource: DataSourceTable<Lancamento> = new DataSourceTable<Lancamento>();

  constructor(private lancamentosService: LancamentosService) { }

  ngOnInit() {
    this.lancamentosService
        .lancamentos(DataTablePaginacaoDefault.paginacao(0))
        .subscribe((response: any) => {
          if (response && response.content) {
            this.dataSource = ResponseToDataSource<Lancamento>(response);
          }
        });
  }

  buscarLancamentos(filtro: LancamentosFiltro) {
    const observable = this.filtroValido(filtro)
      ? this.lancamentosService.resumo(filtro, DataTablePaginacaoDefault.paginacao(0))
      : this.lancamentosService.lancamentos(DataTablePaginacaoDefault.paginacao(0));

    if (observable) {
      observable.subscribe((response: any) => {
        if (response && response.content) {
          this.dataSource = ResponseToDataSource<Lancamento>(response);
        }
      });
    }
  }

  paginacao(pagina: number) {
    this.lancamentosService
      .lancamentos(DataTablePaginacaoDefault.paginacao(pagina))
      .subscribe((response: any) => {
        if (response && response.content) {
          this.dataSource = ResponseToDataSource<Lancamento>(response);
        }
      });
  }

  excluir(lancamento: Lancamento) {
    if (lancamento) {
      this.lancamentosService.excluir(lancamento).subscribe(_ => {
        /// TODO: IMPLEMENTAR TOAST
        console.log('Lançamento excluido com sucesso!!');
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
