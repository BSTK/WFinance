import {Component} from '@angular/core';
import {Categoria} from "../../domain/categoria.model";
import {DataTableComponent} from "../../../../shared/components";

@Component({
  selector: 'wf-categorias-tabela-dados',
  templateUrl: './categorias-tabela-dados.component.html',
  styleUrls: ['./categorias-tabela-dados.component.scss']
})
export class CategoriasTabelaDadosComponent extends DataTableComponent<Categoria> {

  constructor() {
    super();
  }
}
