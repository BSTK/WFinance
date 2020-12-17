import {Pessoa} from "../../pessoa.model";
import {AfterContentChecked, Component, Input} from '@angular/core';

@Component({
  selector: 'wf-pessoas-tabela-dados',
  templateUrl: './pessoas-tabela-dados.component.html',
  styleUrls: ['./pessoas-tabela-dados.component.scss']
})
export class PessoasTabelaDadosComponent implements AfterContentChecked {

  /// TODO: USAR DataSourceTable
  @Input()
  readonly dataSource: Pessoa[] = [];

  page = 1;
  pageSize = 5;
  collectionSize = 5;
  pessoas: Pessoa[] = [];

  constructor() { }

  ngAfterContentChecked(): void {
    this.pageChange();
  }

  /// TODO: CORRIGIR PAGINAÇÃO LAZY
  pageChange() {
    this.collectionSize = this.dataSource.length;
    this.pessoas = this.dataSource
      .map((pessoa, i) => ({id: i + 1, ...pessoa}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
