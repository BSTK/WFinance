import {Lancamento} from "../../lancamento.model";
import {AfterContentChecked, Component, Input} from '@angular/core';

@Component({
  selector: 'wf-lancamentos-tabela-dados',
  templateUrl: './lancamentos-tabela-dados.component.html',
  styleUrls: ['lancamentos-tabela-dados.component.scss']
})
export class LancamentosTabelaDadosComponent implements AfterContentChecked {

  @Input()
  readonly dataSource: Lancamento[] = [];

  page = 1;
  pageSize = 5;
  lancamentos: Lancamento[] = [];
  collectionSize = this.dataSource.length;

  constructor() { }

  ngAfterContentChecked(): void {
    this.pageChange();
  }

  pageChange() {
    this.collectionSize = this.dataSource.length;
    this.lancamentos = this.dataSource
      .map((lancamento, i) => ({id: i + 1, ...lancamento}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
