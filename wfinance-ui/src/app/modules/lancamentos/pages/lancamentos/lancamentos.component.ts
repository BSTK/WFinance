import {Component, OnInit} from '@angular/core';
import {Lancamento} from "../../domain/lancamento.model";
import {notEmpty} from "../../../../shared/utils/object-utils";
import {LancamentosService} from "../../domain/lancamentos.service";
import {LancamentosFiltro} from "../../components/lancamentos-pesquisa/lancamentos-filtro.model";
import {DataSourceTable, ResponseToDataSource} from "../../../../shared/utils/tables/data-source-table.model";

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html'
})
export class LancamentosComponent implements OnInit {

  dataSource: DataSourceTable<Lancamento> = new DataSourceTable<Lancamento>();

  constructor(private lancamentosService: LancamentosService) { }

  ngOnInit() {
    this.lancamentosService
        .paginacao(1)
        .subscribe((response: any) => {
          const responseOK = {
            number: 1,
            totalElements: 50,
            content: response
          };

          this.dataSource = ResponseToDataSource<Lancamento>(responseOK);
        });
  }

  buscarLancamentos(filtro: LancamentosFiltro) {
    const observable = this.filtroValido(filtro)
      ? this.lancamentosService.resumo(filtro)
      : this.lancamentosService.paginacao(1);

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
      .paginacao(pagina)
      .subscribe((response: any) => {
        const responseOK = {
          number: 1,
          totalElements: 50,
          content: response
        };

        this.dataSource = ResponseToDataSource<Lancamento>(responseOK);
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
