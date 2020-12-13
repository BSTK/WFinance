import {AfterContentChecked, Component, Input, OnInit} from '@angular/core';
import {Categoria} from "../../categoria.model";

@Component({
  selector: 'wf-categorias-tabela-dados',
  templateUrl: './categorias-tabela-dados.component.html'
})
export class CategoriasTabelaDadosComponent implements AfterContentChecked {

  @Input()
  readonly dataSource: Categoria[] = [];

  page = 1;
  pageSize = 5;
  collectionSize = 5;
  categorias: Categoria[] = [];

  constructor() { }

  ngAfterContentChecked(): void {
    this.pageChange();
  }

  pageChange() {
    this.collectionSize = this.dataSource.length;
    this.categorias = this.dataSource
      .map((categoria, i) => ({id: i + 1, ...categoria}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
