import {Component, Input, OnInit} from '@angular/core';
import {Lancamento} from "../../pages/lancamentos/lancamento.model";

@Component({
  selector: 'wf-lancamentos-tabela-dados',
  templateUrl: './lancamentos-tabela-dados.component.html'
})
export class LancamentosTabelaDadosComponent implements OnInit {

  @Input()
  readonly dataSource: Lancamento[] = [];

  page = 1;
  pageSize = 5;
  collectionSize = 5;
  lancamentos: Lancamento[] = [];

  constructor() {
    this.pageChange();
  }

  ngOnInit(): void {
    this.configuracoes();
  }

  pageChange() {
    this.lancamentos = this.dataSource
      .map((lancamento, i) => ({id: i + 1, ...lancamento}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  private configuracoes() {
    this.page = 1;
    this.pageSize = 5;
    this.lancamentos = this.dataSource;
    this.collectionSize = this.dataSource.length;
  }

}
