import {Component, OnInit} from '@angular/core';
import {Lancamento} from "../../domain/lancamento.model";
import {LancamentosService} from "../../domain/lancamentos.service";
import {notEmpty} from "../../../../shared/utils/object-utils";
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
        .lancamentos()
        .subscribe((response: any) => {
          if (response && response.content) {
            this.dataSource = ResponseToDataSource<Lancamento>(response);
          }
        });
  }

  buscarLancamentos(filtro: LancamentosFiltro) {
    const observable = this.filtroValido(filtro)
      ? this.lancamentosService.resumo(filtro)
      : this.lancamentosService.lancamentos();

    if (observable) {
      observable.subscribe((response: any) => {
        if (response && response.content) {
          this.dataSource = ResponseToDataSource<Lancamento>(response);
        }
      });
    }
  }

  private filtroValido(filtro: LancamentosFiltro) {
    return filtro && notEmpty(filtro.descricao)
      || notEmpty(filtro.dataVencimentoDe)
      || notEmpty(filtro.dataVencimentoAte);
  }

}
