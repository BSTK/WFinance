import {Lancamento} from "../../lancamento.model";
import {AfterContentChecked, Component, Input, OnInit} from '@angular/core';
import {DataSourceTable} from "../../../../shared/utils/tables/data-source-table.model";
import {notEmpty} from "../../../../shared/utils/arrays-utils";

@Component({
  selector: 'wf-lancamentos-tabela-dados',
  templateUrl: './lancamentos-tabela-dados.component.html',
  styleUrls: ['lancamentos-tabela-dados.component.scss']
})
export class LancamentosTabelaDadosComponent implements AfterContentChecked {

  @Input()
  readonly dataSource: DataSourceTable<Lancamento> = new DataSourceTable<Lancamento>();

  page = 1;
  pageSize = 5;
  collectionSize = 5;
  lancamentos: Lancamento[] = [];

  constructor() { }

  ngAfterContentChecked(): void {
    this.pageChange();
  }

  /// TODO: CORRIGIR PAGINAÇÃO LAZY
  pageChange($event: any = null) {
    if (notEmpty(this.dataSource.conteudo)) {
      this.page = this.dataSource.pagina;
      this.pageSize = this.dataSource.totalItensPagina;
      this.collectionSize = this.dataSource.totalRegistros;
      this.lancamentos = this.dataSource.conteudo.slice($event + this.page, this.pageSize);
    }
  }

}
