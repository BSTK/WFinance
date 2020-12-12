import {Component, Input, OnInit} from '@angular/core';
import {Categoria} from "../../categoria.model";

@Component({
  selector: 'wf-categorias-tabela-dados',
  templateUrl: './categorias-tabela-dados.component.html'
})
export class CategoriasTabelaDadosComponent implements OnInit {

  @Input()
  readonly dataSource: Categoria[] = [];

  page = 1;
  pageSize = 5;
  collectionSize = 5;
  categorias: Categoria[] = [];

  constructor() {
    this.pageChange();
  }

  ngOnInit(): void {
    this.configuracoes();
  }

  pageChange() {
    this.categorias = this.dataSource
      .map((categoria, i) => ({id: i + 1, ...categoria}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  private configuracoes() {
    this.page = 1;
    this.pageSize = 5;
    this.categorias = this.dataSource;
    this.collectionSize = this.dataSource.length;
  }
}
