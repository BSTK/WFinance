import {Component, Input, OnInit} from '@angular/core';
import {Pessoa} from "../../pessoa.model";

@Component({
  selector: 'wf-pessoas-tabela-dados',
  templateUrl: './pessoas-tabela-dados.component.html',
  styleUrls: ['./pessoas-tabela-dados.component.scss']
})
export class PessoasTabelaDadosComponent implements OnInit {

  @Input()
  readonly dataSource: Pessoa[] = [];

  page = 1;
  pageSize = 5;
  collectionSize = 5;
  pessoas: Pessoa[] = [];

  constructor() {
    this.pageChange();
  }

  ngOnInit(): void {
    this.configuracoes();
  }

  pageChange() {
    this.pessoas = this.dataSource
      .map((pessoa, i) => ({id: i + 1, ...pessoa}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  private configuracoes() {
    this.page = 1;
    this.pageSize = 5;
    this.pessoas = this.dataSource;
    this.collectionSize = this.dataSource.length;
  }

}
