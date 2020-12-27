import {Pessoa} from "../../domain/pessoa.model";
import {AfterContentChecked, Component, Input} from '@angular/core';
import {DataSourceTable} from "../../../../shared/components/data-table/data-source.model";

@Component({
  selector: 'wf-pessoas-tabela-dados',
  templateUrl: './pessoas-tabela-dados.component.html',
  styleUrls: ['./pessoas-tabela-dados.component.scss']
})
export class PessoasTabelaDadosComponent implements AfterContentChecked {

  /// TODO: USAR DataSourceTable
  @Input()
  dataSource: DataSourceTable<Pessoa> = new DataSourceTable<Pessoa>();

  page = 1;
  pageSize = 5;
  collectionSize = 5;
  pessoas: Pessoa[] = [];

  constructor() { }

  ngAfterContentChecked(): void {
    this.pageChange();
  }

  /// TODO: IMPLEMENTAR EDIÇÃO DA FORNECEDORES
  /// TODO: IMPLEMENTAR EXCLUSÃO DA FORNECEDORES
  /// TODO: IMPLEMENTAR PAGINAÇÃO DE FORNECEDORES
  /// TODO: CORRIGIR PAGINAÇÃO LAZY
  pageChange() {
    if (this.dataSource && this.dataSource.conteudo) {
      this.collectionSize = this.dataSource.conteudo.length;
      this.pessoas = this.dataSource.conteudo;
    }
  }

}
